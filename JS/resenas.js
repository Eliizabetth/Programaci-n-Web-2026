const URL_RESENAS = "../api/resenas.php";

const listaResenas = document.querySelector("#lista-resenas");
const formResena = document.querySelector("#form-resena");
const estadoResenas = document.querySelector("#estado-resenas");
const mensajeForm = document.querySelector("#mensaje-form-resena");

function renderResenas(resenas) {
  listaResenas.innerHTML = "";

  if (!Array.isArray(resenas) || resenas.length === 0) {
    listaResenas.innerHTML = "<p>Aún no hay reseñas. ¡Agrega la primera!</p>";
    return;
  }

  for (const r of resenas) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "menu-item";

    const estrellas = "★".repeat(Number(r.calificacion) || 0);
    tarjeta.innerHTML = `
      <span>${estrellas} (${r.calificacion}/5)</span>
      <h3>${r.cliente} — ${r.platillo}</h3>
      <p>${r.comentario}</p>
    `;

    listaResenas.append(tarjeta);
  }
}

async function cargarResenas() {
  estadoResenas.textContent = "Cargando reseñas...";
  estadoResenas.classList.remove("error");

  try {
    const respuesta = await fetch(URL_RESENAS);
    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}: no se pudieron cargar las reseñas.`);
    }

    const datos = await respuesta.json();
    estadoResenas.textContent = "";
    renderResenas(datos);
  } catch (error) {
    console.error(error);
    estadoResenas.textContent = "No fue posible cargar las reseñas. Intenta de nuevo.";
    estadoResenas.classList.add("error");
  }
}

formResena?.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  mensajeForm.textContent = "";
  mensajeForm.classList.remove("error");

  const datosForm = Object.fromEntries(new FormData(formResena));
  const payload = {
    cliente: datosForm.cliente?.trim() ?? "",
    platillo: datosForm.platillo?.trim() ?? "",
    calificacion: Number(datosForm.calificacion),
    comentario: datosForm.comentario?.trim() ?? "",
  };

  try {
    const respuesta = await fetch(URL_RESENAS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(resultado.error ?? "No se pudo guardar la reseña.");
    }

    formResena.reset();
    mensajeForm.textContent = "¡Reseña publicada!";
    await cargarResenas();
  } catch (error) {
    console.error(error);
    mensajeForm.textContent = error.message;
    mensajeForm.classList.add("error");
  }
});

cargarResenas();