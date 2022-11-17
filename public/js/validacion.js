let nombre = document.getElementById("nombre");
// VALIDACIÓN DE INFORMACIÓN

function validarNombre() {
    if (/^[a-zA-Z]/.test(nombre.value) || nombre.value === "") {
        if (nombre.value.length < 4 || nombre.value.length > 255) {
            //alert("El nombre solo puede incluír de 4 a 255 caracteres");
            msgnombre.innerHTML =
                "<p class='incorrecto'>Nombre invalido. El nombre de incluír de 4 a 255 caracteres</p>";
        } else {
            //alert(`El nombre "${nombre.value}" es válido\nSu nombre ha sido recibido`);
            msgnombre.innerHTML = `<p class='correcto'>El nombre "${nombre.value}" es valido</p>`;
        }
    } else {
        //alert("El nombre solo puede incluir letras");
        msgnombre.innerHTML = "<p class='incorrecto'>Nombre invalido</p>";
    }
}

function validarDespacho() {
    if (despacho.value.charAt(0) == "A" || despacho.value.charAt(0) == "B") {
        if (despacho.value.length != 4) {
            // Verificacion de longitud
            msgdespacho.innerHTML = `<p class='incorrecto'>Los despachos deben tener un nombre de 4 carácteres</p>`;
        } else if (/^[0-9]{3}$/.test(despacho.value.substring(1, 4))) {
            // Validacion de 3 digitos
            msgdespacho.innerHTML = `<p class='correcto'> El despacho ${despacho.value} es válido</p>`;
        } else {
            msgdespacho.innerHTML = `<p class='incorrecto'>Los ultimos 3 carácteres del despacho deben ser números. Ingresa un despacho que sea válido</p>`;
        }
    } else {
        msgdespacho.innerHTML = `<p class='incorrecto'>Los despachos solo pueden empezar con A o B Ingresa un despacho que sea válido</p>`;
    }
}

function validarPuesto() {
    if (
        [
            "JEFE_AREA",
            "DIRECTOR_COMERCIAL",
            "JEFE_AREA",
            "ANALISTA",
            "PROGRAMADOR",
        ].indexOf(puesto.value) != -1
    ) {
        // Puesto valido
        msgpuesto.innerHTML = `<p class='correcto'>El puesto ingresado coincide. Es válido</p>`;
    } else {
        // Puesto invalido
        msgpuesto.innerHTML = `<p class='incorrecto'>Ese no es un puesto válido. Ingresa un puesto que exista</p>`;
    }
}

function validarEdad() {
    //primero verifica que sea un número
    if (/^\d+$/.test(edad.value)) {
        if (parseInt(edad.value) < 18) {
            msgedad.innerHTML = `<p class='incorrecto'>La edad "${edad.value}" es inválida. Debes tener al menos 18 años</p>`;
            //alert("Debes tener al menos 18 años");
        } else if (parseInt(edad.value) > 67) {
            //alert(`${edad.value} excede la edad mínima requerida`);
            msgedad.innerHTML = `<p class='incorrecto'>La edad "${edad.value}" excede la edad mínima requerida</p>`;
        } else {
            //alert("Edad recibida");
            msgedad.innerHTML = `<p class='correcto'>La edad "${edad.value}" es válida</p>`;
        }
    } else {
        msgedad.innerHTML = `<p class='incorrecto'>Ingresa un valor numérico</p>`;
    }
}

function validarSueldo() {
    if (parseInt(sueldo.value) < 1000 || sueldo.value.length < 3) {
        //alert(`El sueldo ingresado es menor a la sueldo mínimo permitido`);
        msgsueldo.innerHTML = `<p class='incorrecto'>El sueldo ${sueldo.value} es menor a la sueldo mínimo permitido`;
    } else if (parseInt(sueldo.value) > 6000) {
        alert(`${sueldo.value} excede el sueldo máximo permitido`);
        msgsueldo.innerHTML = `<p class='incorrecto'>${sueldo.value} excede el sueldo máximo permitido`;
    } else {
        alert(`${sueldo.value} es válido. Sueldo recibido`);
        msgsueldo.innerHTML = `<p class='correcto'>El sueldo "${sueldo.value}" es valido</p>`;
    }
}

function Retencion() {
    if (
        parseInt(sueldo.value) < 1000 ||
        sueldo.value.length < 3 ||
        parseInt(sueldo.value) > 6000
    ) {
        //Hace lo mismo que en la anterior clase para ver que el campo de texto sirva
        console.log(`El sueldo ingresado no es válido para retención`);
        msgretencion.innerHTML = `<p class='incorrecto'>El sueldo ingresado no es válido para retención.\nDebe ser un valor entre 1000 y 6000</p>`;
    } else if (parseInt(sueldo.value) >= 1000) {
        //Verifica si aparte de se mayor a 1000, es mayor a 2000
        if (parseInt(sueldo.value) >= 2000) {
            //Verifica si aparte de se mayor a 2000, es mayor a 3000
            if (parseInt(sueldo.value) >= 3000) {
                //Verifica si aparte de se mayor a 3000, es mayor a 4000
                if (parseInt(sueldo.value) >= 4000) {
                    //Verifica si aparte de se mayor a 3000, es mayor a 5000
                    if (parseInt(sueldo.value) >= 5000) {
                        // Si es mayor a 5000 termina
                        //Aquí termina el flujo xd
                        msgretencion.innerHTML = `<p class='correcto'>La retencion es de "${
                            parseInt(sueldo.value) * 0.14
                        }"</p>`;
                    } else {
                        msgretencion.innerHTML = `<p class='correcto'>La retencion es de "${
                            parseInt(sueldo.value) * 0.125
                        }"</p>`;
                    }
                } else {
                    msgretencion.innerHTML = `<p class='correcto'>La retencion es de "${
                        parseInt(sueldo.value) * 0.11
                    }"</p>`;
                }
            } else {
                msgretencion.innerHTML = `<p class='correcto'>La retencion es de "${
                    parseInt(sueldo.value) * 0.95
                }"</p>`;
            }
        } else {
            msgretencion.innerHTML = `<p class='correcto'>La retencion es de "${
                parseInt(sueldo.value) * 0.08
            }"</p>`;
        }
    } else {
        console.log(
            "No se, si salgo yo es que algo salió mal y nos vamos a morir"
        );
    }
}
