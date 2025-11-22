// constructor
function FastFingers() {
    // textos do modo normal
    const textos_normal = [
        'Hoje de manhã encontrei um senhor de idade ao lado de uma antiga farmácia aqui do bairro onde moro.', 
        'Fomos ao supermercado as pressas para comprar o tempero que estava faltando para o churrasco',
        'O entregador de cachorro quente estava atrasado. Por isso reclamamos da demora no aplicativo',
        'Era uma segunda-feira de feriado então... Jogamos jogos de tabuleiro até altas horas no fim de semana!',
        'Vendemos nosso carro de luxo para reformar os fundos de casa mas infelizmente ocorreu imprevistos',
        'O helicóptero sobrevoou o litoral inteiro para fazer a gravação do documentário'
    ]

    // textos modo dev
    const textos_dev = [
        "function helloWorld() { console.log('Hello World'); }",
        "array.map(item => item * 2).filter(num => num > 10);",
        "let developer = () => { console.log(`${nome}, sou dev!`); }",
        "document.getElementById('app').innerHTML = 'JS Frameworks';"
    ]

    // variáveis
    this.tempoEl = document.querySelector('.tempo');
    this.textoEl = document.querySelector('.texto');
    this.input = document.querySelector('.inp-texto');
    this.jogoAndamento = false;

    // frase para digitação
    this.fraseAtual = () => {
        // numero aleatório para escolher a frase
        this.textoSorteado = textos_normal[Math.floor(Math.random() * textos_normal.length)];
        this.textoEl.innerText = this.textoSorteado;
    }

    // quando digita no input...
    this.input.addEventListener('input', (e) => {
        if (e.target.value === this.textoSorteado) {
            alert('terminei');
        }
        if (!this.jogoAndamento) {
            this.jogoAndamento = true;
            this.iniciarCronometro();
        }
    });

    // responsável pelo tempo
    this.iniciarCronometro = () => {
        let tempo = 0;
        this.intervalo = setInterval(() => {
            tempo += 1;
            this.tempoEl.innerText = tempo;
        }, 1000);
    }
}

// ativa a jogo/função
const p1 = new FastFingers();
p1.fraseAtual();