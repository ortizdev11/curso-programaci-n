const titu = document.getElementById("titulo");
const boto = document.getElementById("boton");
const colofondo = document.getElementById("fondocol");
const parra = document.getElementById("parrafo");
const fondo = document.getElementById("fondo");
const H1color = document.getElementById("botocolor");
const contaBoton = document.getElementById("contador");
const establecer = document.getElementById("restablecer");
let contador = 0;
let modoNegro = false;

// se crea el botón cambia h1
boto.addEventListener("click",() =>{
    if(titu.textContent === "¡Ya estoy aprendiendo DOM!"){
        titu.textContent = "HOLA ORTIZ";
    }else{
        titu.textContent = "¡Ya estoy aprendiendo DOM!";
    };
});

// cambia el fondo a negro y el color de  h1 y a parrafo a blanco 
fondo.addEventListener("click", () =>{
    if(modoNegro === false){
        colofondo.style.background = "black";
        titu.style.color = "white";
        parra.style.color = "white";
    }else{
       colofondo.style.background = "white";
       titu.style.color = "black";
       parra.style.color = "black";
    }
})

// cambia el color de h1 dependiendo del color que tenga opcion: rojo y azul
H1color.addEventListener("click", () =>{
    if(titu.style.color === "red"){
        titu.style.color = "blue";
    }else{
        titu.style.color = "red";
    }
});

//se crea un boton que cuenta cuantas veces lo tocan
//se cambia el h1 cuando sean 10 click 
contaBoton.addEventListener("click",() =>{
    contador += 1;
    parra.textContent = "has hecho clic " + contador + " veces.";
    if(contador === 10){
        titu.textContent = "¡Llegaste a 10 clics! 🎉"
    }
});

//boton para  establecer conta 0
establecer.addEventListener("click",() =>{
    contador = 0;
    parra.textContent = "Has hecho clic 0 veces."
    titu.textContent = "HOLA ORTIZ"
});