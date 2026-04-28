const nav = document.getElementById('stickyNav');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('visible', window.scrollY > 400);
  });
}
