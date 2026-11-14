import { obtenerMenu } from "./api.js";
import { guardar, leer } from "./storage.js";
import { mostrarEstado, pintarMenu, alertaFavorito, alertaError } from "./ui.js";

const contenedorMenu = document.querySelector("#contenedor-menu");
let favoritos = leer("jalisco_favoritos", []);
let menuActual = [];

async function iniciarMenu() {
  if (!contenedorMenu) return;

  mostrarEstado(contenedorMenu, "Cargando el menú de La Jalisco...");

  try {
    menuActual = await obtenerMenu();

    if (!menuActual.length) {
      mostrarEstado(contenedorMenu, "No hay platillos disponibles.");
      return;
    }

    pintarMenu(contenedorMenu, menuActual, favoritos);
  } catch (err) {
    console.error(err);
    mostrarEstado(contenedorMenu, "No pudimos cargar el menú.", true);
    alertaError("Error de conexión al obtener el menú.");
  }
}

if (contenedorMenu) {
  contenedorMenu.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-accion='favorito']");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const platillo = menuActual.find((p) => p.id === id);
    const indice = favoritos.indexOf(id);

    let agregado = false;
    if (indice === -1) {
      favoritos.push(id);
      agregado = true;
    } else {
      favoritos.splice(indice, 1);
    }

    guardar("jalisco_favoritos", favoritos);
    pintarMenu(contenedorMenu, menuActual, favoritos);
    if (platillo) alertaFavorito(platillo.nombre, agregado);
  });
}

iniciarMenu();