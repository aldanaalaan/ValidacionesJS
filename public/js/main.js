const socket = io();

//# Elementos del DOM
//* Entradas de texto
const txtNombre = document.getElementById("nombre");
const txtDespacho = document.getElementById("despacho");
const txtPuesto = document.getElementById("puesto");
const txtEdad = document.getElementById("edad");
const txtSueldo = document.getElementById("sueldo");

//* Mensajes
const msgNombre = document.getElementById("msgnombre");
const msgDespacho = document.getElementById("msgdespacho");
const msgPuesto = document.getElementById("msgpuesto");
const msgEdad = document.getElementById("msgedad");
const msgSueldo = document.getElementById("msgsueldo");

const msgRetencion = document.getElementById("msgretencion");

const btn = document.getElementById("btnFinal");

//# Eventos
//* Cada entrada tiene su propio evento al perder el foco
txtNombre.addEventListener("blur", () => {
    socket.emit("eNombre", txtNombre.value);
});

txtDespacho.addEventListener("blur", () => {
    socket.emit("eDespacho", txtDespacho.value);
});

txtPuesto.addEventListener("blur", () => {
    socket.emit("ePuesto", txtPuesto.value);
});

txtEdad.addEventListener("blur", () => {
    socket.emit("eEdad", txtEdad.value);
});

txtSueldo.addEventListener("blur", () => {
    socket.emit("eSueldo", txtSueldo.value);
});

btn.addEventListener("click", () => {
    socket.emit("eSueldo", txtSueldo.value);
});
// Recibir los eventos
socket.on("eNombre", (data) => {
    msgNombre.innerHTML = data;
});

socket.on("eDespacho", (data) => {
    msgDespacho.innerHTML = data;
});

socket.on("ePuesto", (data) => {
    msgPuesto.innerHTML = data;
});

socket.on("eEdad", (data) => {
    msgEdad.innerHTML = data;
});

socket.on("eSueldo", (data) => {
    msgSueldo.innerHTML = data;
});

socket.on("eRetencion", (data) => {
    msgRetencion.innerHTML = data;
});
