import { EmpleadoAsalariado } from "./models/EmpleadoAsalariado.js";

const app = document.getElementById("app");

const btnInicio = document.getElementById("btnInicio");
const btnAsalariado = document.getElementById("btnAsalariado");
const btnHoras = document.getElementById("btnHoras");
const btnComision = document.getElementById("btnComision");
const btnTemporal = document.getElementById("btnTemporal");

// Formato de moneda colombiana
function formatoDinero(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });
}

// Página de inicio
function mostrarInicio() {
    app.innerHTML = `
        <section class="seccion">

            <h2>Bienvenido al Sistema de Nómina</h2>

            <p>
                Seleccione un tipo de empleado en el menú
                para realizar el cálculo correspondiente.
            </p>

            <div class="informacion">

                <div class="tarjeta">
                    <h3>1. Asalariado</h3>
                    <p>
                        Salario fijo mensual y bono según
                        la antigüedad del empleado.
                    </p>
                </div>

                <div class="tarjeta">
                    <h3>2. Por Horas</h3>
                    <p>
                        Cálculo según horas normales
                        y horas extras trabajadas.
                    </p>
                </div>

                <div class="tarjeta">
                    <h3>3. Por Comisión</h3>
                    <p>
                        Salario base, comisión sobre ventas
                        y posible bono adicional.
                    </p>
                </div>

                <div class="tarjeta">
                    <h3>4. Temporal</h3>
                    <p>
                        Salario fijo durante el período
                        establecido en el contrato.
                    </p>
                </div>

            </div>

        </section>
    `;
}

// Formulario del empleado asalariado
function mostrarFormularioAsalariado() {
    app.innerHTML = `
        <section class="seccion">

            <h2>Empleado Asalariado</h2>

            <p>
                Ingrese los datos del empleado.
            </p>

            <form id="formAsalariado" class="formulario">

                <div class="campo">
                    <label for="nombre">
                        Nombre del empleado:
                    </label>

                    <input
                        type="text"
                        id="nombre"
                        placeholder="Ejemplo: Carlos Pérez"
                        required
                    >
                </div>

                <div class="campo">
                    <label for="salario">
                        Salario mensual:
                    </label>

                    <input
                        type="number"
                        id="salario"
                        placeholder="Ejemplo: 3000000"
                        min="0"
                        step="1000"
                        required
                    >
                </div>

                <div class="campo">
                    <label for="antiguedad">
                        Antigüedad en años:
                    </label>

                    <input
                        type="number"
                        id="antiguedad"
                        placeholder="Ejemplo: 6"
                        min="0"
                        step="1"
                        required
                    >
                </div>

                <button type="submit" class="btn-calcular">
                    Calcular nómina
                </button>

            </form>

            <div id="resultado"></div>

        </section>
    `;

    const formulario = document.getElementById("formAsalariado");

    formulario.addEventListener("submit", manejarFormularioAsalariado);
}

// Procesa los datos del formulario
function manejarFormularioAsalariado(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const salario = Number(document.getElementById("salario").value);
    const antiguedad = Number(document.getElementById("antiguedad").value);

    if (nombre === "") {
        mostrarError("Debe ingresar el nombre del empleado.");
        return;
    }

    if (salario < 0) {
        mostrarError("El salario no puede ser negativo.");
        return;
    }

    if (antiguedad < 0) {
        mostrarError("La antigüedad no puede ser negativa.");
        return;
    }

    const empleado = new EmpleadoAsalariado(
        1,
        nombre,
        salario,
        antiguedad
    );

    const salarioBruto = empleado.calcularSalarioBruto();
    const beneficios = empleado.obtenerBeneficios();

    mostrarResultado(empleado, salarioBruto, beneficios);
}

// Muestra el resultado
function mostrarResultado(empleado, salarioBruto, beneficios) {
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `
        <div class="resultado">

            <h3>Resultado de la nómina</h3>

            <p>
                <strong>Empleado:</strong>
                ${empleado.nombre}
            </p>

            <p>
                <strong>Salario base:</strong>
                ${formatoDinero(empleado.salarioBase)}
            </p>

            <p>
                <strong>Antigüedad:</strong>
                ${empleado.antiguedad} año(s)
            </p>

            <p>
                <strong>Bono por antigüedad:</strong>
                ${formatoDinero(beneficios.bonoAntiguedad)}
            </p>

            <p>
                <strong>Bono de alimentación:</strong>
                ${formatoDinero(beneficios.bonoAlimentacion)}
            </p>

            <hr>

            <p class="total">
                <strong>Salario bruto:</strong>
                ${formatoDinero(salarioBruto)}
            </p>

        </div>
    `;
}

// Muestra errores
function mostrarError(mensaje) {
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `
        <div class="error">
            ${mensaje}
        </div>
    `;
}

// Eventos del menú
btnInicio.addEventListener("click", mostrarInicio);

btnAsalariado.addEventListener(
    "click",
    mostrarFormularioAsalariado
);

btnHoras.addEventListener("click", () => {
    alert("El punto 2 todavía está en desarrollo.");
});

btnComision.addEventListener("click", () => {
    alert("El punto 3 todavía está en desarrollo.");
});

btnTemporal.addEventListener("click", () => {
    alert("El punto 4 todavía está en desarrollo.");
});