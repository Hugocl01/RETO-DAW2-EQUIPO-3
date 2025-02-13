function validarNombreCompleto(nombre) {

    if (nombre.length === 0) {
        return "* Este campo es obligatorio";
    }

    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (!regex.test(nombre)) {
        return "* El nombre solo puede contener letras y espacios";
    }


    if (nombre.length < 3 || nombre.length > 50) {
        return "* El nombre debe tener entre 3 y 50 caracteres";
    }

    return "";
}


function validarDNI(dni) {
    const dniLimpio = dni.trim();

    if(dniLimpio.length === 0) {
        return "* Este campo es obligatorio";
    }

    const regex = /^\d{8}[A-Za-z]$/;
    if (!regex.test(dni)) {
        return "* El dni debe tener 8 números y 1 letra";
    }

    const numero = parseInt(dni.slice(0, 8), 10);
    const letraIngresada = dni.slice(8).toUpperCase();

    // calculo si la letra es correcta
    const letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
    const letraCorrecta = letrasDNI[numero % 23];

    if (letraIngresada !== letraCorrecta) {
        return "* Letra invalida";
    }

    return ""; 
}

function validarTelefono(telf) {
    const telefonoStr = telf.toString().trim();

    const regex = /^[6789]\d{8}$/;
    if (telefonoStr.length !== 9) {
        return "* El teléfono debe tener 9 dígitos";
    }
}

export {validarDNI, validarTelefono, validarNombreCompleto};