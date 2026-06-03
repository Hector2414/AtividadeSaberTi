// "use strict"

function calcularArea(){

    event.preventDefault();

    let raio = parseFloat(document.getElementById("raio").value);
    let area = Math.PI * Math.pow(raio, 2);
    
    document.getElementById("area").value = area.toFixed(2);
}