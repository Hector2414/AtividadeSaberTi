// function contagemEntreNumeros(){

//     let primeiroNumero = document.getElementById("prValor").value
//     let segundoNumero = document.getElementById("secValor").value
//     let result = document.getElementById("resultado")

//     result.innerHTML = ""
//     if(primeiroNumero < segundoNumero)
//         result.innerHTML = "O primeiro resultado deve ser SEMPRE maior"
   
//     for(let i = primeiroNumero; i >= segundoNumero; i--){
//         result.innerHTML += ` ${i}  <br>` 
   
// }
// }

function contagemEntreNumeros() {

    let primeiroNumero = Number(document.getElementById("prValor").value)
    let segundoNumero = Number(document.getElementById("secValor").value)

    let result = document.getElementById("resultado")

    result.innerHTML = ""

    if(segundoNumero > primeiroNumero){
        result.innerHTML = "O segundo número deve ser menor."
        return
    }

    for(let i = primeiroNumero; i >= segundoNumero; i--){
        result.innerHTML += `${i} <br>`
    }
}