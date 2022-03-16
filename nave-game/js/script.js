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
}

// Função para adicionar mais de um atributo
function setAttributes(el, attrs) {
  for (let key in attrs) el.setAttribute(key, attrs[key]);
}
