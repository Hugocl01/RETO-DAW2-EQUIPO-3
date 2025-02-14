function validarNombre(nombre) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

    if ((nombre.length === 0) || (!regex.test(nombre)) || (nombre.length < 3 || nombre.length > 50)) {
        return false;
    }

    return true;
}

function errorNombre(nombre) {
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

    return "* Nombre Invalido";
}


function validarDNI(dni) {
    const dniLimpio = dni.trim();

    const regex = /^\d{8}[A-Za-z]$/;

    const numero = parseInt(dni.slice(0, 8), 10);
    const letraIngresada = dni.slice(8).toUpperCase();

    // calculo para saber si la letra es correcta
    const letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
    const letraCorrecta = letrasDNI[numero % 23];

    if ((dniLimpio.length === 0) || (!regex.test(dni)) || (letraIngresada !== letraCorrecta)) {
        return false;
    }

    return true;
}

function errorDNI(dni) {
    const dniLimpio = dni.trim();

    if (dniLimpio.length === 0) {
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

    return "* Dni invalido";
}

function validarTelefono(telf) {
    const telefonoStr = telf.toString().trim();

    const regex = /^[6789]\d{8}$/;
    if ((telefonoStr.length === 0) || (telefonoStr.length !== 9) || (telefonoStr.includes("+"))) {
        return false;
    }
}

function errorTelefono(telf) {
    const telefonoStr = telf.toString().trim();

    const regex = /^[6789]\d{8}$/;
    
    if(telefonoStr.length === 0) {
        return "* Este campo es obligatorio";
    }

    if (telefonoStr.includes("+")) {
        return "* Introduce el telefono sin el prefijo"
    }
    
    if (telefonoStr.length !== 9) {
        return "* El teléfono debe tener 9 dígitos";
    }
}

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if ((email.length === 0) || !regex.test(email)) {
        return false;
    }

    return true;
}

function errorEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(email.length === 0) {
        return "* Este campo es obligatorio";
    }

    if(!regex.test(email)) {
        return "* Formato de email inválido"
    }

    return "* Email inválido";
}

export { validarNombre, errorNombre, validarDNI, errorDNI, validarTelefono, errorTelefono, validarEmail, errorEmail };