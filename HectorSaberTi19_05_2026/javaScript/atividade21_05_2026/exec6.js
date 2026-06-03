const valorInserido = parseFloat(document.getElementById("valor").value);
const valorDesconto = document.getElementById("valorDescontado"); 



function calcularValor(){

    if(valorInserido >= 100){
        valorInserido = valorInserido * 0.10;
        valorDesconto.innerHTML  = `Seu valor é ${valorInserido}`;
    }else{
        valorDesconto.innerHTML = "Seu valor não tem desconto";
    }
    

}