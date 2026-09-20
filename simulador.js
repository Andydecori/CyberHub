// =========================================
// SIMULADOR DE CIFRADO CÉSAR
// =========================================

// 1. Capturamos los elementos del DOM
const inputMensaje = document.getElementById('mensajeOriginal');
const inputDesplazamiento = document.getElementById('desplazamiento');
const outputResultado = document.getElementById('mensajeResultado');
const btnCifrar = document.getElementById('btnCifrar');
const btnDescifrar = document.getElementById('btnDescifrar');

// 2. Función principal que maneja la lógica matemática
// Recibe un parámetro booleano: true para cifrar, false para descifrar
function procesarCriptografia(esCifrado) {
    const texto = inputMensaje.value;
    // Parseamos el desplazamiento para asegurarnos de que es un número entero
    let desplazamiento = parseInt(inputDesplazamiento.value); 
    
    // Validación básica: Si no hay texto, mostramos una alerta
    if (texto.trim() === "") {
        alert("Por favor, ingresa un mensaje para procesar.");
        return;
    }

    // Si estamos descifrando, invertimos el desplazamiento matemático
    if (!esCifrado) {
        desplazamiento = (26 - (desplazamiento % 26)) % 26;
    }

    let resultado = "";

    // 3. Bucle para iterar sobre cada carácter del texto ingresado
    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        
        // Expresión regular para detectar si el carácter es una letra (ignorando números y signos)
        if (char.match(/[a-z]/i)) {
            // Obtenemos el código ASCII de la letra
            let codigoASCII = texto.charCodeAt(i);
            
            // Lógica para Letras Mayúsculas (ASCII 65 al 90)
            if (codigoASCII >= 65 && codigoASCII <= 90) {
                // Aplicamos la fórmula matemática del Cifrado César y volvemos a convertir a letra
                char = String.fromCharCode(((codigoASCII - 65 + desplazamiento) % 26) + 65);
            }
            // Lógica para Letras Minúsculas (ASCII 97 al 122)
            else if (codigoASCII >= 97 && codigoASCII <= 122) {
                char = String.fromCharCode(((codigoASCII - 97 + desplazamiento) % 26) + 97);
            }
        }
        // Añadimos el carácter (modificado o intacto) al resultado final
        resultado += char;
    }

    // 4. Inyectamos el resultado en el DOM
    outputResultado.value = resultado;
}

// 5. Escuchadores de eventos para los botones
btnCifrar.addEventListener('click', function() {
    procesarCriptografia(true);
});

btnDescifrar.addEventListener('click', function() {
    procesarCriptografia(false);
});