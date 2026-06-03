const notaDoAluno = parseFloat(document.getElementById("notaAluno").value);
const situacaoAluno = document.getElementById("situacao");

function mostrarSituacao(){

    event.preventDefault();

    if(notaDoAluno >= 7.0)
        situacaoAluno.innerHTML = "Aprovado!";
    else
        situacaoAluno.innerHTML = "Reprovado!"
}