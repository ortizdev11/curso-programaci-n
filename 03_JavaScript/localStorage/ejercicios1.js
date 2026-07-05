let usuario = "ortiz";
localStorage.setItem("nombre",usuario);

let personaje = localStorage.getItem("nombre");

console.log(personaje);

let edad = 19;

localStorage.setItem("edad",edad);