function mostrandoNumeros() {
    let showNum = document.getElementById("mostrarNumeros")

  
    for(let i = 0; i < 6; i++){
        if (i % 2 == 0)
            showNum.innerHTML += `${i} <br>`

    }
}