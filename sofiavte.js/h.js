function calcularTDEE(tmb, nivel) {
const factores = {
sedentario: 1.2,
ligero: 1.375,
moderado: 1.55,
activo: 1.725,
muyActivo: 1.9
};
return (tmb * factores[nivel]).toFixed(0);
}

function calcular() {

const nombre = document.getElementById("nombre").value.trim();
const edad = parseInt(document.getElementById("edad").value);
const peso = parseFloat(document.getElementById("peso").value);
const alturaCm = parseFloat(document.getElementById("altura").value);
const sexo = document.getElementById("sexo").value;
const actividad = document.getElementById("actividad").value;

if (!nombre || !edad || !peso || !alturaCm) {
document.getElementById("resultado").innerHTML = "⚠️ Por favor, completa todos los campos.";
return;
}

const altura = alturaCm / 100;

const imc = (peso / (altura * altura)).toFixed(2);

let clasificacion = "";
if (imc < 18.5) clasificacion = "Bajo peso";
else if (imc < 24.9) clasificacion = "Normal";
else if (imc < 29.9) clasificacion = "Sobrepeso";
else clasificacion = "Obesidad";

const edadMetabolica = edad + (imc > 25 ? 5 : -2);

let tmb = 0;
if (sexo === "M") {
tmb = (10 * peso) + (6.25 * alturaCm) - (5 * edad) + 5;
} else {
tmb = (10 * peso) + (6.25 * alturaCm) - (5 * edad) - 161;
}

const tdee = calcularTDEE(tmb, actividad);

const sexoNum = sexo === "M" ? 1 : 0;
const grasa = ((1.2 * imc) + (0.23 * edad) - (10.8 * sexoNum) - 5.4).toFixed(1);

const pesoIdealMin = (18.5 * altura * altura).toFixed(1);
const pesoIdealMax = (24.9 * altura * altura).toFixed(1);

const frases = [
"¡Hoy es un buen día para moverte 30 minutos!",
"Recuerda hidratarte, tu cuerpo lo agradecerá.",
"Pequeños cambios diarios generan grandes resultados.",
"Respira profundo, tu bienestar comienza aquí."
];

const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

document.getElementById("resultado").innerHTML =
`
<h3>Resultados para ${nombre}</h3>
<p><strong>Edad:</strong> ${edad} años</p>
<p><strong>IMC:</strong> ${imc} (${clasificacion})</p>
<p><strong>Edad metabólica:</strong> ${edadMetabolica} años</p>
<p><strong>TMB:</strong> ${tmb.toFixed(0)} kcal/día</p>
<p><strong>Calorías recomendadas:</strong> ${tdee} kcal/día</p>
<p><strong>% Grasa estimado:</strong> ${grasa}%</p>
<p><strong>Peso ideal:</strong> entre ${pesoIdealMin} kg y ${pesoIdealMax} kg</p>
`;

document.getElementById("motivacion").innerHTML = fraseAleatoria;
}

function limpiar() {

const container = document.querySelector(".container");
container.classList.add("fade-out");

setTimeout(() => {
document.getElementById("nombre").value = "";
document.getElementById("edad").value = "";
document.getElementById("peso").value = "";
document.getElementById("altura").value = "";
document.getElementById("sexo").value = "M";
document.getElementById("actividad").value = "sedentario";
document.getElementById("resultado").innerHTML = "";
document.getElementById("motivacion").innerHTML = "";
container.classList.remove("fade-out");
}, 600);
}
