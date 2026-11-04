export function validarNombre(nombre){
    if(!nombre.trim())return "El nombre es obligatorio";
    if(nombre.length < 3)return "El nombre debe tener al menos 3 caracteres";
    if(nombre.length > 50)return "El nombre no puede tener más de 50 caracteres";
    return "";
}

export function validarCorreo(correo){
    if(!correo.trim())return "El correo es obligatorio";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(correo))return "El correo no es válido";
    return "";
}

export function validarMensaje(mensaje){
    if(!mensaje.trim())return "El mensaje es obligatorio";
    if(mensaje.length < 10)return "El mensaje debe tener al menos 10 caracteres";
    if(mensaje.length > 500)return "El mensaje no puede tener más de 500 caracteres";
    return "";
}

export function mostrarError(inputeElement, mensaje){
let errorSpan = inputeElement.nextElementSibling;
    if(!errorSpan || !errorSpan.classList.contains("error-msg")){
    errorSpan = document.createElement("span");
    errorSpan.className = "error-msg";
    errorSpan.style.color = '#B83119'
    errorSpan.style.fontSize = '0.85rem';
    errorSpan.style.marginTop = '0.2rem';
    inputeElement.insertAdjacentElement("afterend", errorSpan);
    }
    errorSpan.textContent = mensaje;
}
export function limpiarError(formElement){
    const spans = formElement.querySelectorAll(".error-msg");
    spans.forEach(span => span.textContent = '');
}

import{ validarNombre, validarCorreo, validarMensaje} from "./validaciones.h.js";
import{ mostrarError, limpiarError} from "./ui.js";

const form = document.querySelector("#form-contacto");
if(form){
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        limpiarError(form);
        const formData = new FormData(form);
        const datos = Object.fromEntries(formData.entries());

        const errorNombre = validarNombre(datos.nombre);
        const errorCorreo = validarCorreo(datos.correo);
        const errorMensaje = validarMensaje(datos.mensaje);

        let hayErrores = false;
        if(errorNombre){
            mostrarError(form.querySelector("#nombre"), errorNombre);
            hayErrores = true;
        }
        if(errorCorreo){
            mostrarError(form.querySelector("#correo"), errorCorreo);
            hayErrores = true;
        }
        if(errorMensaje){
            mostrarError(form.querySelector("#mensaje"), errorMensaje);
            hayErrores = true;
        }

        if(!hayErrores){
            console.log("Formulario enviado con éxito:", datos);   
            
            alert("Formulario enviado con éxito. Gracias por contactarnos.");
            form.reset();
        }
    });
}