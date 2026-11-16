// Lista de licores (puedes agregar o editar los que quieras)
const licores = [
  { nombre: "Aguardiente Antioqueño", categoria: "Aguardiente", grados: "24%", volumen: "750 ml", precio: 52000, emoji: "🍶" },
  { nombre: "Aguardiente Néctar", categoria: "Aguardiente", grados: "24%", volumen: "750 ml", precio: 48000, emoji: "🍶" },
  { nombre: "Ron Medellín 8 años", categoria: "Ron", grados: "40%", volumen: "750 ml", precio: 75000, emoji: "🥃" },
  { nombre: "Ron Viejo de Caldas", categoria: "Ron", grados: "35%", volumen: "750 ml", precio: 60000, emoji: "🥃" },
  { nombre: "Whisky Old Parr 12", categoria: "Whisky", grados: "40%", volumen: "750 ml", precio: 145000, emoji: "🥃" },
  { nombre: "Whisky Buchanan's 12", categoria: "Whisky", grados: "40%", volumen: "750 ml", precio: 160000, emoji: "🥃" },
  { nombre: "Vodka Absolut", categoria: "Vodka", grados: "40%", volumen: "750 ml", precio: 85000, emoji: "🍸" },
  { nombre: "Tequila Jose Cuervo", categoria: "Tequila", grados: "38%", volumen: "750 ml", precio: 95000, emoji: "🍹" },
  { nombre: "Vino Tinto Gato Negro", categoria: "Vino", grados: "13%", volumen: "750 ml", precio: 38000, emoji: "🍷" },
  { nombre: "Cerveza Club Colombia", categoria: "Cerveza", grados: "4.7%", volumen: "330 ml", precio: 4500, emoji: "🍺" },
  { nombre: "Ginebra Tanqueray", categoria: "Ginebra", grados: "43%", volumen: "750 ml", precio: 110000, emoji: "🍸" },
  { nombre: "Brandy Domecq", categoria: "Brandy", grados: "36%", volumen: "700 ml", precio: 70000, emoji: "🥂" }
];

const contenedor = document.getElementById("catalogo");
const buscador = document.getElementById("buscador");
const filtros = document.getElementById("filtros");
const vacio = document.getElementById("vacio");

let categoriaActiva = "Todos";

// Formatear precio en pesos colombianos
function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });
}

// Crear botones de categorías
function crearFiltros() {
  const categorias = ["Todos", ...new Set(licores.map(l => l.categoria))];
  filtros.innerHTML = "";

  categorias.forEach(cat => {
    const boton = document.createElement("button");
    boton.textContent = cat;
    if (cat === categoriaActiva) boton.classList.add("activo");
    boton.addEventListener("click", () => {
      categoriaActiva = cat;
      crearFiltros();
      mostrarLicores();
    });
    filtros.appendChild(boton);
  });
}

// Mostrar tarjetas según búsqueda y categoría
function mostrarLicores() {
  const texto = buscador.value.toLowerCase().trim();

  const filtrados = licores.filter(l => {
    const coincideTexto = l.nombre.toLowerCase().includes(texto);
    const coincideCategoria = categoriaActiva === "Todos" || l.categoria === categoriaActiva;
    return coincideTexto && coincideCategoria;
  });

  contenedor.innerHTML = filtrados.map(l => `
    <article class="tarjeta">
      <div class="emoji">${l.emoji}</div>
      <h3>${l.nombre}</h3>
      <span class="categoria">${l.categoria}</span>
      <p class="detalle">${l.grados} alc. · ${l.volumen}</p>
      <p class="precio">${formatearPrecio(l.precio)}</p>
    </article>
  `).join("");

  vacio.hidden = filtrados.length > 0;
}

buscador.addEventListener("input", mostrarLicores);

crearFiltros();
mostrarLicores();
