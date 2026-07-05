let colores = [
    "Rojo",
    "Azul",
    "Verde"
];

localStorage.setItem("colores", JSON.stringify(colores));
let recuperar = JSON.parse(localStorage.getItem("colores"));
console.log(recuperar[2]);

let jugador = {
    nombre:"Ortiz",
    nivel:10
};

localStorage.setItem("jugador",JSON.stringify(jugador));
let jugadorRecuperado = JSON.parse(localStorage.getItem("jugador"));
console.log(jugadorRecuperado.nivel);