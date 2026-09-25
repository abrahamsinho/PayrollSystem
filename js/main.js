import { EmpleadoAsalariado } from "./models/EmpleadoAsalariado.js";
import { EmpleadoPorHoras } from "./models/EmpleadoPorHoras.js";
import { EmpleadoPorComision } from "./models/EmpleadoPorComision.js";

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

// Función para cambiar el estado activo visual en el menú
function activarBoton(botonSeleccionado) {
    document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("activo"));
    if (botonSeleccionado) {
        botonSeleccionado.classList.add("activo");
    }
}

// Página de inicio
function mostrarInicio() {
    app.innerHTML = `
        <section class="seccion">
            <h2>Bienvenido al Sistema de Nómina</h2>
            <p>Seleccione un tipo de empleado en el menú para realizar el cálculo correspondiente.</p>

            <div class="informacion">
                <div class="tarjeta">
                    <h3>1. Asalariado</h3>
                    <p>Salario fijo mensual y bono según la antigüedad del empleado.</p>
                </div>

                <div class="tarjeta">
                    <h3>2. Por Horas</h3>
                    <p>Cálculo según horas normales y horas extras trabajadas.</p>
                </div>

                <div class="tarjeta">
                    <h3>3. Por Comisión</h3>
                    <p>Salario base, comisión sobre ventas y posible bono adicional.</p>
                </div>

                <div class="tarjeta">
                    <h3>4. Temporal</h3>
                    <p>Salario fijo durante el período establecido en el contrato.</p>
                </div>
            </div>
        </section>
    `;
}

// =========================================================
// 1. EMPLEADO ASALARIADO
// =========================================================
function mostrarFormularioAsalariado() {
    app.innerHTML = `
        <section class="seccion">
            <h2>Empleado Asalariado</h2>
            <p>Ingrese los datos del empleado.</p>

            <form id="formAsalariado" class="formulario">
                <div class="campo">
                    <label for="nombre">Nombre del empleado:</label>
                    <input type="text" id="nombre" placeholder="Ejemplo: Carlos Pérez" required>
                </div>

                <div class="campo">
                    <label for="salario">Salario mensual:</label>
                    <input type="number" id="salario" placeholder="Ejemplo: 3000000" min="0" step="1000" required>
                </div>

                <div class="campo">
                    <label for="antiguedad">Antigüedad en años:</label>
                    <input type="number" id="antiguedad" placeholder="Ejemplo: 6" min="0" step="1" required>
                </div>

                <button type="submit" class="btn-calcular">Calcular nómina</button>
            </form>

            <div id="resultado"></div>
        </section>
    `;

    document.getElementById("formAsalariado").addEventListener("submit", manejarFormularioAsalariado);
}

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

    const empleado = new EmpleadoAsalariado(1, nombre, salario, antiguedad);
    mostrarResultadoAsalariado(empleado);
}

function mostrarResultadoAsalariado(empleado) {
    const resultado = document.getElementById("resultado");
    const salarioBruto = empleado.calcularSalarioBruto();
    const beneficios = empleado.obtenerBeneficios();
    const deducciones = empleado.calcularDeducciones();
    const salarioNeto = empleado.calcularSalarioNeto();

    resultado.innerHTML = `
        <div class="resultado">
            <h3>Resultado de la nómina</h3>
            <p><strong>Empleado:</strong> ${empleado.nombre}</p>
            <p><strong>Salario base:</strong> ${formatoDinero(empleado.salarioBase)}</p>
            <p><strong>Antigüedad:</strong> ${empleado.antiguedad} año(s)</p>
            <p><strong>Bono por antigüedad:</strong> ${formatoDinero(beneficios.bonoAntiguedad || 0)}</p>
            <p><strong>Bono de alimentación:</strong> ${formatoDinero(beneficios.bonoAlimentacion || 0)}</p>
            <hr>
            <p><strong>Salario bruto:</strong> ${formatoDinero(salarioBruto)}</p>
            <p><strong>Deducción Salud (4%):</strong> -${formatoDinero(deducciones.salud)}</p>
            <p><strong>Deducción Pensión (4%):</strong> -${formatoDinero(deducciones.pension)}</p>
            <p><strong>Total Deducciones:</strong> -${formatoDinero(deducciones.totalDeducciones)}</p>
            <hr>
            <p class="total"><strong>Salario neto a pagar:</strong> ${formatoDinero(salarioNeto)}</p>

            <button id="btnReiniciarAsalariado" class="btn-reiniciar" type="button">Realizar otro cálculo</button>
        </div>
    `;

    document.getElementById("btnReiniciarAsalariado").addEventListener("click", mostrarFormularioAsalariado);
}

