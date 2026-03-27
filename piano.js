let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

// Warm pentatonic scale — C D E G A C D E (suitable for a cozy library feel)
const FREQS = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

export function playNote(index) {
  try {
    const ac = getCtx();
    const freq = FREQS[index % FREQS.length];
    const now = ac.currentTime;

    const osc1 = ac.createOscillator();
    const osc2 = ac.createOscillator();
    const filter = ac.createBiquadFilter();
    const gain = ac.createGain();

    osc1.type = 'triangle';
    osc1.frequency.value = freq;
    osc2.type = 'sine';
    osc2.frequency.value = freq * 2.005; // slight detune for warmth

    filter.type = 'lowpass';
    filter.frequency.value = 1200;
    filter.Q.value = 0.8;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    [osc1, osc2].forEach(o => o.connect(filter));
    filter.connect(gain);
    gain.connect(ac.destination);

    osc1.start(now); osc1.stop(now + 2);
    osc2.start(now); osc2.stop(now + 2);
  } catch (_) {}
}
