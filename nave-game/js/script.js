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

  // Função loop
  let jogo = {};
  const TECLAS = { UP: 38, DOWN: 40, D: 68 };

  jogo.timer = setInterval(loop, 30);
  jogo.pressionou = [];

  document.addEventListener("keydown", function (e) {
    console.log(`${e.which} pressionou`);
    jogo.pressionou[e.which] = true;
  });

  document.addEventListener("keyup", function (e) {
    console.log(`${e.which} largou`);
    jogo.pressionou[e.which] = false;
  });

  function loop() {
    movefundo();
    movejogador();
  }

  // Função que fará o jogo mover-se
  let count = 0;
  function movefundo() {
    fundoGame.style.backgroundPosition = `${count--}px`;
  }

  // Função que faz o jogador morver-se
  let movePlayer = 179;
  const jogador = document.getElementById("jogador");
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
}

// Função para adicionar mais de um atributo
function setAttributes(el, attrs) {
  for (let key in attrs) el.setAttribute(key, attrs[key]);
}
