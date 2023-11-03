let playBtn = document.querySelector('.play')
let tiles = document.querySelectorAll('.box')
let level_dom = document.querySelector('.level')
let info = document.querySelector('.information')
let container = document.querySelector('.container')

let seq = [];
let humanSeq = [];
let level = 0
let accelerator = 0
//human disabled function
let humanDisabled = () =>{
            container.classList.remove('enable')
            container.classList.add('disable')
        setTimeout(() => {
            container.classList.remove('disable')
            container.classList.add('enable')
            info.textContent='Your Turn'
        }, (level*1000)+1000);

}

//activateTile function
const activateTile = (num) => {//integer argument
    const tile = document.querySelector(`[data-tile=${num}]`)
    tile.classList.add('on')
    //setTimeout to turn this off
    setTimeout(()=>{
        tile.classList.remove('on')
    },100)
}
//playRound - computer automated round
const playRound = (nextSequence) => {
nextSequence.forEach((num,i)=>{
    setTimeout(()=>{
        activateTile(num);
    },((i+1)*(1000)))
})

}

//nextStep function
const nextStep = () =>{
const numbers = ['one','two','three','four']
let random = numbers[Math.floor(Math.random()*numbers.length)]
return random
}

//nextRound function
let nextRound = () => { 
    level+=1 
    humanDisabled()
    info.textContent='Wait for the computer to finish'  
    let nextSequence = [...seq] //the nextSequence represents the unpacking of sequence
     nextSequence.push(nextStep()) //nextSequence is pushing the random variable in the function nextStep()
     level_dom.innerHTML = level
     playRound(nextSequence)
     seq = [...nextSequence]//seq = nextSequence
}


//handleClick Tile function
let handleClick = (tile) =>{
    const idx = humanSeq.push(tile) - 1
    console.log(humanSeq[idx])
    console.log(seq[idx])
    if(humanSeq[idx]!==seq[idx]){
        restartGame(`Wrong move!` )
        return;
    }
    if(humanSeq.length == seq.length){//if both arrays are equal}
        if(humanSeq.length == 10){
            restartGame('You have completed all 10 rounds!');
            return;
        }
                humanSeq = []
                info.textContent = `Good Job, you passed level ${level}!`

                setTimeout(()=>{
                    nextRound()
                },1500);
                return
            
            }
       
}
//restartGame function
const restartGame=(text)=>{
        level = 0;
        level_dom.innerHTML = level;
        info.textContent = text
        humanSeq=[]
        seq=[]
        setTimeout(()=>{
            info.textContent = 'Simon Game'; 
            playBtn.classList.remove('hidden')
        },3000)
        
}

//startGame function
let startGame = () => {
    setTimeout(() => {
        playBtn.classList.add('hidden')
        // info.classList.remove('hidden')
        info.textContent='Wait for the computer to finish'
        nextRound()
    }, 1000);
    
}
playBtn.addEventListener('click',startGame)
if(level < 1) {
    container.classList.add('disable')
}
container.addEventListener('click',e =>{
    let tiles = e.target.children
    tiles = [...tiles]
    tiles.forEach((t,i) =>{
        if(t && level >= 1) {
            container.classList.remove('disable')
            let parent = t.parentElement
            handleClick(parent.dataset.tile)
                parent.classList.add('on')
            setTimeout(()=>{
                parent.classList.remove('on')
            },100)
        }
    })
})