import React, { useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./FallingCart.css";

/**
 * Auto-falling cart that slows down while the user scrolls.
 * - Uses WAAPI to animate from -101vh to 0 (rest), repeats once (no reset).
 * - Scroll velocity reduces playbackRate toward a floor; on idle it eases back to 1.
 * - Hover/focus reveals ripple; click navigates to /cart.
 */
const FallingCart = ({
  right = 16,              // px from right edge
  bottomOffset = 88,       // resting offset above BackToTop
  durationMs = 14000,      // baseline fall duration in ms (larger = slower overall)
  delayMs = 200,           // start delay in ms
  minRate = 0.15,          // slowest playbackRate under heavy scrolling
  easeBackMs = 400,        // time to ease back to rate=1 after scroll stops
  scrollSensitivity = 0.004, // map |scrollVelocity| to slow down amount
  size = 22,               // icon size
  navigateTo = "/cart",
  ariaLabel = "Go to cart",
  className = ""
}) => {
  const navigate = useNavigate();
  const hostRef = useRef(null);
  const animRef = useRef(null);

  // Scroll velocity tracking
  const lastY = useRef(0);
  const lastT = useRef(0);
  const targetRate = useRef(1);   // desired rate based on scroll velocity
  const isHovering = useRef(false);
  const rafWrite = useRef(0);
  const rafEase = useRef(0);

  // Start WAAPI fall animation once
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    // Initialize off-screen transform; CSS will also set a default
    el.style.setProperty("--fc-ty", `${-1.01 * window.innerHeight}px`);
    el.style.transform = `translateY(var(--fc-ty))`;

    // Create the animation: translateY(-101vh) -> translateY(0)
    const fall = el.animate(
      [
        { transform: `translateY(${-1.01 * window.innerHeight}px)` },
        { transform: `translateY(0px)` }
      ],
      {
        duration: durationMs,
        delay: delayMs,
        easing: "cubic-bezier(.22,.61,.36,1)",
        fill: "forwards",
        iterations: 1
      }
    );

    fall.playbackRate = 1; // baseline
    animRef.current = fall;

    return () => {
      fall.cancel();
      animRef.current = null;
    };
  }, [durationMs, delayMs]);

  // rAF writer to apply current targetRate smoothly via updatePlaybackRate()
  useEffect(() => {
    const stepEase = (startTime, startRate) => {
      if (!animRef.current) return;
      const now = performance.now();
      const t = Math.min(1, (now - startTime) / easeBackMs);
      const eased = startRate + (1 - startRate) * t;
      // Use updatePlaybackRate for smooth sync to current position
      animRef.current.updatePlaybackRate(eased); // MDN recommends this for better sync [3]
      if (t < 1) {
        rafEase.current = requestAnimationFrame(() => stepEase(startTime, startRate));
      } else {
        rafEase.current = 0;
      }
    };

    const applyRate = (rate) => {
      if (!animRef.current) return;
      // For immediate response during scroll, set synchronously
      animRef.current.playbackRate = rate; // fast feedback [1]
      // When scroll stops, ease back to 1
      if (rate === 1) return;
      if (rafEase.current) cancelAnimationFrame(rafEase.current);
      const startRate = rate;
      const startTime = performance.now();
      rafEase.current = requestAnimationFrame(() => stepEase(startTime, startRate));
    };

    let scrollRaf = 0;
    let stopTimer = 0;

    const onScroll = () => {
      if (!animRef.current) return;
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const y = window.scrollY || window.pageYOffset || 0;
        const t = performance.now();

        if (lastT.current === 0) {
          lastY.current = y;
          lastT.current = t;
          return;
        }

        const dy = y - lastY.current;
        const dt = Math.max(1, t - lastT.current);
        const vel = Math.abs(dy) / dt; // px per ms

        lastY.current = y;
        lastT.current = t;

        // Map velocity to a slowdown factor: higher vel -> lower rate
        const slowdown = Math.min(0.9, vel / Math.max(0.00001, scrollSensitivity)); // cap slowdown
        const newRate = Math.max(minRate, 1 - slowdown);

        targetRate.current = newRate;
        applyRate(newRate);

        // When scrolling stops for 180ms, ease back to 1
        if (stopTimer) clearTimeout(stopTimer);
        stopTimer = window.setTimeout(() => {
          targetRate.current = 1;
          applyRate(1);
        }, 180);
      });
    };

    // Initialize velocity baseline
    lastY.current = window.scrollY || 0;
    lastT.current = performance.now();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (rafEase.current) cancelAnimationFrame(rafEase.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [easeBackMs, minRate, scrollSensitivity]);

  // Hover should pause visually (ripple still plays); we’ll just set rate near zero while hovered.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const btn = el.querySelector(".fc-btn");
    if (!btn) return;

    const onEnter = () => {
      isHovering.current = true;
      if (animRef.current) animRef.current.playbackRate = 0; // effectively pause [1]
    };
    const onLeave = () => {
      isHovering.current = false;
      if (animRef.current) animRef.current.updatePlaybackRate(1); // smooth resume [3]
    };

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("focus", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("blur", onLeave);

    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("focus", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("blur", onLeave);
    };
  }, []);

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <div
      ref={hostRef}
      className={`falling-cart-auto ${className}`}
      style={{ right: `${right}px`, bottom: `${bottomOffset}px` }}
    >
      <button
        type="button"
        className="fc-btn"
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        <ShoppingCart size={size} />
        <span className="ripples" aria-hidden="true" />
      </button>
    </div>
  );
};

export default FallingCart;
