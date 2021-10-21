let order = []; //Será a "ordem" do jogo que aparecerá aleatoriamente.
let clickedOrder = []; //Será a "ordem" dos nosso cliques.
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

//Selecionaremos todas as cores feitas no HTML
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//Cria a ordem aleatória de cores.
const shuffleOrder = () => {                         //"Shuffle" = embaralhar/misturar.
    let colorOrder = Math.floor(Math.random() * 4)  //Variável que guardará o nº sorteado. Temos 4 números (de 0 a 3 no array).
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);    //O Number(i) começará com 0, depois com os acertos, será somado + 1...
    }
}

//Acende a próxima cor.
let lightColor = (element, number) => {
    number = number * 1500;
    console.log(number);
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 1000);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//Checa se os botões clicados são os mesmos da ordem gerada no jogo.
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou!\nIniciando próximo nível`);
        nextLevel();
    }
}

//Função para o clique do usuário
let click = (color) => {
    console.log(color);
    clickedOrder[clickedOrder.length] = color;
    console.log(clickedOrder);
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//Função que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//Função para próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//Função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    
    playGame();
}

//Função de início do jogo
let playGame = () => {
    alert("Bem-vindo ao Gênesis!\nInicando novo jogo!");
    score = 0;

    nextLevel();
}

//Eventos de clique para as cores.
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//Início do jogo.
playGame();
