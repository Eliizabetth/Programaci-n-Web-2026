const btnMenu = document.querySelector("#btn-menu");
const navegacion = document.querySelector("#menu-navegacion");

if (btnMenu && navegacion) {

    btnMenu.addEventListener("click", () => {

        navegacion.classList.toggle("abierto");

        const abierto = navegacion.classList.contains("abierto");

        btnMenu.setAttribute("aria-expanded", abierto);
        btnMenu.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
    });
}
const btnTema = document.querySelector("#btn-tema");

if (btnTema) {

    btnTema.addEventListener("click", () => {

        document.body.classList.toggle("tema-claro");

        const modoClaro = document.body.classList.contains("tema-claro");

        btnTema.textContent = modoClaro
            ? "☾ Modo oscuro"
            : "☀ Modo claro";
    });
}

const buscador = document.querySelector("#buscar-producto");
const botonesFiltro = document.querySelectorAll("[data-filtro]");
const productos = document.querySelectorAll(".menu-item[data-categoria]");

let categoriaActual = "todos";

function filtrarProductos() {

    const texto = buscador
        ? buscador.value.toLowerCase().trim()
        : "";

    productos.forEach((producto) => {

        const categoria = producto.dataset.categoria;
        const nombre = producto.textContent.toLowerCase();

        const coincideCategoria =
            categoriaActual === "todos" ||
            categoria === categoriaActual;

        const coincideTexto = nombre.includes(texto);

        producto.hidden = !(coincideCategoria && coincideTexto);
    });
}


if (buscador) {
    buscador.addEventListener("input", filtrarProductos);
}

botonesFiltro.forEach((boton) => {

    boton.addEventListener("click", () => {

        categoriaActual = boton.dataset.filtro;

        botonesFiltro.forEach((elemento) => {
            elemento.classList.remove("activo");
        });

        boton.classList.add("activo");

        filtrarProductos();
    });
});
