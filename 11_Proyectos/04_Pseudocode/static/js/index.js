//variables:
const canva = document.getElementById("animacionEstrellas");
const ctx = canva.getContext("2d");
let estrellas = [];

canva.width = window.innerWidth;
canva.height = window.innerHeight;

//funciones:

//esta funcion crea la lista de estrellas 

function agregarALaLista(){
    for(let i=0; i<200; i++){

        let x = Math.random() * canva.width;
        let y = Math.random() * canva.height;

        estrellas.push({
            ejex: x,
            ejey: y,
            velocidad: Math.random(),
            posicion: Math.random() < 0.5
        });
    };
};

//funcion importante esta es la dibuja las estrellas del canva
function dibujaEstrella(estrella){
    ctx.beginPath();
    ctx.arc(estrella.ejex, estrella.ejey,1,0,Math.PI *2);
    ctx.fillStyle = "#fff";
    ctx.fill();
};

//aqui se se la lista y se dibuja la estrellas
function creadorEstrella(){
    estrellas.forEach((estrella)=>{
        dibujaEstrella(estrella);
    });
};

//aqui se estable si va a izquierda o la derecha e arriba a abajo
function compararDirreccion(estre){
    if(estre.posicion){
        estre.posicion = false;
    }else{
        estre.posicion = true;
    };
}

//ojo aqui esta la magia esta funcion  es la que mueve la estrellas 

// elimina la estrella
// si no se salio:
// 1.cambia la posicion
// si se salio la ventana reiniciarla/

function AnimacionDeEstrella(){
    ctx.beginPath();
    ctx.clearRect(0,0, canva.width, canva.height);

    estrellas.forEach((estre)=>{
        if(estre.ejex < 0){
            estre.ejex = Math.random() * canva.width;
        }else if(estre.ejex < canva.width){
            if(estre.posicion){
                estre.ejex += estre.velocidad;
            }else{
                estre.ejex -= estre.velocidad;
            }

        }else{
            estre.ejex = Math.random()  * canva.width;
            compararDirreccion(estre);
        };

        if(estre.ejey < 0){

           estre.ejey = Math.random()* canva.height;

        }else if(estre.ejey < canva.height){
             if(estre.posicion){
                estre.ejey += estre.velocidad;
            }else{
                estre.ejey -= estre.velocidad;
            }

        }else{
            estre.ejey = Math.random()* canva.height;
            compararDirreccion(estre);
        };
        dibujaEstrella(estre);
    });
    requestAnimationFrame(AnimacionDeEstrella);
};

function iniciarEstrellas(){
    agregarALaLista();
    creadorEstrella();
};

//eventos:

//aqui se llama las funciones principales
iniciarEstrellas();
AnimacionDeEstrella();

//aqui esta el evento que hace que la animacion adaptable a celular, table y compu

window.addEventListener("resize",()=>{
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;
    
    estrellas.length = 0;
    iniciarEstrellas();
});