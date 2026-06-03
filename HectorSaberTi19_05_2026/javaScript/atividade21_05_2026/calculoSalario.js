// //Pega valores de salario
const slr1 = parseFloat(document.getElementById("salario1").value);
// const slr2 = parseFloat(document.getElementById("salario2").value);
// const slr3 = parseFloat(document.getElementById("salario3").value);
// const slr4 = parseFloat(document.getElementById("salario4").value);
// const slr5 = parseFloat(document.getElementById("salario5").value);
// const slr6 = parseFloat(document.getElementById("salario6").value);
// const slr7 = parseFloat(document.getElementById("salario7").value);
// const slr8 = parseFloat(document.getElementById("salario8").value);
// const slr9 = parseFloat(document.getElementById("salario9").value);
// const slr10 = parseFloat(document.getElementById("salario10").value);
// const slr11 = parseFloat(document.getElementById("salario11").value);
// const slr12 = parseFloat(document.getElementById("salario12").value);

// //Pega os descontos
const desconto1 = parseFloat(document.getElementById("desc1").value);
// const desconto2 = parseFloat(document.getElementById("desc1").value);
// const desconto3 = parseFloat(document.getElementById("desc1").value);
// const desconto4 = parseFloat(document.getElementById("desc1").value);
// const desconto5 = parseFloat(document.getElementById("desc1").value);
// const desconto6 = parseFloat(document.getElementById("desc1").value);
// const desconto7 = parseFloat(document.getElementById("desc1").value);
// const desconto8 = parseFloat(document.getElementById("desc1").value);
// const desconto9 = parseFloat(document.getElementById("desc1").value);
// const desconto10 = parseFloat(document.getElementById("desc1").value);
// const desconto11 = parseFloat(document.getElementById("desc1").value);
// const desconto12 = parseFloat(document.getElementById("desc1").value);

const salLiquidoJan = document.getElementById("slrLiqJan");

slr1 = slr1 - (slr1 * desconto1 /100);

function calculoSalario(){

    salLiquidoJan.innerHTML = `Seu salário é ${slr1}`;
    
}

