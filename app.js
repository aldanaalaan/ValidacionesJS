// Importaciones
const SocketIO = require("socket.io");
const express = require("express");
const path = require("path");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Local: http://127.0.0.1:${PORT}`);
    try {
        console.log(
            `Network: http://${
                os.networkInterfaces()["Wi-Fi"][1].address || null
            }:${PORT}`
        );
    } catch (error) {
        console.log("Network: XD");
    }
});

const io = SocketIO(server);
io.on("connection", (socket) => {
    socket.on("eNombre", (data) => {
        let mensajes = "";
        if (/^[a-zA-Z]/.test(data) || data === "") {
            if (data.length < 4 || data.length > 255) {
                //alert("El nombre solo puede incluír de 4 a 255 caracteres");
                mensajes +=
                    "<p class='incorrecto'>Nombre invalido. El nombre de incluír de 4 a 255 caracteres</p></br>";
            } else {
                //alert(`El nombre "${data}" es válido\nSu nombre ha sido recibido`);
                mensajes = `<p class='correcto'>El nombre "${data}" es valido</p>`;
            }
        } else {
            //alert("El nombre solo puede incluir letras");
            mensajes += "<p class='incorrecto'>Nombre invalido</p></br>";
        }
        socket.emit("eNombre", mensajes);
    });

    socket.on("eDespacho", (data) => {
        mensajes = "";
        if (data.charAt(0) == "A" || data.charAt(0) == "B") {
            if (data.length != 4) {
                // Verificacion de longitud
                mensajes += `<p class='incorrecto'>Los despachos deben tener un nombre de 4 carácteres</p></br>`;
            } else if (/^[0-9]{3}$/.test(data.substring(1, 4))) {
                // Validacion de 3 digitos
                mensajes += `<p class='correcto'> El despacho ${data} es válido</p>`;
            } else {
                mensajes += `<p class='incorrecto'>Los ultimos 3 carácteres del despacho deben ser números. Ingresa un despacho que sea válido</p></br>`;
            }
        } else {
            mensajes += `<p class='incorrecto'>Los despachos solo pueden empezar con A o B Ingresa un despacho que sea válido</p></br>`;
        }
        socket.emit("eDespacho", mensajes);
    });

    socket.on("ePuesto", (data) => {
        mensajes = "";
        if (
            [
                "JEFE_AREA",
                "DIRECTOR_COMERCIAL",
                "JEFE_AREA",
                "ANALISTA",
                "PROGRAMADOR",
            ].indexOf(data) != -1
        ) {
            // Puesto valido
            mensajes += `<p class='correcto'>El puesto ingresado coincide. Es válido</p>`;
        } else {
            // Puesto invalido
            mensajes += `<p class='incorrecto'>Ese no es un puesto válido. Ingresa un puesto que exista</p>`;
        }
        socket.emit("ePuesto", mensajes);
    });

    socket.on("eEdad", (data) => {
        let mensajes = "";
        //primero verifica que sea un número
        if (/^\d+$/.test(data)) {
            if (parseInt(data) < 18) {
                mensajes += `<p class='incorrecto'>La edad "${data}" es inválida. Debes tener al menos 18 años</p>`;
                //alert("Debes tener al menos 18 años");
            } else if (parseInt(data) > 67) {
                //alert(`${data} excede la edad mínima requerida`);
                mensajes += `<p class='incorrecto'>La edad "${data}" excede la edad mínima requerida</p>`;
            } else {
                //alert("Edad recibida");
                mensajes += `<p class='correcto'>La edad "${data}" es válida</p>`;
            }
        } else {
            mensajes += `<p class='incorrecto'>Ingresa un valor numérico</p>`;
        }
        socket.emit("eEdad", mensajes);
    });

    socket.on("eSueldo", (data) => {
        mensajes = "";
        if (parseInt(data) < 1000 || data.length < 3) {
            //alert(`El sueldo ingresado es menor a la sueldo mínimo permitido`);
            mensajes += `<p class='incorrecto'>El sueldo ${data} es menor a la sueldo mínimo permitido`;
        } else if (parseInt(data) > 6000) {
            mensajes += `<p class='incorrecto'>${data} excede el sueldo máximo permitido`;
        } else {
            mensajes += `<p class='correcto'>El sueldo "${data}" es valido</p>`;
        }
        socket.emit("eSueldo", mensajes);
    });

    socket.on("eRetencion", (data) => {
        let mensajes = "";
        if (parseInt(data) < 1000 || data.length < 3 || parseInt(data) > 6000) {
            mensajes += `<p class='incorrecto'>El sueldo ingresado no es válido para retención.\nDebe ser un valor entre 1000 y 6000</p>`;
        } else if (parseInt(data) >= 1000) {
            //Verifica si aparte de se mayor a 1000, es mayor a 2000
            if (parseInt(data) >= 2000) {
                //Verifica si aparte de se mayor a 2000, es mayor a 3000
                if (parseInt(data) >= 3000) {
                    //Verifica si aparte de se mayor a 3000, es mayor a 4000
                    if (parseInt(data) >= 4000) {
                        //Verifica si aparte de se mayor a 3000, es mayor a 5000
                        if (parseInt(data) >= 5000) {
                            // Si es mayor a 5000 termina
                            //Aquí termina el flujo xd
                            mensajes += `<p class='correcto'>La retencion es de "${
                                parseInt(data) * 0.14
                            }"</p>`;
                        } else {
                            mensajes += `<p class='correcto'>La retencion es de "${
                                parseInt(data) * 0.125
                            }"</p>`;
                        }
                    } else {
                        mensajes += `<p class='correcto'>La retencion es de "${
                            parseInt(data) * 0.11
                        }"</p>`;
                    }
                } else {
                    mensajes += `<p class='correcto'>La retencion es de "${
                        parseInt(data) * 0.95
                    }"</p>`;
                }
            } else {
                mensajes += `<p class='correcto'>La retencion es de "${
                    parseInt(data) * 0.08
                }"</p>`;
            }
        } else {
            console.log(
                "No se, si salgo yo es que algo salió mal y nos vamos a morir"
            );
        }
        socket.emit("eRetencion", mensajes);
    });
});
