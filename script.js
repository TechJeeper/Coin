(function () {
  const coin = document.getElementById("flip-coin");
  const inner = coin?.querySelector(".coin-inner");
  if (!coin || !inner) return;

  let rotation = 0;
  let flipping = false;

  coin.addEventListener("click", () => {
    if (flipping) return;
    flipping = true;

    coin.classList.remove("is-paused");
    coin.classList.add("is-flipping");

    const isHeads = Math.random() < 0.5;
    const targetFace = isHeads ? 0 : 180;
    const spins = 4;
    const extra = (spins * 360) + targetFace - (rotation % 360);
    const start = rotation % 360;
    rotation += extra;

    inner.style.setProperty("--spin-start", start + "deg");
    inner.style.setProperty("--spin-end", rotation + "deg");

    const onEnd = () => {
      inner.removeEventListener("animationend", onEnd);
      coin.classList.remove("is-flipping");
      inner.style.animation = "none";
      inner.style.transform = "rotateY(" + (rotation % 360) + "deg)";
      void inner.offsetWidth;
      inner.style.animation = "";
      flipping = false;

      setTimeout(() => {
        if (!flipping) coin.classList.remove("is-paused");
      }, 2000);
    };

    inner.addEventListener("animationend", onEnd);
    coin.classList.add("is-paused");
  });

  coin.addEventListener("mouseenter", () => {
    if (!flipping) coin.classList.add("is-paused");
  });

  coin.addEventListener("mouseleave", () => {
    if (!flipping) coin.classList.remove("is-paused");
  });
})();
