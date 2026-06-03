const numero = (document.getElementById("numeroEscolhido").value);
const numeroParImpar = document.getElementById("nParOuImpar");

function revelaNumero(){
    if(numero % 2 == 0)
        numeroParImpar.innerHTML = " Par";
    else
        numeroParImpar.innerHTML = "Impar"
}