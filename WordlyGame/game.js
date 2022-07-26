import {WORDS} from './words.js'

let guessTime =6;
let currentArr=[];
let next =0;
let finalWord = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(finalWord)

//create gameboard with 6 rows and 5 columns;
const createBoard=()=>{
    let board = document.getElementById("gameboard")
    let i,j;
    for(i=0;i<6;i++){
        let row = document.createElement('div');
        row.className='boardRow';
        for(j=0;j<5;j++){
            let box = document.createElement('div');
            box.className='boardBox';
            row.append(box);
        }
        board.appendChild(row);
    }
}

createBoard();


const userInput=()=>{
    document.getElementById('keyboard-cont').addEventListener('click', e => {
        let keyboard = e.target;
        let word = e.target.textContent;

        //click keyboard button 
        if (!keyboard.classList.contains('keyboard-button')) {
            return null;
        }
        if (word === 'Del') {
            return word = 'Backspace';
        }

        document.dispatchEvent(new KeyboardEvent('keyup', { 'key': word }))
    })
    
    document.addEventListener("keyup", e => {
        let inputword = String(e.key);
        console.log(inputword)
        if (guessTime === 0) {
            return;
        }
        if (inputword === 'Backspace' && next !== 0) {
            deleteWord();
            return;
        }
        if (inputword === 'Enter') {
            checkWord();
            return;
        }
        //check is alphabetical and singe letter
        let input = inputword.match(/[a-z]/gi);
        console.log(input)
        if (!input || input.length > 1) {
            return
        } else {
            insertWord(inputword);
        }
    })
}
        


const insertWord=(word)=>{
    if(next===5){
        return;
    }else{
        let inputword = word.toLowerCase();
        let row = document.getElementsByClassName('boardRow')[6-guessTime];
        let box = row.children[next];
        box.innerText= inputword;
        box.classList.add('filled-box');
        currentArr.push(inputword);
        next+=1;
    }
    
}


const deleteWord=()=>{
    let row = document.getElementsByClassName('boardRow')[6-guessTime];
    let box = row.children[next-1];
    box.textContent='';
    box.classList.remove('filled-box');
    currentArr.pop();
    next-=1;
}

const checkWord=()=>{
    let row = document.getElementsByClassName('boardRow')[6-guessTime];
    let inputString= '';
    let answer = Array.from(finalWord);

    for(let ele of currentArr){
        inputString+=ele;
    }

    for(let i=0;i<5;i++){
        let color = '';
        let box = row.children[i];
        let letter = currentArr[i];
        let index = answer.indexOf(currentArr[i]);

        if(index===-1){
            color='grey';
        }else{
            if(currentArr[i]===answer[i]){
                color='green';
            }else{
                color='red';
            }
        }
        let timeperiod = 300 *i; 
        setTimeout(()=>{
            box.style.backgroundColor = color;
        },timeperiod)
    }
    
    if(inputString===finalWord){
        alert('Correct!');
        guessTime=0;
        return
    }else{
        guessTime-=1;
        currentArr=[];
        next=0;
        if (guessTime===0){
            alert('game over!')
            alert(`final answer is ${finalWord}`)
        }
    }
}


       
userInput();