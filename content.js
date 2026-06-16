// 1. FIXED: Matches the selector to the class name stated in your comment
const taskContainer = document.querySelector(".tasks"); 
taskContainer.classList.add("task-container");
taskContainer.classList.remove("tasks");

const wedPuzzle = "https://pbs.twimg.com/profile_images/2057489128883892224/DrUyBrsI_400x400.jpg";

// Get the current day (0 = Sunday, 1 = Monday, 2 = Tuesday, etc.)
const currentDay = 2;
const currentDays = new Date().getDay();


switch (currentDay) {

  case 0: // Sunday
    break;

  case 1: // Monday
    break;

  case 2: // Tuesday
    
    taskContainer.innerHTML = `
            <video controls autoplay muted width="100%"> 
            <source src="https://videos.pexels.com/video-files/34670189/14694963_2560_1440_30fps.mp4" type="video/mp4">
            Your browser does not support the video tag.
            </video>
    `
    ;
    break;

  case 3: // Wednesday (Today!)
    
    taskCard = document.createElement("div");
    taskCard.innerHTML = `
        <div class="puzzle-container">
        <div class="puzzle">
        <div class="puzzleBackground"></div>
        </div>
        <div class="timer" id="timer">00:00</div>
        <div class="actions"><button id="newGame" class="btn">Start new game</button></div>
        </div>
    `
    ;
    break;

  case 4: // Thursday
    break;

  case 5: // Friday
    break;

  case 6: // Saturday
    break;
}


//----------------------------- Puzzle Game -----------------------------
const config = {
  size: { w: 0, h: 0 },
  cols: 5,
  rows: 5,
  correct: 0
};

const state = {
  pieces: [],
  startX: 0,
  startY: 0,
  active: null,
  imgUrl: wedPuzzle, // Ensure 'wedPuzzle' is defined as a URL string above this script
  audio: new Audio('https://mixkit.co'),
  winAudio: new Audio('https://mixkit.co'),
  timer: null,
  elapsed: 0
};

// FIXED COORDINATES HELPER: Correctly falls back to changedTouches for mobile drag calculations
const getPos = (e) => {
  if (e.type.startsWith('touch')) {
    const touch = e.touches[0] || e.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  return { x: e.clientX, y: e.clientY };
};

const drag = (e) => {
  if (!state.active) return;
  
  // Prevent mobile screens from scrolling vertically while moving a piece
  if (e.cancelable) e.preventDefault(); 
  
  const coords = getPos(e);
  const diffX = state.startX - coords.x;
  const diffY = state.startY - coords.y;
  
  state.startX = coords.x;
  state.startY = coords.y;
  
  state.active.elem.style.top = `${state.active.elem.offsetTop - diffY}px`;
  state.active.elem.style.left = `${state.active.elem.offsetLeft - diffX}px`;
};

const stopDrag = () => {
  if (!state.active) return;
  const { elem, targetX, targetY } = state.active;
  const distance = Math.hypot(targetX - parseInt(elem.style.left), targetY - parseInt(elem.style.top));
  
  // Dynamic snap window calculation based on piece widths
  const tolerance = Math.max(20, (config.size.w / config.cols) * 0.35);

  if (distance < tolerance) {
    elem.style.left = `${targetX}px`;
    elem.style.top = `${targetY}px`;
    elem.style.pointerEvents = 'none';
    elem.style.zIndex = 0;
    state.winAudio.play();
    config.correct++;
    
    if (config.correct === config.cols * config.rows) {
      clearInterval(state.timer);
      const totalSecs = Math.floor(state.elapsed / 1000);
      alert(`Solved in ${Math.floor(totalSecs / 60)}m ${totalSecs % 60}s!`);
    }
  } else {
    // Reset piece depth if it wasn't placed in the right position
    elem.style.zIndex = 1; 
  }
  
  state.active = null;
  ['mouseup', 'touchend', 'mousemove', 'touchmove'].forEach(ev => 
    document.removeEventListener(ev, ev.includes('move') ? drag : stopDrag)
  );
};

const startDrag = (piece, e) => {
  state.active = piece;
  const coords = getPos(e);
  state.startX = coords.x;
  state.startY = coords.y;
  
  piece.elem.style.zIndex = 999; // Force active piece above others

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
  
  state.audio.currentTime = 0;
  state.audio.play();
  
  if (!state.timer) {
    const start = Date.now() - state.elapsed;
    state.timer = setInterval(() => {
      state.elapsed = Date.now() - start;
      const secs = Math.floor((state.elapsed / 1000) % 60);
      const mins = Math.floor(state.elapsed / 60000);
      document.getElementById('timer').textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
  }
};

const initBoard = () => {
  const img = new Image();
  img.src = state.imgUrl;
  img.onload = () => {
    // 1. Calculate responsive dimensions
    const maxAllowedWidth = window.innerWidth * 0.90;
    let targetWidth = img.naturalWidth;
    let targetHeight = img.naturalHeight;

    if (targetWidth > maxAllowedWidth) {
      const scaleDownRatio = maxAllowedWidth / targetWidth;
      targetWidth = maxAllowedWidth;
      targetHeight = targetHeight * scaleDownRatio;
    }

    config.size.w = targetWidth;
    config.size.h = targetHeight;
    config.correct = 0;
    state.elapsed = 0;
    
    clearInterval(state.timer);
    state.timer = null;
    document.getElementById('timer').textContent = "00:00";
    
    const pW = config.size.w / config.cols;
    const pH = config.size.h / config.rows;
    
    const mainContainer = document.querySelector('.puzzle');
    
    // FIXED CLEARING: Purges old DOM elements to stop items from multiplying on reset
    mainContainer.innerHTML = ''; 
    
    const puzzleBg = document.createElement('div');
    puzzleBg.className = 'puzzleBackground';
    mainContainer.appendChild(puzzleBg);

    mainContainer.style.width = `${config.size.w}px`;
    mainContainer.style.height = `${config.size.h}px`;
    puzzleBg.style.backgroundImage = `url(${state.imgUrl})`;
    puzzleBg.style.backgroundSize = `${config.size.w}px ${config.size.h}px`;

    state.pieces = Array.from({ length: config.cols * config.rows }).map((_, i) => {
      const elem = document.createElement('div');
      const xIndex = i % config.cols;
      const yIndex = Math.floor(i / config.cols);
      const targetX = xIndex * pW;
      const targetY = yIndex * pH;
      
      elem.className = 'elem';
      Object.assign(elem.style, {
        width: `${pW}px`,
        height: `${pH}px`,
        backgroundImage: `url(${state.imgUrl})`,
        backgroundSize: `${config.size.w}px ${config.size.h}px`,
        backgroundPosition: `-${targetX}px -${targetY}px`,
        left: `${Math.random() * (config.size.w - pW)}px`,
        top: `${Math.random() * (config.size.h - pH)}px`,
        zIndex: 1
      });

      const chunk = { elem, targetX, targetY };
      
      // FIXED TOUCH EVENT CAPTURING: Set passive to false so preventDefault functions properly
      elem.addEventListener('mousedown', (e) => { e.preventDefault(); startDrag(chunk, e); });
      elem.addEventListener('touchstart', (e) => { e.preventDefault(); startDrag(chunk, e); }, { passive: false });
      
      return chunk;
    });
    
    mainContainer.append(...state.pieces.map(p => p.elem));
  };
};

const resetGame = () => {
  // Clear any existing timer loops running in background memory spaces
  clearInterval(state.timer);
  state.timer = null;
  initBoard();
};