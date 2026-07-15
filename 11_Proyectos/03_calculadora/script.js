//-----------------------Variable------------------------------

const operador = document.querySelectorAll(".botonesOpera");
const numero = document.querySelectorAll(".botonNume");
const elimTodo = document.getElementById("eliminarTodo");
const elimUno = document.getElementById("eliminarUno");
const igual = document.getElementById("operaciones");
const output = document.getElementById("inputText");
let sumatorio = "";

//---------------------Funciones------------------------------



function actualizarCampo(){
    const campoAnterior = document.getElementById("anterior");

    output.value = eval(sumatorio);
    if(output.value === "Infinity"){
        output.value = "No se puede dividir entre 0"
    }else if(output.value === "undefined"){
        output.value = campoAnterior.textContent;
    }else{
        campoAnterior.textContent = sumatorio;
        sumatorio = "";
    };
};

function agregadorNum(num){
    sumatorio += num.textContent;
    output.value = sumatorio;
};

function agregarOperador(signo){
    let ultimo = sumatorio.slice(-1);
    if(ultimo !== signo.id){
        sumatorio += signo.id;
        output.value = sumatorio;
    };
};

function EliminarTodo(){
    sumatorio = "";
    output.value = "0";
};

function eliminarUltimoParametro(){
    if(sumatorio !== ""){
       let suma = sumatorio.slice(0, -1);
       sumatorio = suma;
       output.value = suma;
    }else{
        output.value = "0"
    };
};

//-----------------------------Eventos----------------------------------

numero.forEach(function(numers){
    numers.addEventListener("click",()=>{
        agregadorNum(numers);
    });    
});

operador.forEach(function(operacion){
    operacion.addEventListener("click",()=>{
        agregarOperador(operacion);
    });
});

igual.addEventListener("click",()=>{
    actualizarCampo();
});

elimTodo.addEventListener("click",()=>{
    EliminarTodo();
});

elimUno.addEventListener("click",()=>{
    eliminarUltimoParametro();
});