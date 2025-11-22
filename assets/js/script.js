// constructor
function FastFingers() {
    // textos do modo normal
    const textos_normal = [
        'Hoje de manhã encontrei um senhor de idade ao lado de uma antiga farmácia aqui do bairro onde moro', 
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
    this.btnNormal = document.querySelector('.normal-mode');
    this.btnDev = document.querySelector('.dev-mode');
    this.jogoAndamento = false;
    this.modo = 'normal'
    this.botaoReiniciar = document.querySelector('.escondido');
    this.precisao = document.querySelector('.precisao');
    let ultimoIndice = -1;
    this.errosCometidos = 0;

    // botões modos
    this.btnNormal.addEventListener('click', (e) => {
        e.preventDefault(); // não recarrega a página
        this.botaoReiniciar.classList.add('escondido');
        this.modo = 'normal';
        this.btnDev.classList.remove('botao-ativo');
        this.btnNormal.classList.add('botao-ativo');
        this.reiniciar(); // reseta o jogo com a nova lista
    });

    this.btnDev.addEventListener('click', (e) => {
        e.preventDefault();
        this.botaoReiniciar.classList.add('escondido');
        this.modo = 'dev';
        this.btnNormal.classList.remove('botao-ativo');
        this.btnDev.classList.add('botao-ativo');
        this.reiniciar();
    });

    // frase para digitação
    this.fraseAtual = () => {
        const lista = this.modo === 'dev' ? textos_dev : textos_normal;

        let novoIndice;
        do {
            novoIndice = Math.floor(Math.random() * lista.length);
        } while (novoIndice === this.ultimoIndice);

        // depois que passa do laço atualiza a var do ultimo indice para não cair a mesma frase de novo
        this.ultimoIndice = novoIndice;

        // numero aleatório para escolher a frase
        this.textoSorteado = lista[novoIndice];
        this.textoEl.innerHTML = '';

        this.textoSorteado.split('').forEach((letra) => {
            const span = document.createElement('span');
            span.innerText = letra; // letra dentro do span
            this.textoEl.appendChild(span); // bota na tela
        });
    }

    // quando digita no input...
    this.input.addEventListener('input', (e) => {
        // verifica o tipo de input, se for inserção de texto (não backspace)...
        if (e.inputType === 'insertText' || e.inputType === 'insertCompositionText') {
            const caractereDigitado = e.data; // guarda a tecla que acabou foi apertada
            const indiceAtual = e.target.value.length - 1;
            
            // Se o caractere digitado for diferente do esperado naquela posição...
            if (caractereDigitado !== this.textoSorteado[indiceAtual]) {
                this.errosCometidos++;
            }
        }

        // cores dos acertos e erros
        const arrayLetras = this.textoEl.querySelectorAll('span')
        // separa o que foi digitado em um array
        const arrayDigitado = e.target.value.split('');

        // compara um por um
        arrayLetras.forEach((span, index) => {
            const letraDigitada = arrayDigitado[index];

            if (letraDigitada == null) {
                // usuário ainda não chegou na letra
                span.classList.remove('correto');
                span.classList.remove('incorreto');
            } else if (letraDigitada === span.innerText) {
                // acertos
                span.classList.add('correto');
                span.classList.remove('incorreto');
            } else {
                // erros
                span.classList.remove('correto');
                span.classList.add('incorreto');
            }

        });

        // calculo de precisao
        // tamanho do array de acertos 
        const acertosAtuais = this.textoEl.querySelectorAll('.correto').length;

        // todas tentativas somadas
        const totalTentativasReais = acertosAtuais + this.errosCometidos;

        let porcentagem = 100;

        // if voce comecar a digitar, calcula a porcentagem da precisao
        if (totalTentativasReais > 0) {
            porcentagem = (acertosAtuais / totalTentativasReais) * 100;
        }

        // mostra na tela a precisao atualizada
        this.precisao.innerText = Math.floor(porcentagem);

        // verifica se terminou a frase
        if (e.target.value === this.textoSorteado) {
            clearInterval(this.intervalo);
            this.botaoReiniciar.classList.remove('escondido');
            this.botaoReiniciar.addEventListener('click', () => {
                this.reiniciar();
                this.botaoReiniciar.classList.add('escondido');
            });
            return; 
        }

        // verifica inicio do jogo (cronometro)
        if (!this.jogoAndamento) {
            this.jogoAndamento = true;
            this.tempoEl.innerText = '0'; 
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

    // após terminar o jogo chama uma nova frase e "limpa a bagunça"
    this.reiniciar = () => {
        clearInterval(this.intervalo);
        this.jogoAndamento = false;
        this.input.value = '';
        this.fraseAtual();
        this.errosCometidos = 0;
    }
}

// ativa a jogo/função
const p1 = new FastFingers();
p1.fraseAtual();