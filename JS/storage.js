export const guardar = (clave, valor) => {
  localStorage.setItem(clave, JSON.stringify(valor));
};

export const leer = (clave, defecto = null) => {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? defecto;
  } catch {
    return defecto;
  }
};