export async function obtenerMenu(){
    const response = await fetch("../menu.json");
    if(!response.ok)throw new Error("Error al obtener el menú");
    return await response.json();
}
