/* mascot.js — GSAP animations: breathing, blink, tail wiggle, and responses */
document.addEventListener('DOMContentLoaded', () => {
  const mascot = document.getElementById('mascot');
  if (!mascot) return;

  // Ensure transform origin is set so "tail wiggle" pivots near bottom-right of image
  mascot.style.transformOrigin = "80% 80%";
  mascot.style.willChange = "transform, opacity";

  // 1) subtle breathing / bob
  gsap.to(mascot, {
    y: -6,
    duration: 2.6,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
  });

  // 2) tiny idle rotation for charm (very subtle)
  gsap.to(mascot, {
    rotation: 1.2,
    duration: 4.5,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  // 3) blink: quick vertical squash to simulate blink
  function blink() {
    gsap.timeline()
      .to(mascot, { scaleY: 0.85, duration: 0.08, ease:"power2.out" })
      .to(mascot, { scaleY: 1, duration: 0.1, delay: 0.06, ease:"power2.in" });
  }
  // auto-blink every 4-7s (random jitter)
  function scheduleBlink() {
    const t = 4 + Math.random() * 3;
    setTimeout(() => { blink(); scheduleBlink(); }, t * 1000);
  }
  scheduleBlink();

  // 4) tail wiggle: a quick rotation sequence (works best if tail is at bottom-right)
  function tailWiggle() {
    gsap.timeline()
      .to(mascot, { rotation: 12, duration: 0.12, ease: "power2.out" })
      .to(mascot, { rotation: -10, duration: 0.12, ease: "power2.in" })
      .to(mascot, { rotation: 8, duration: 0.12 })
      .to(mascot, { rotation: 0, duration: 0.12 });
  }

  // 5) reactions: when user sends a message --> happy wiggle + small pop
  function reactSent() {
    gsap.timeline()
      .to(mascot, { scale: 1.08, duration: 0.12 })
      .to(mascot, { rotation: -12, duration: 0.12 })
      .to(mascot, { rotation: 10, duration: 0.12 })
      .to(mascot, { rotation: 0, scale: 1, duration: 0.12 });
    // tail wag after pop
    setTimeout(tailWiggle, 260);
  }

  // 6) reactions: when assistant reply arrives: small nod/bounce + tail wiggle
  function reactReceived() {
    gsap.fromTo(mascot, { y: -10 }, { y: 0, duration: 0.45, ease: "bounce.out" });
    setTimeout(tailWiggle, 300);
  }

  // Hook to DOM events that we dispatch from chat.html
  document.addEventListener('message:sent', reactSent);
  document.addEventListener('message:received', reactReceived);

  // If send button exists, also add a direct click hook (in case vanilla events miss)
  const sendBtn = document.querySelector('button[type="submit"], button.send-btn, #send-button');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      // short delay so animation feels synced with message dispatch
      setTimeout(reactSent, 80);
    });
  }
});
