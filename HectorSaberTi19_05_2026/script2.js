"use strict"

const botao = document.getElementById("botaoDascor")
const p = document.getElementById("paragrafo")
const h1 = document.getElementById("textoPrinc")
const body = document.getElementById("corpin")

function addCss(){
    
    //muda o body
    body.style.backgroundColor = "bisque";
    body.style.textAlign = "center";
    body.style.fontSize = "40px";

    //muda as letras
    p.style.color = "sienna";
    p.innerHTML = "Agora um site com estilo";
    h1.style.color = "sienna";

    //muda o botão 
    botao.style.color = "white";
    botao.style.backgroundColor = "lightblue";
    botao.style.borderRadius = "10px";
    botao.style.width = "100px";
    botao.style.height = "55px";
    botao.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"

    console.log("oi tiozinho");
}