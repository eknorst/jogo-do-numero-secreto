/*let titulo = document.querySelector('h1'); //como se estivessemos inserido texto diretamente nesse paragrafo <h1></h1> no index.html
titulo.innerHTML = 'Jodo do Número Secreto';

let paragrafo = document.querySelector('p'); //como se estivessemos inserido texto diretamente nesse paragrafo <p class="texto__paragrafo"></p> no index.html
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
*/

// a seguinte função pode ser usada para substituir o texto inserido acima, tornando o código mais estruturado
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // adiciona fala com responsive voice ao site com velocidade 1.2 e em português
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor que o chute');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // gera numero aleatóri
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // quantiade de itens na lista do array

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []; // limpa array
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // includes: verifica se um numero ká está dentro de listadenumerossorteadors
        return gerarNumeroAleatorio(); //recurssão: a função q por algum motivo chama ela novamente
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados); // adiciona item ao final do array
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; // limpa campo input onde é inserido o chute
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
