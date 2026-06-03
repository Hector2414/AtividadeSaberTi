let idade = 19;

function olaMundo(){
    
    console.log(`\nOla mundo eu tenho ${idade} anos\n`);

    for(var i  = 0; i < 10+1; i++)
        // console.log(`${i}`)
        if(i % 2 == 0){
            console.log(`Esse número ${i} é par!\n`)
        } else {
            console.log(`Esse número ${i} é impar!\n`)
        }


        console.log("\n\n\n")
        const corPrim = "Vermelho"
        let corSec;

        let x = 0;
        let y =5;

        if(x > 0)
            y = y + 1;
            corSec = "Azul";
        console.log(corSec)
}

olaMundo()



