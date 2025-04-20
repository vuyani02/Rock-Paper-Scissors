let score = JSON.parse(localStorage.getItem("score"))

if(!score){
    score = {
        win: 0,
        lose: 0,
        tie: 0
    }
}

let result = ""

getscore()

document.querySelector('.rock').addEventListener('click', () => {
    play('rock')
})

document.querySelector('.paper').addEventListener('click', () => {
    play('paper')
})

document.querySelector('.scissors').addEventListener('click', () => {
    play('scissors')
})

document.querySelector('.reset').addEventListener('click', () => {
    restScore()
})

document.querySelector('.auto').addEventListener('click', () => {
    autoPlay()
})

function play(userMove){

    const compMove = compMovef();
    

    if(userMove === "rock"){
        if(compMove === "rock"){
            result = "Tie"
        }

        else if(compMove === "paper"){
            result = "You lose"
        }
        
        else{
            result = "You win"
        }
    }

    if(userMove === "paper"){
        if(compMove === "rock"){
            result = "You win"
        }

        else if(compMove === "paper"){
            result = "Tie"
        }
        
        else{
            result = "You lose"
        }
    }

    if(userMove === "scissors"){
        if(compMove === "rock"){
            result = "You lose"
        }

        else if(compMove === "paper"){
            result = "You win"
        }
        
        else{
            result = "Tie"
        }
    }

    if(result === "Tie"){
        score.tie++
    }

    else if(result === "You win"){
        score.win++
    }

    else{
        score.lose++
    }

    document.querySelector(".result").textContent = `${result}.`

    document.querySelector(".moves").innerHTML = `You <img src="img/${userMove}-emoji.png" alt="${userMove}" class="icon"> <img src="img/${compMove}-emoji.png" alt="${compMove}" class="icon"> Computer`
    
    getscore()

    localStorage.setItem("score", JSON.stringify(score))

}

function compMovef(){
    const move = Math.floor(Math.random()*3)

    if(move === 0){
        return "rock";
    }

    else if(move === 1){
        return "paper"
    }

    else{
        return "scissors"
    }
}

function restScore(){
        localStorage.removeItem("score")
        score = {
            win: 0,
            lose: 0,
            tie: 0
        }
        getscore()
        document.querySelector(".result").textContent = ``
        document.querySelector(".moves").textContent = ``

}

function getscore(){
    document.querySelector(".results").textContent = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`
}

let isAutoPlaying = false
let intervalId 

function autoPlay(){

    if(!isAutoPlaying){
        isAutoPlaying = true
        document.querySelector('.auto').textContent= 'Stop Auto Play'
        const userMove = compMovef()
        play(userMove)
        intervalId = setInterval(() => {
            const userMove = compMovef()
            play(userMove)
        }, 3000)
    }

    else{
        document.querySelector('.auto').textContent= 'Auto Play'
        isAutoPlaying = false
        clearInterval(intervalId)
    }
}