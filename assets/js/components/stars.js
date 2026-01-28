export const initStars = () => {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  let stars = [];
  const STAR_COUNT_BASE = 120;

  const resize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const count = Math.floor(STAR_COUNT_BASE * (W * H) / (1200 * 700));
    stars = Array.from({ length: Math.max(90, Math.min(220, count)) }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.35 + 0.25,
      a: Math.random() * 0.6 + 0.15,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      tw: Math.random() * 0.012 + 0.003
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);

    const g = ctx.createRadialGradient(W * 0.75, H * 0.35, 0, W * 0.75, H * 0.35, Math.max(W, H) * 0.8);
    g.addColorStop(0, 'rgba(225,123,215,0.10)');
    g.addColorStop(0.35, 'rgba(107,225,227,0.08)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    for (const s of stars) {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < -10) s.x = W + 10;
      if (s.x > W + 10) s.x = -10;
      if (s.y < -10) s.y = H + 10;
      if (s.y > H + 10) s.y = -10;

      s.a += Math.sin((s.x + s.y) * 0.002) * s.tw;
      const alpha = Math.max(0.08, Math.min(0.85, s.a));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(254,254,255,${alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener('resize', resize);
};