// const tabuadaNumero = document.getElementById("numeroTabuada").value;
// const result = document.getElementById("resultado");

// function realizaTabuada(){
//     for(i = 0 ; i <= 10; i++){
//         console.log(`${tabuadaNumero} X ${i} = ${tabuadaNumero * i}`);
//         result.innerText = `${tabuadaNumero} X ${i} = ${tabuadaNumero * i}`
//     }
// }

 function realizaTabuada(){

        let numero = document.getElementById("numeroTabuada").value;

        let resultado = document.getElementById("resultado");

        resultado.innerHTML = "";

        for(let i = 1; i <= 10; i++){

            resultado.innerHTML += `
                ${numero} × ${i} = ${numero * i} <br>
            `;
        }
    }