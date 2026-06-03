const idade = (document.getElementById("idadeCliente").value)
const resposta = document.getElementById("tipoEtario")

/*
0-12 criança
13-17 adolescente
adulto 18 - 59
idoso 60+
*/

function classificaCliente() {
    
    if (idade >= 0 && idade <= 12 ) {
        resposta.innerHTML = "Criança";
    } else if (idade >= 13 && idade <= 17) {
        resposta.innerHTML = "Adolescente";
    } else if (idade >= 18 && idade <= 59){
        resposta.innerHTML = "Adulto";
    } else if(idade > 60){
        resposta.innerHTML = "Idoso";
    }
}