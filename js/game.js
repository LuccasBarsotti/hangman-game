document.getElementById('button_modal').style.display= "none";
document.getElementById('button_modal2').style.display= "none";
document.getElementById('button_modal3').style.display= "none";
const urlParams = new URLSearchParams(location.search);
var op= urlParams.get('op');
var modal= false;
var tip_used= 0;
switch(op)
{
  case '1':
    var words = [
      "cadeira",
      "guarrafa",
      "celular",
      "calculadora",
      "mesa",
      "ventilador",
      "computador",
      "cama",
      "porta",
      "prato",
      "copo",
      "mochila",
      "lousa",
      "caneta"
    ]
    var tip= [
      "A gente usa para sentar", "Às vezes pode ter rodinhas", "Tem um encosto",
      "Faz parte do nome de uma música famosa do The Police", "Objeto usado para armazenar liquidos, principalmente", "Pode ser feito de vidro e plástico",
      "É um aparelho muito utilizado no nosso dia a dia", "A maioria hoje é touch screen", "Usamos para fazer ligação, ouvir música e muito mais!",
      "A principal companheira de um profissional de engenharia ma faculdade", "Usada para realizar operações matemáticas", "Possui um fabricante famoso chamado Casio",
      "Tem quatro pernas", "Todo mundo tem em casa", "Usamos como apoio para fazer nossas refeições",
      "Equipamento eletrônico", "Usado em dias quentes", "Uma empresa chamada Arno produz esses equipamentos",
      "É um dispositivo eletrônico", "Steve Jobs vendia esses dispositivos", "Possui um teclado",
      "Lugar mais confortável de uma casa", "Lugar aonde as pessoas tiram uma soneca", "Usamos travesseiro e coberto",
      "Presente na entrada de uma casa", "Tem olho mágico", "Geralmente é feito de madeira",
      "É um artigo de cozinha", "Geralmente é de vidro", "Usamos para colocar comida",
      "É um artigo de cozinha", "Geralmente é de vidro", "Usamos para beber líquidos",
      "Principal parceira de um estudante", "Colocamos nas nossas costas", "Usamos para guardar livros e materiais escolares",
      "Presente nas salas de aula", "Pode ter cor verde, preto e branco", "Usado pelo(a) professor(a) para realizar anotações",
      "Usamos para escrever", "Não é um lápis", "Vem com tinta azul, preta, vermelha e etc..."
    ]
  break;
  case '2':
    var words = [
      "Curitiba",
      "Guaratinguetá",
      "Houston",
      "Paris",
      "Dubai",
      "Aracaju",
      "Washington",
      "Florianopolis",
      "Moscou",
      "Belem",
      "Vitória",
      "Jerusalem",
      "Joinville",
      "Xangai"
    ]
  break;
  case '3':
    var words = [
      "cachorro",
      "gato",
      "tartaruga",
      "elefante",
      "galinha",
      "lesma",
      "canguru",
      "tubarão",
      "morcego",
      "rinoceronte",
      "borboleta",
      "minhoca",
      "coelho",
      "tigre"
    ]
  break;
  case '4':
    var words = [
      "Brasil",
      "Argentina",
      "Peru",
      "India",
      "Canada",
      "Russia",
      "Ucrania",
      "França",
      "China",
      "Australia",
      "Italia",
      "Angola",
      "Madagascar",
      "Israel"
    ]
  break;
}

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = words[Math.floor(Math.random() * words.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './img/' + mistakes + '.jpg';
}

function takeTip(op) {
  index= words.indexOf(answer);
  index2= index * 2;
  console.log(index);
  console.log(index2);
  console.log(index + index2 + op - 1)
  document.getElementById('list-tip' + op).innerHTML= tip[index + index2 + op - 1];
  if (tip_used != 3)
    tip_used++;
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
    var points= parseInt(document.getElementById('points').innerText);
    points= points + 100;
    document.getElementById('points_win').innerHTML= points + " pontos";
    document.getElementById('points_tips').innerHTML= "-" + tip_used * 25 + " pontos";
    document.getElementById('points').innerHTML = points - (tip_used * 25);
    document.getElementById('points_total').innerHTML= points - (tip_used * 25) + " pontos";
    document.getElementById('button_modal').click();
    modal= true;
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    var points= parseInt(document.getElementById('points').innerText);
    document.getElementById('total_loose').innerHTML= points + " pontos";
    document.getElementById('button_modal2').click();
  }
}

function recordScore() {
  document.getElementById('close_modal').click();
  document.getElementById('close_modal2').click();
  document.getElementById('button_modal3').click();
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  document.getElementById('close_modal').click();
  document.getElementById('close_modal2').click();
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './img/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
