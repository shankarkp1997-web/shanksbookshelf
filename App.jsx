import { useState, useRef, useEffect } from 'react';
import { books } from './books';
import { playNote } from './piano';
import './App.css';

const PALETTE = [
  { bg: '#C0392B', fg: '#FFFFFF', accent: '#E74C3C' }, // red
  { bg: '#2980B9', fg: '#FFFFFF', accent: '#5DADE2' }, // blue
  { bg: '#27AE60', fg: '#FFFFFF', accent: '#58D68D' }, // green
  { bg: '#D35400', fg: '#FFFFFF', accent: '#E59866' }, // orange
  { bg: '#8E44AD', fg: '#FFFFFF', accent: '#BB8FCE' }, // purple
  { bg: '#16A085', fg: '#FFFFFF', accent: '#48C9B0' }, // teal
  { bg: '#B7950B', fg: '#FFFFFF', accent: '#F4D03F' }, // gold
  { bg: '#1A5276', fg: '#FFFFFF', accent: '#5499C7' }, // navy
];

// ── Pixel sky with drifting clouds ─────────────────────────────────

const CLOUDS = [
  {
    shape: [
      '000111000000',
      '011111110000',
      '111111111100',
      '111111111111',
      '111111111111',
      '222222222222',
      '022222222220',
    ],
    x: 120, y: 55, speed: 0.28,
  },
  {
    shape: [
      '00011100',
      '01111110',
      '11111111',
      '11111111',
      '22222222',
      '02222220',
    ],
    x: 480, y: 90, speed: 0.18,
  },
  {
    shape: [
      '0001110000',
      '0111111000',
      '1111111110',
      '1111111111',
      '2222222222',
    ],
    x: 820, y: 70, speed: 0.22,
  },
  {
    shape: [
      '001110',
      '111111',
      '111111',
      '222222',
    ],
    x: 280, y: 130, speed: 0.14,
  },
  {
    shape: [
      '000011100000',
      '001111111000',
      '011111111110',
      '111111111111',
      '222222222222',
      '022222222220',
    ],
    x: 650, y: 40, speed: 0.32,
  },
  {
    shape: [
      '011100',
      '111110',
      '111111',
      '222222',
    ],
    x: 1050, y: 110, speed: 0.16,
  },
];

const PX = 8; // pixel block size

function PixelSky() {
  const ref = useRef(null);
  const cloudsRef = useRef(CLOUDS.map(c => ({ ...c })));

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawCloud(cloud) {
      const { shape, x, y } = cloud;
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          const ch = shape[row][col];
          if (ch === '0') continue;
          ctx.fillStyle = ch === '1'
            ? 'rgba(255,255,255,0.92)'
            : 'rgba(180,210,240,0.55)';
          ctx.fillRect(
            Math.round(x + col * PX),
            Math.round(y + row * PX),
            PX, PX
          );
        }
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const cloud of cloudsRef.current) {
        drawCloud(cloud);
        cloud.x -= cloud.speed;
        const cloudW = cloud.shape[0].length * PX;
        if (cloud.x + cloudW < -PX) {
          cloud.x = canvas.width + PX;
        }
      }
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="sky-canvas" />;
}

// ── Individual book spine ───────────────────────────────────────────

function BookSpine({ book, index, isActive, onEnter, onLeave }) {
  const pal = PALETTE[index % PALETTE.length];

  return (
    <div
      className={`book-spine${isActive ? ' active' : ''}`}
      style={{
        '--spine-bg':     pal.bg,
        '--spine-fg':     pal.fg,
        '--spine-accent': pal.accent,
      }}
      onMouseEnter={() => { playNote(index); onEnter(book); }}
      onMouseLeave={onLeave}
    >
      <div className="book-body">
        <div className="book-stripe" />
        <span className="book-title-text">{book.title}</span>
        <span className="book-author-text">{book.author}</span>
      </div>
      <div className="book-glow" />
    </div>
  );
}

// ── Hover info panel ────────────────────────────────────────────────

function BookInfo({ book }) {
  return (
    <div className={`book-info${book ? ' visible' : ''}`}>
      {book && (
        <>
          <div className="info-title">{book.fullTitle}</div>
          <div className="info-meta">
            <span>{book.author}</span>
            <span className="info-sep">·</span>
            <span>{book.pages} pages</span>
          </div>
        </>
      )}
    </div>
  );
}

// ── Root ────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState(null);

  return (
    <div className="app">
      <PixelSky />

      <div className="scene">
        <header className="shelf-header">
          <div className="shelf-eyebrow">to-read</div>
          <h1 className="shelf-title">
            Shankar's <em>Bookshelf</em>
          </h1>
          <p className="shelf-subtitle">{books.length} books waiting to be opened</p>
        </header>

        <div className="shelf-wrap">
          <div className="books-row">
            {books.map((book, i) => (
              <BookSpine
                key={book.title}
                book={book}
                index={i}
                isActive={active?.title === book.title}
                onEnter={setActive}
                onLeave={() => setActive(null)}
              />
            ))}
          </div>

          <div className="shelf-plank">
            <div className="plank-edge" />
            <div className="plank-face" />
          </div>
        </div>

        <BookInfo book={active} />
      </div>
    </div>
  );
}
