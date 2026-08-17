import  { pseudocodigo, recuperarLocal, cargarDatos, eliminarTodo, guardarEnLocal } from "./datos.js"

//variables:
cargarDatos();

const MenuAyuda = document.getElementById("menuDeAyuda");
const  containerPseudoce = document.getElementById("containerPseudoce");
const botonagregar = document.getElementById("agregar");
let menuActivo = false;
let containerDeOpciones = null;
let ID = 0;

//funciones:

function cambiarEstadoCodigo (codigo, completa){
    
    codigo.completado = !codigo.completado;
    completa.classList.toggle("codigoCompletado", codigo.completado);
    guardarEnLocal();
    
};

function ActualizarIDS(){
    pseudocodigo.forEach((codigo, index)=>{
        codigo.id = index + 1;
    });
};


function eliminadorCaja(index){
    pseudocodigo.splice(index,1);
    ActualizarIDS();
    guardarEnLocal();
    recargarPagina();
};

function crearContainer(){

    pseudocodigo.forEach((codigo, index)=>{
        const container = document.createElement("section");
        const parrafo = document.createElement("pre");
        const containerBoto = document.createElement("section");
        const completa = document.createElement("div");
        const botonEliminar = document.createElement("div");
        
        container.classList.add("containerDeCodigo");
        completa.classList.add("codigoFalse");
        containerBoto.classList.add("containerBoto");
        botonEliminar.classList.add("botonEliminar");

        if(codigo.completado){
            completa.classList.add("codigoCompletado");
        }

        parrafo.textContent = codigo.texto;
        botonEliminar.textContent = "🗑️"

        containerBoto.appendChild(completa);
        containerBoto.appendChild(botonEliminar);

        container.appendChild(parrafo);
        container.appendChild(containerBoto);
        containerPseudoce.appendChild(container);

        container.addEventListener("click",()=>{

            ID = codigo.id;
            window.location.href = "/mostrador?id="+ ID;

        });

        completa.addEventListener("click", (evento)=>{

            evento.stopPropagation();
            cambiarEstadoCodigo(codigo, completa);

        });

        botonEliminar.addEventListener("click", (evento)=>{

            evento.stopPropagation();
            eliminadorCaja(index);

        });
    });

};

function crearMEnu(){  

    if(!menuActivo){
        const header = document.getElementById("containerAyuda");

        containerDeOpciones = document.createElement("div");
        const botonAyuda = document.createElement("button");
        const BotonEliminaTodo = document.createElement("button");
        menuActivo = true;

        botonAyuda.textContent = "ayuda";
        BotonEliminaTodo.textContent = "eliminar todo";

        containerDeOpciones.classList.add("containerOpiciones");

        setTimeout(()=>{
            containerDeOpciones.classList.add("visible");
        }, 50);

        botonAyuda.classList.add("botonAyuda");
        BotonEliminaTodo.classList.add("eliminarTodo");

        containerDeOpciones.appendChild(botonAyuda);
        containerDeOpciones.appendChild(BotonEliminaTodo);
        header.appendChild(containerDeOpciones);

        botonAyuda.addEventListener("click",()=>{
           
            window.open("/ayuda", "_blank");
        
        });

        BotonEliminaTodo.addEventListener("click",()=>{
           
            eliminarTodo();
            recargarPagina();
           
        });

    }else{
        menuActivo = false;
        containerDeOpciones.remove();
        containerDeOpciones = null;
    };

};


//funciones importadas de datas.js
function recargarPagina(){

    containerPseudoce.innerHTML = "";
    crearContainer();

};

recargarPagina()

//evento:
MenuAyuda.addEventListener("click",()=>{

    crearMEnu();

});

botonagregar.addEventListener("click", ()=>{

    ID = pseudocodigo.length + 1;
    pseudocodigo.push({
        id: ID,
       texto: "",
       completado: false,
    });


    guardarEnLocal();

    window.location.href = "/mostrador?id="+ ID;

});