// =========================================================
// 2. EMPLEADO POR HORAS
// =========================================================
function mostrarFormularioPorHoras() {
    app.innerHTML = `
        <section class="seccion">
            <h2>Empleado por Horas</h2>
            <p>Las horas que superen 40 se pagan con un recargo del 50 %.</p>

            <form id="formPorHoras" class="formulario">
                <div class="campo">
                    <label for="nombre">Nombre del empleado:</label>
                    <input type="text" id="nombre" placeholder="Ejemplo: Ana Gómez" required>
                </div>

                <div class="campo">
                    <label for="tarifaHora">Tarifa por hora:</label>
                    <input type="number" id="tarifaHora" placeholder="Ejemplo: 25000" min="0" step="1" required>
                </div>

                <div class="campo">
                    <label for="horasTrabajadas">Horas trabajadas:</label>
                    <input type="number" id="horasTrabajadas" placeholder="Ejemplo: 45" min="0" step="0.5" required>
                </div>

                <button type="submit" class="btn-calcular">Calcular nómina</button>
            </form>

            <div id="resultado"></div>
        </section>
    `;

    document.getElementById("formPorHoras").addEventListener("submit", manejarFormularioPorHoras);
}

function manejarFormularioPorHoras(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const tarifaHora = Number(document.getElementById("tarifaHora").value);
    const horasTrabajadas = Number(document.getElementById("horasTrabajadas").value);

    if (nombre === "") {
        mostrarError("Debe ingresar el nombre del empleado.");
        return;
    }

    if (tarifaHora < 0 || horasTrabajadas < 0) {
        mostrarError("La tarifa y las horas trabajadas no pueden ser negativas.");
        return;
    }

    const empleado = new EmpleadoPorHoras(1, nombre, tarifaHora, horasTrabajadas);
    mostrarResultadoPorHoras(empleado);
}

function mostrarResultadoPorHoras(empleado) {
    const resultado = document.getElementById("resultado");
    const salarioBruto = empleado.calcularSalarioBruto();
    const deducciones = empleado.calcularDeducciones();
    const salarioNeto = empleado.calcularSalarioNeto();

    resultado.innerHTML = `
        <div class="resultado">
            <h3>Resultado de la nómina</h3>
            <p><strong>Empleado:</strong> ${empleado.nombre}</p>
            <p><strong>Tarifa por hora:</strong> ${formatoDinero(empleado.tarifaHora)}</p>
            <p><strong>Horas ordinarias:</strong> ${empleado.calcularHorasOrdinarias()}</p>
            <p><strong>Pago horas ordinarias:</strong> ${formatoDinero(empleado.calcularPagoHorasOrdinarias())}</p>
            <p><strong>Horas extras:</strong> ${empleado.calcularHorasExtras()}</p>
            <p><strong>Pago horas extras (150 %):</strong> ${formatoDinero(empleado.calcularPagoHorasExtras())}</p>
            <p><strong>Bonos:</strong> ${empleado.obtenerBeneficios().descripcion || "No recibe bonos"}</p>
            <hr>
            <p><strong>Salario bruto:</strong> ${formatoDinero(salarioBruto)}</p>
            <p><strong>Deducción Salud (4%):</strong> -${formatoDinero(deducciones.salud)}</p>
            <p><strong>Deducción Pensión (4%):</strong> -${formatoDinero(deducciones.pension)}</p>
            <p><strong>Total Deducciones:</strong> -${formatoDinero(deducciones.totalDeducciones)}</p>
            <hr>
            <p class="total"><strong>Salario neto a pagar:</strong> ${formatoDinero(salarioNeto)}</p>

            <button id="btnReiniciarPorHoras" class="btn-reiniciar" type="button">Realizar otro cálculo</button>
        </div>
    `;

    document.getElementById("btnReiniciarPorHoras").addEventListener("click", mostrarFormularioPorHoras);
}

