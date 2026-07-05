let Videojuegos = [
    {nombre:"fifa", genero:"deportes", horas: 300},
    {nombre:"call of duty", genero:"accion", horas: 500},
    {nombre:"minecraft", genero:"aventura", horas: 200},
    {nombre:"tetris", genero:"puzzle", horas: 100}
];

localStorage.setItem("videojuegos", JSON.stringify(Videojuegos));

let recupera = JSON.parse(localStorage.getItem("videojuegos"));

recupera.forEach(function(juego,indice){
    console.log("nombre: "+ juego[indice].nombre);
    console.log("genero: "+ juego[indice].genero);
    console.log("horas: "+ juego[indice].horas);
})