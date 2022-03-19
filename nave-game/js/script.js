const entities = ["jogador", "inimigo1", "amigo", "inimigo2"];

// Inicia o jogo
function start() {
  document.getElementById("inicio").style.display = "none";
  const fundoGame = document.getElementById("fundoGame");

  for (let i = 0; i < entities.length; i++) {
    const el = entities[i];
    const div = document.createElement("div");

    // Adiciona o id e classe para animação
    setAttributes(div, { id: el, class: `anima${i + 1}` });
    fundoGame.append(div);
  }

  // Principais variáveis do game
  let jogo = {};
  const VELOCIDADE = 6;
  const VELOCIDADE_CAM = 3;
  const VELOCIDADE_AM = 1;
  let posicaoY = parseInt(Math.random() * 334);
  const TECLAS = { UP: 38, DOWN: 40, D: 68 };

  jogo.pressionou = [];

  document.addEventListener("keydown", function (e) {
    jogo.pressionou[e.which] = true;
  });

  document.addEventListener("keyup", function (e) {
    jogo.pressionou[e.which] = false;
  });

  // Função loop
  jogo.timer = setInterval(loop, 30);
  function loop() {
    movefundo();
    movejogador();
    moveInimigoHel();
    moveInimigoCam();
    moveAmigo();
  }

  // Função que fará o jogo mover-se
  let count = 0;
  function movefundo() {
    fundoGame.style.backgroundPosition = `${count--}px`;
  }

  // Função que faz o jogador morver-se
  const jogador = document.getElementById("jogador");
  let movePlayer = parseInt(window.getComputedStyle(jogador).top);
  function movejogador() {
    if (jogo.pressionou[TECLAS.UP]) {
      jogador.style.top = `${(movePlayer -= 10)}px`;
      // Faz com que o jogador não
      // Saia da tela pai
      if (movePlayer <= 5) {
        jogador.style.top = `${(movePlayer += 10)}px`;
      }
    }
    if (jogo.pressionou[TECLAS.DOWN]) {
      jogador.style.top = `${(movePlayer += 10)}px`;
      // Faz com que o jogador não
      // passe do npc
      if (movePlayer >= 435) {
        jogador.style.top = `${(movePlayer -= 10)}px`;
      }
    }
    if (jogo.pressionou[TECLAS.D]) {
      //Disparar
    }
  }

  //Função que faz mover o helicoptero inimigo
  const inimigo1 = document.getElementById("inimigo1");
  function moveInimigoHel() {
    let moveInimigo1 = parseInt(window.getComputedStyle(inimigo1).left);
    inimigo1.style.left = `${(moveInimigo1 -= VELOCIDADE)}px`;
    inimigo1.style.top = `${posicaoY}px`;

    if (moveInimigo1 <= -30) {
      posicaoY = parseInt(Math.random() * 334);
      inimigo1.style.left = "694px";
      inimigo1.style.top = `${posicaoY}px`;
    }
  }

  //Faz mover o caminhão inimigo
  const inimigo2 = document.getElementById("inimigo2");
  function moveInimigoCam() {
    let moveInimigo2 = parseInt(window.getComputedStyle(inimigo2).left);
    inimigo2.style.left = `${(moveInimigo2 -= VELOCIDADE_CAM)}px`;

    if (moveInimigo2 <= 0) {
      inimigo2.style.left = "785px";
    }
  }

  //Faz mover o amigo
  const amigo = document.getElementById("amigo");
  function moveAmigo() {
    let moveAmigo = parseInt(window.getComputedStyle(amigo).left);
    amigo.style.left = `${(moveAmigo += VELOCIDADE_AM)}px`;

    if (moveAmigo >= 910) {
      amigo.style.left = "0px";
    }
  }
}

// Função para adicionar mais de um atributo
function setAttributes(el, attrs) {
  for (let key in attrs) el.setAttribute(key, attrs[key]);
}
