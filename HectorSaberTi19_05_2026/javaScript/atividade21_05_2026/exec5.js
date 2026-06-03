const primeiroNumero = (document.getElementById("num1").value);
const segundoNumero = (document.getElementById("num2").value);

const numeroMaior = document.getElementById("nMaiorMenor");

function revelaMaiorNumero(){
    if(primeiroNumero > segundoNumero)
        numeroMaior.innerHTML = `Primeiro ${primeiroNumero}`;
    else
        numeroMaior.innerHTML = `Segundo ${segundoNumero}`;
}