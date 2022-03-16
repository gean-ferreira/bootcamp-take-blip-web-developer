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
  jogo.timer = setInterval(loop, 30);

  function loop() {
    movefundo();
  }

  // Função que fará o jogo mover-se
  let count = 0;
  function movefundo() {
    fundoGame.style.backgroundPosition = `${count}px`;
    count--;
  }
}

// Função para adicionar mais de um atributo
function setAttributes(el, attrs) {
  for (let key in attrs) el.setAttribute(key, attrs[key]);
}
