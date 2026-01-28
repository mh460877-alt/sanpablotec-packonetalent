export const initParallax = () => {
  const visual = document.getElementById('visual');
  const grid = document.getElementById('featureGrid');
  if (!visual) return;
  let mx = 0, my = 0;
  let tx = 0, ty = 0;

  const onMove = (e) => {
    const rect = visual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx = (x - 0.5);
    my = (y - 0.5);
  };

  const animateParallax = () => {
    tx += (mx - tx) * 0.06;
    ty += (my - ty) * 0.06;

    visual.style.transform = `translate(${tx * 4}px, ${ty * 4}px)`;
    if (grid) grid.style.transform = `translate(${tx * 10}px, ${ty * 8}px)`;

    requestAnimationFrame(animateParallax);
  };

  animateParallax();
  visual.addEventListener('mousemove', onMove);
  visual.addEventListener('mouseleave', () => { mx = 0; my = 0; });
};