// Basic interactivity: menu toggle, year, simple parallax effect on mouse
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const year = document.getElementById('year');
  const universe = document.getElementById('universe');
  const tourBtn = document.getElementById('tourBtn');
  const highlightText = document.getElementById('highlightText');
  const subscribeForm = document.getElementById('subscribeForm');

  // set footer year
  year.textContent = new Date().getFullYear();

  // responsive menu
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });

  // parallax: subtle movement of nebula on mouse move
  document.addEventListener('mousemove', (e) => {
    // map mouse coords to small transform values
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10..10
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    // move nebula and stars for depth
    universe.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  // Quick tour — cycles a few highlight phrases
  const highlights = [
    "A breathtaking view from deep space — look closer.",
    "Probe telemetry: imagery at ultra-high resolution.",
    "Discover star-forming regions and dust lanes.",
    "Immersive zoom of planetary surfaces and craters."
  ];
  let idx = 0;
  tourBtn.addEventListener('click', () => {
    idx = (idx + 1) % highlights.length;
    highlightText.textContent = highlights[idx];
    // tiny pulse effect
    highlightText.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }], { duration: 450 });
  });

  // simple subscribe form handling (no network call)
  subscribeForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const email = document.getElementById('email').value.trim();
    if(!email){ alert('Please enter a valid email.'); return; }
    // show a small success message
    subscribeForm.innerHTML = `<p style="font-weight:700;">Subscribed! 🎉</p><p style="color:rgba(255,255,255,0.7);font-size:0.95rem;">You will receive mission updates to <strong>${email}</strong></p>`;
  });

  // Accessibility: close nav when clicking outside on small screens
  document.addEventListener('click', (e) => {
    if(window.innerWidth <= 980){
      if(!nav.contains(e.target) && !menuBtn.contains(e.target)){
        nav.style.display = '';
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

});
