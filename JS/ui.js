export function mostrarEstado(contenedor, mensaje, esError = false) {
  contenedor.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = mensaje;
  if (esError) p.setAttribute("role", "alert");
  contenedor.append(p);
}

export function pintarMenu(contenedor, platillos, favoritos) {
  contenedor.innerHTML = "";

  platillos.forEach((item) => {
    const esFav = favoritos.includes(item.id);
    const tarjeta = document.createElement("article");
    tarjeta.className = "menu-item";

    const img = document.createElement("img");
    img.src = item.imagen;
    img.alt = item.nombre;

    const spanCat = document.createElement("span");
    spanCat.textContent = item.categoria.toUpperCase();

    const titulo = document.createElement("h3");
    titulo.textContent = item.nombre;

    const footer = document.createElement("div");
    footer.className = "card-footer";
    
    const precio = document.createElement("strong");
    precio.textContent = `$${item.precio}`;

    const btnFav = document.createElement("button");
    btnFav.className = "btn-add";
    btnFav.textContent = esFav ? "★" : "+";
    btnFav.dataset.id = item.id;
    btnFav.dataset.accion = "favorito";
    btnFav.setAttribute("aria-pressed", String(esFav));

    footer.append(precio, btnFav);
    tarjeta.append(img, spanCat, titulo, footer);
    contenedor.append(tarjeta);
  });
}

export function alertaFavorito(nombre, agregado) {
  return Swal.fire({
    icon: agregado ? "success" : "info",
    title: agregado ? "¡Agregado a favoritos!" : "Quitado de favoritos",
    text: nombre,
    timer: 1500,
    showConfirmButton: false
  });
}

export function alertaError(texto) {
  return Swal.fire({
    icon: "error",
    title: "Algo salió mal",
    text: texto
  });
}