 # 📚 Shankar's Bookshelf                                                                                                                                                               
  A personal, interactive bookshelf built from my [Goodreads](https://www.goodreads.com) to-read list. Inspired by                                          
  [axayagrawal/experiments](https://github.com/axayagrawal/experiments/tree/main/bookshelf).                                                                
                                                                                            
  ## What it looks like                                                                                                                                     
                       
  A bright pixel-art sky with drifting clouds, 8 colorful book spines standing on a wooden shelf. Hover over any spine to lift it, see the full title and
  author, and hear a soft piano note.                                                                                                                       
                                     
  ## Books on the shelf                                                                                                                                     
                       
  | Title | Author |
  |---|---|         
  | Think Straight | Darius Foroux |
  | Dopamine Detox | Thibaut Meurisse |                                                                                                                     
  | The Gentleman From Peru | André Aciman |
  | H.I.T. Investing | Mahesh Joshi |                                                                                                                       
  | Thinking in Bets | Annie Duke |                                                                                                                         
  | Runnin' Down a Dream | Bill Gurley |                                                                                                                    
  | Empire of AI | Karen Hao |                                                                                                                              
  | The Let Them Theory | Mel Robbins |                                                                                                                     
                                                                                                                                                            
  ## Features                                                                                                                                               
                                                                                                                                                            
  - **Pixel sky** — animated 8-bit clouds drifting across a `#386AF5` blue background                                                                       
  - **Hover interactions** — each book lifts with a spring animation and accent glow                                                                        
  - **Piano notes** — Web Audio API plays a warm pentatonic note per book on hover  
  - **Book info** — full title, author, and page count fades in below the shelf                                                                             
  - **No dependencies at runtime** — just React + Vite for the build                                                                                        
                                                                                                                                                            
  ## Tech                                                                                                                                                   
                                                                                                                                                            
  - React 18 + Vite                                                                                                                                         
  - Plain CSS (no Tailwind, no UI library)                                                                                                                  
  - Web Audio API for piano               
  - Canvas API for animated clouds                                                                                                                          
  - Google Fonts: Cormorant Garamond, EB Garamond, Courier Prime
                                                                                                                                                            
  ## Run locally                                                                                                                                            
                                                                                                                                                            
  ```bash                                                                                                                                                   
  npm install     
  npm run dev

  Adding your own books

  Edit src/books.js — each entry takes:                                                                                                                     
   
  { title: "Short title", fullTitle: "Full title as on Goodreads", author: "Author Name", pages: 300 }                                                      
                                                                                                                                                            
  ---
  Built with https://claude.ai/claude-code.                                                                                                                 
  ```                                                                             
