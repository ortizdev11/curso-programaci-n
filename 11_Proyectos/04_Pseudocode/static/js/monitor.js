import { pseudocodigo, 
        guardarEnLocal,
        recuperarLocal,
        cargarDatos
       } from "./datos.js"

//variables:
cargarDatos();

const textarea = document.getElementById("Pseudocode");
const volver = document.getElementById("logodeapp");
let url = new URLSearchParams(window.location.search);
let id = url.get("id");
let guardado = false;
let temporizador;

//funciones:
function  ModificadorCodigo(){
    
    pseudocodigo.forEach((codigo)=>{
    
        if (codigo.id === Number(id)){
            codigo.texto = textarea.value
    
        }
    });
    
    guardado = false;
};

function recargarPagina(){
    
    pseudocodigo.forEach((codigo, index)=>{
    
        if(codigo.id === Number(id)){    
    
            textarea.value = codigo.texto;
    
        };
    
    });
};

function avisadorGuaradado(){
    const text = document.querySelector(".Textguardar");

    if(guardado){

        text.textContent = "Guardado...";
        text.classList.add("textoguardado");

    }else{
        text.textContent = "No guardado";
        text.classList.toggle("textoguardado");
        
    }
};

//evento:
recargarPagina();

textarea.addEventListener("input", ()=>{

    ModificadorCodigo();
    clearTimeout(temporizador);

    temporizador = setTimeout(()=>{
        guardarEnLocal();
        guardado = true;
        avisadorGuaradado();
    },1000);

    avisadorGuaradado();

});

volver.addEventListener("click",()=>{
    
    window.location.href = "/index";

});