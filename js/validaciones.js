export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];


const mensajeDeError = {
    nombre : {
        valueMissing : "Este campo nombre no puede estar vacio.",
    },
    email : {
        valueMissing : "Este campo correo no puede estar vacio.",
        typeMismatch : "El correo no es valido.",
    },
    password : {
        valueMissing : "Este campo contraseña no puede estar vacio.",
        patternMismatch : "La contraseña tiene que ser de 6 a 32 caracteres, donde tiene que tener al menos una letra(mayuscula y minuscula), un numero y no tiene que tener un caracter especial.",
    },
    nacimiento : {
        valueMissing : "Este campo no puede estar vacio.",
        customError : "Tienes que ser mayor de 18 años.",
    },
    numero : {
        valueMissing : "Este campo no puede estar vacio",
        patternMismatch : "El formato requerido es XXXXXXXXXX 10 numeros.",
    },
    direccion : {
        valueMissing : "Este campo no puede estar vacio.",
        patternMismatch : "La direccion debe contener entre 10 a 40 caracteres.",
    },
    ciudad : {
        valueMissing : "Este campo no puede estar vacio.",
        patternMismatch : "La ciudad debe contener entre 10 a 40 caracteres.",
    },
    estado : {
        valueMissing : "Este campo no puede estar vacio.",
        patternMismatch : "El estado debe contener entre 10 a 40 caracteres.",
    },
};

const validadores = {
    nacimiento : (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Tienes que ser mayor de 18 años.";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}