// =========================================================
// 3. EMPLEADO POR COMISIÓN
// =========================================================
function mostrarFormularioPorComision() {
    app.innerHTML = `
        <section class="seccion">
            <h2>Empleado por Comisión</h2>
            <p>Salario base, comisión sobre ventas y bono adicional del 3 % si las ventas superan $20.000.000.</p>

            <form id="formPorComision" class="formulario">
                <div class="campo">
                    <label for="nombre">Nombre del empleado:</label>
                    <input type="text" id="nombre" placeholder="Ejemplo: Carlos Pérez" required>
                </div>

                <div class="campo">
                    <label for="salarioBase">Salario base:</label>
                    <input type="number" id="salarioBase" placeholder="Ejemplo: 1300000" min="0" step="1000" required>
                </div>

                <div class="campo">
                    <label for="antiguedad">Antigüedad en años:</label>
                    <input type="number" id="antiguedad" placeholder="Ejemplo: 2" min="0" step="1" required>
                </div>

                <div class="campo">
                    <label for="totalVentas">Total ventas del mes:</label>
                    <input type="number" id="totalVentas" placeholder="Ejemplo: 25000000" min="0" step="1000" required>
                </div>

                <div class="campo">
                    <label for="porcentajeComision">Porcentaje de comisión (%):</label>
                    <input type="number" id="porcentajeComision" placeholder="Ejemplo: 5" min="0" max="100" step="0.1" required>
                </div>

                <button type="submit" class="btn-calcular">Calcular nómina</button>
            </form>

            <div id="resultado"></div>
        </section>
    `;

    document.getElementById("formPorComision").addEventListener("submit", manejarFormularioPorComision);
}

function manejarFormularioPorComision(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const salarioBase = Number(document.getElementById("salarioBase").value);
    const antiguedad = Number(document.getElementById("antiguedad").value);
    const totalVentas = Number(document.getElementById("totalVentas").value);
    const porcentajeComision = Number(document.getElementById("porcentajeComision").value);

    if (nombre === "") {
        mostrarError("Debe ingresar el nombre del empleado.");
        return;
    }

    if (salarioBase < 0) {
        mostrarError("El salario base no puede ser negativo.");
        return;
    }

    if (totalVentas < 0) {
        mostrarError("Las ventas no pueden ser menores a $0.");
        return;
    }

    if (porcentajeComision < 0) {
        mostrarError("El porcentaje de comisión no puede ser negativo.");
        return;
    }

    try {
        const empleado = new EmpleadoPorComision(
            1,
            nombre,
            salarioBase,
            antiguedad,
            totalVentas,
            porcentajeComision
        );

        mostrarResultadoPorComision(empleado);
    } catch (error) {
        mostrarError(error.message);
    }
}

function mostrarResultadoPorComision(empleado) {
    const resultado = document.getElementById("resultado");
    const beneficios = empleado.obtenerBeneficios();
    const salarioBruto = empleado.calcularSalarioBruto();
    const deducciones = empleado.calcularDeducciones();
    const salarioNeto = empleado.calcularSalarioNeto();

    resultado.innerHTML = `
        <div class="resultado">
            <h3>Resultado de la nómina</h3>
            <p><strong>Empleado:</strong> ${empleado.nombre}</p>
            <p><strong>Salario base:</strong> ${formatoDinero(empleado.salarioBase)}</p>
            <p><strong>Total ventas:</strong> ${formatoDinero(empleado.totalVentas)}</p>
            <p><strong>Comisión sobre ventas:</strong> ${formatoDinero(beneficios.comision)}</p>
            <p><strong>Bono adicional ventas (> $20M):</strong> ${formatoDinero(beneficios.bonoVentas)}</p>
            <p><strong>Bono de alimentación:</strong> ${formatoDinero(beneficios.bonoAlimentacion)}</p>
            <hr>
            <p><strong>Salario bruto:</strong> ${formatoDinero(salarioBruto)}</p>
            <p><strong>Deducción Salud (4%):</strong> -${formatoDinero(deducciones.salud)}</p>
            <p><strong>Deducción Pensión (4%):</strong> -${formatoDinero(deducciones.pension)}</p>
            <p><strong>Total Deducciones:</strong> -${formatoDinero(deducciones.totalDeducciones)}</p>
            <hr>
            <p class="total"><strong>Salario neto a pagar:</strong> ${formatoDinero(salarioNeto)}</p>

            <button id="btnReiniciarPorComision" class="btn-reiniciar" type="button">Realizar otro cálculo</button>
        </div>
    `;

    document.getElementById("btnReiniciarPorComision").addEventListener("click", mostrarFormularioPorComision);
}

// Muestra mensajes de error
function mostrarError(mensaje) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <div class="error">
            ${mensaje}
        </div>
    `;
}

// =========================================================
// EVENTOS DEL MENÚ PRINCIPAL
// =========================================================
btnInicio.addEventListener("click", () => {
    activarBoton(btnInicio);
    mostrarInicio();
});

btnAsalariado.addEventListener("click", () => {
    activarBoton(btnAsalariado);
    mostrarFormularioAsalariado();
});

btnHoras.addEventListener("click", () => {
    activarBoton(btnHoras);
    mostrarFormularioPorHoras();
});

btnComision.addEventListener("click", () => {
    activarBoton(btnComision);
    mostrarFormularioPorComision();
});

btnTemporal.addEventListener("click", () => {
    activarBoton(btnTemporal);
    alert("El punto 4 todavía está en desarrollo.");
});