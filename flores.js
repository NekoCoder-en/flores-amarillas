// Utilidad: crea una flor con sus nodos internos
function createFlower({
  x,
  stemH,
  head,
  delay,
  sway,
  speed,
  petals = 12,
  stemX = x,
}) {
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.style.setProperty("--x", x + "px");
  flower.style.setProperty("--stem-h", stemH + "px");
  flower.style.setProperty("--head", head + "px");
  flower.style.setProperty("--delay", `${delay}s`);
  flower.style.setProperty("--sway", `${sway}deg`);
  flower.style.setProperty("--speed", `${speed}s`);
  // posición del tallo relativa al contenedor flower: wrap-left = stemX - x
  flower.style.setProperty("--wrap-left", stemX - x + "px");

  // tallo
  // wrapper que aplicará el sway y contendrá tallo + cabezuela
  const wrap = document.createElement("div");
  wrap.className = "flower__wrap";

  const stem = document.createElement("div");
  stem.className = "flower__stem";
  wrap.appendChild(stem);

  // hojas (4)
  for (let i = 0; i < 4; i++) {
    const leaf = document.createElement("div");
    leaf.className = "leaf" + (i % 2 ? " r" : "");
    flower.appendChild(leaf);
  }

  // cabezuela
  const headWrap = document.createElement("div");
  headWrap.className = "head";
  const petalsWrap = document.createElement("div");
  petalsWrap.className = "petals";

  // pétalos alrededor (petals)
  for (let i = 0; i < petals; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    const angle = (360 / petals) * i;
    p.style.setProperty("--rot", angle + "deg");
    p.style.setProperty("--petal-d", i * 0.05 + "s"); // entrada en cascada
    petalsWrap.appendChild(p);
  }

  // centro
  const center = document.createElement("div");
  center.className = "center";

  headWrap.appendChild(petalsWrap);
  headWrap.appendChild(center);
  wrap.appendChild(headWrap);
  flower.appendChild(wrap);

  return flower;
}

// Pinta un conjunto de flores
function populateGarden() {
  const garden = document.getElementById("garden");
  garden.innerHTML = "";
  // Configuración para ramo piramidal más natural
  const W = window.innerWidth;
  const centerX = W / 2;
  // Definir posiciones manualmente para 9 flores (3 filas: 2, 3, 4)
  const bouquet = [
    // fila superior (2)
    { x: centerX - 55, y: 120 },
    { x: centerX + 55, y: 120 },
    // fila media (3)
    { x: centerX - 90, y: 70 },
    { x: centerX, y: 80 },
    { x: centerX + 90, y: 70 },
    // fila inferior (4)
    { x: centerX - 110, y: 20 },
    { x: centerX - 40, y: 30 },
    { x: centerX + 40, y: 30 },
    { x: centerX + 110, y: 20 },
  ];

  bouquet.forEach((pos, i) => {
    const stemH = 140 + Math.random() * 18 + (130 - pos.y) * 0.18; // más largo abajo
    const head = 46 + Math.random() * 6; // cabezas un poco más pequeñas
    const delay = i * 0.1 + Math.random() * 0.18;
    const sway = 2.2 + Math.random() * 1.3;
    const speed = 4.2 + Math.random() * 1.2;
    const petals = 11 + Math.floor(Math.random() * 2);

    const flower = createFlower({
      x: pos.x,
      stemH,
      head,
      delay,
      sway,
      speed,
      petals,
    });
    flower.style.bottom = `calc(12vh + ${pos.y}px)`;
    garden.appendChild(flower);
  });

  // estrellas del fondo (opcionales)
  const scene = document.querySelector(".scene");
  // Elimina estrellas previas
  scene.querySelectorAll(".star").forEach((e) => e.remove());
  for (let i = 0; i < 40; i++) {
    const s = document.createElement("div");
    s.className = "star";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 40 + "vh";
    s.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
    s.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
    scene.appendChild(s);
  }

  // Estrellas fugaces (más naturales)
  scene.querySelectorAll(".shooting-star").forEach((e) => e.remove());

  for (let i = 0; i < 4; i++) {
    const ss = document.createElement("div");
    ss.className = "shooting-star";

    // Spawn en la parte alta del cielo
    const top = 8 + Math.random() * 26; // 8–34 vh
    const left = 18 + Math.random() * 62; // 18–80 vw
    ss.style.top = top + "vh";
    ss.style.left = left + "vw";

    // Variación de trayectoria/duración
    const angle = -(22 + Math.random() * 16); // -22° a -38°
    const dx = -34 - Math.random() * 32 + "vw"; // -34 a -66 vw
    const dy = 14 + Math.random() * 18 + "vh"; // 14 a 32 vh
    const dur = (2.2 + Math.random() * 2.2).toFixed(2) + "s"; // 2.2–4.4 s
    const delay = (Math.random() * 7 + i * 3).toFixed(2) + "s"; // escalonadas

    ss.style.setProperty("--angle", angle + "deg");
    ss.style.setProperty("--shoot-x", dx);
    ss.style.setProperty("--shoot-y", dy);
    ss.style.setProperty("--shoot-dur", dur);
    ss.style.setProperty("--delay", delay);

    scene.appendChild(ss);
  }
}

window.addEventListener("resize", () => {
  // Re-poblar al cambiar tamaño para mantener proporción
  const garden = document.getElementById("garden");
  garden.innerHTML = "";
  populateGarden();
});

populateGarden();
