const primeiraNota = parseFloat(document.getElementById("nota1").value);
const segundaNota = parseFloat(document.getElementById("nota2").value);
const terceiraNota = parseFloat(document.getElementById("nota3").value);
const quartaNota = parseFloat(document.getElementById("nota4").value);

const situacaoAluno = document.getElementById("situacao");
const mediaDasNotas = document.getElementById("avgNotas");

let media = (primeiraNota + segundaNota + terceiraNota + quartaNota) / 4;

function mediaNotas(){

    mediaDasNotas.innerHTML = `Sua média é ${media}`;

    if(media >= 7){
        situacaoAluno.innerHTML = "Sua situação é de aprovado";
    }else{
        situacaoAluno.innerHTML = "Sua situação é de reprovado";
    }
    
}