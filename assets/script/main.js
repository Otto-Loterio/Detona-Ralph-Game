const state = {

    view: {
         quadrado: document.querySelectorAll(".quadrado"),
         inimigo: document.querySelector(".inimigo"),
         tempo: document.querySelector("#tempo"),
         ponto: document.querySelector("#ponto")
    },

    values: {
        velocidadeJogo: 1000,
        posicao: 0,
        resultado: 0,
        tempoIndo: 60,
    },

    actions: {
        contagemTimerid: setInterval(contagem, 1000),
        timerId: setInterval(quadradoAleatorio, 1000),
    }
};

function contagem(){
    state.values.tempoIndo--;
    state.view.tempo.textContent = state.values.tempoIndo

    if(state.values.tempoIndo <= 0) {
        clearInterval(state.actions.contagemTimerid)
        clearInterval(state.actions.timerId)
        alert("Tempo acabou! O seu resultado foi " + state.values.resultado)
    }
}

function som(){
    let audio = new Audio("./assets/sounds/hit.m4a")
    audio.volume = 0.2;
    audio.play();
}

function quadradoAleatorio(){
    state.view.quadrado.forEach((quadrado) => {
        quadrado.classList.remove("inimigo");
    });

    let numeroAleatorio = Math.floor(Math.random() * 9);
    let quadradoAleatorio = state.view.quadrado[numeroAleatorio];
    quadradoAleatorio.classList.add("inimigo");
    state.values.posicao = quadradoAleatorio.id;
}

// function movimentoInimigo(){
//     state.values.timerId = setInterval(quadradoAleatorio, state.values.velocidadeJogo)
// }

function addListenerHitBox() {
    state.view.quadrado.forEach((quadrado) => {
        quadrado.addEventListener("mousedown", () => {
            if(quadrado.id === state.values.posicao){
                state.values.resultado++
                state.view.ponto.textContent = state.values.resultado;
                state.values.posicao = null;
                som();
            }
        });
    });
}

function inicio() {
    // movimentoInimigo();
    addListenerHitBox();
}

inicio();