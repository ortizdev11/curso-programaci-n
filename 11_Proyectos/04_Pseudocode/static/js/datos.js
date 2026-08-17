export let pseudocodigo = [];

export function guardarEnLocal(){
    localStorage.setItem("pseudocodigo", JSON.stringify(pseudocodigo));
};

export function recuperarLocal(){
    let recuperar = JSON.parse(localStorage.getItem("pseudocodigo"));
    return recuperar || [];  
};

export function eliminarTodo(){
    localStorage.clear();
    pseudocodigo = [];
};

export function cargarDatos(){
    pseudocodigo = recuperarLocal();
}