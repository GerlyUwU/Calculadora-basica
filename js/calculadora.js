var operacion = "";
var pantalla;
var openParens = 0; // Conteo de paréntesis abiertos

window.onload = function () {
    pantalla = document.getElementById("txt_resultado");

    const sepiaToggle = document.getElementById('switch-checkbox');

    if (sepiaToggle) {
        sepiaToggle.addEventListener('change', function() {
            document.body.style.filter = sepiaToggle.checked ? 'sepia(100%)' : 'none';
        });
    } else {
        console.log("Error: no se encontró el checkbox con id 'switch-checkbox'.");
    }
}

function limpiar() {
    operacion = "";
    openParens = 0;
    pantalla.value = operacion;
}

function borrar() {
    if (operacion.length > 0) {
        // Actualizar el conteo de paréntesis al borrar
        if (operacion.endsWith("(")) openParens--;
        if (operacion.endsWith(")")) openParens++;
        
        operacion = operacion.slice(0, -1);
    }
    pantalla.value = operacion;
}

function clickbutton(element) {
    switch (element.id) {
        case 'b00': case 'b01': case 'b02': case 'b03': case 'b04':
        case 'b05': case 'b06': case 'b07': case 'b08': case 'b09':
            operacion += element.value;
            break;
        case 'b_sum':
            if (operacion.length > 0 && validarOperaciones()) {
                operacion += "+";
            }
            break;
        case 'b_res':
            if (validarOperaciones()) {
                operacion += "-";
            }
            break;
        case 'b_mul':
            if (operacion.length > 0 && validarOperaciones()) {
                operacion += "*";
            }
            break;
        case 'b_div':
            if (operacion.length > 0 && validarOperaciones()) {
                operacion += "/";
            }
            break;
        case 'b_pun':
            if (validarPunto()) {
                operacion += ".";
            }
            break;
        case 'b_left_parent':
            if (validarParentesisAbrir()) {
                operacion += "(";
                openParens++;
            }
            break;
        case 'b_right_parent':
            if (validarParentesisCerrar()) {
                operacion += ")";
                openParens--;
            }
            break;
        case 'b_ig':
            if (operacion.length > 0 && openParens === 0) { // Asegurarse de que los paréntesis estén equilibrados
                try {
                    operacion = "" + eval(operacion);
                } catch (e) {
                    console.log(e);
                    operacion = "";
                    alert("La operación no es válida");
                }
            } else if (openParens !== 0) {
                alert("Paréntesis no equilibrados");
            }
            break;
    }
    pantalla.value = operacion;
}

function validarOperaciones() {
    // Evita duplicación de operadores consecutivos
    return !operacion.endsWith("+") &&
           !operacion.endsWith("-") &&
           !operacion.endsWith("*") &&
           !operacion.endsWith("/") &&
           !operacion.endsWith("(");
}

function validarPunto() {
    // Evita múltiples puntos en un mismo número
    let partes = operacion.split(/[\+\-\*\/\(\)]/);
    let ultimoNumero = partes[partes.length - 1];
    return !ultimoNumero.includes(".");
}

function validarParentesisAbrir() {
    // Permite abrir paréntesis solo después de un operador o al inicio
    return operacion.length === 0 ||
           operacion.endsWith("+") ||
           operacion.endsWith("-") ||
           operacion.endsWith("*") ||
           operacion.endsWith("/") ||
           operacion.endsWith("(");
}

function validarParentesisCerrar() {
    // Permite cerrar paréntesis solo si hay paréntesis abiertos y no después de un operador
    return openParens > 0 && 
           operacion.length > 0 &&
           !operacion.endsWith("+") &&
           !operacion.endsWith("-") &&
           !operacion.endsWith("*") &&
           !operacion.endsWith("/") &&
           !operacion.endsWith("(");
}
