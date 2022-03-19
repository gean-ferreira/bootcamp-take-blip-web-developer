const entities = ["jogador", "inimigo1", "amigo", "inimigo2"];

// Inicia o jogo
function start() {
  document.getElementById("inicio").style.display = "none";
  const fundoGame = document.getElementById("fundoGame");

  $("#fundoGame").append("<div id='placar'></div>");
  $("#fundoGame").append("<div id='energia'></div>");
  for (let i = 0; i < entities.length; i++) {
    const el = entities[i];
    const div = document.createElement("div");

    // Adiciona o id e classe para animação
    setAttributes(div, { id: el, class: `anima${i + 1}` });
    fundoGame.append(div);
  }

  // Principais variáveis do game
  let atirar = true;
  let fimdejogo = false;
  let jogo = {};
  //velocidades
  const VELOCIDADE = 6;
  const VELOCIDADE_CAM = 3;
  const VELOCIDADE_AM = 1;
  const VELOCIDADE_BALA = 18;
  let posicaoY = parseInt(Math.random() * 334);
  const TECLAS = { UP: 38, DOWN: 40, D: 68 };
  //Placar
  let pontos = 0;
  let salvos = 0;
  let perdidos = 0;
  //vida
  var energiaAtual = 3;

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
    colisao();
    placar();
    energia();
  }

  // Função que fará o jogo mover-se
  let count = 0;
  function movefundo() {
    fundoGame.style.backgroundPosition = `${count--}px`;
  }

  // Função que faz o jogador morver-se
  const jogador = document.getElementById("jogador");
  let topPosicaoPlayer = parseInt(window.getComputedStyle(jogador).top);
  let leftPosicaoPlayer = parseInt(window.getComputedStyle(jogador).left);
  function movejogador() {
    if (jogo.pressionou[TECLAS.UP]) {
      jogador.style.top = `${(topPosicaoPlayer -= 10)}px`;
      // Faz com que o jogador não
      // Saia da tela pai
      if (topPosicaoPlayer <= 5) {
        jogador.style.top = `${(topPosicaoPlayer += 10)}px`;
      }
    }
    if (jogo.pressionou[TECLAS.DOWN]) {
      jogador.style.top = `${(topPosicaoPlayer += 10)}px`;
      // Faz com que o jogador não
      // passe do npc
      if (topPosicaoPlayer >= 435) {
        jogador.style.top = `${(topPosicaoPlayer -= 10)}px`;
      }
    }
    if (jogo.pressionou[TECLAS.D]) {
      disparar();
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
  let moveInimigo2 = parseInt(window.getComputedStyle(inimigo2).left);
  function moveInimigoCam() {
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
      salvos++;
    }
  }

  //Função que faz o jogador atirar
  function disparar() {
    let posicaoDisparoY = topPosicaoPlayer + 50;
    let posicaoDisparoX = leftPosicaoPlayer + 170;
    const div = document.createElement("div");
    setAttributes(div, { id: "disparo" });
    const disparo = document.getElementById("disparo");
    let tempoDisparo;

    if (atirar == true) {
      atirar = false;

      fundoGame.append(div);

      this.disparo.style.top = `${posicaoDisparoY}px`;
      this.disparo.style.left = `${posicaoDisparoX}px`;

      tempoDisparo = window.setInterval(executaDisparo, 30);
    }

    function executaDisparo() {
      this.disparo.style.left = `${(posicaoDisparoX += VELOCIDADE_BALA)}px`;

      if (posicaoDisparoX > 900) {
        window.clearInterval(tempoDisparo);
        tempoDisparo = null;
        this.disparo.remove();
        atirar = true;
      }
    }
  }

  function colisao() {
    let colisao1 = $("#jogador").collision($("#inimigo1"));
    let colisao2 = $("#jogador").collision($("#inimigo2"));
    let colisao3 = $("#disparo").collision($("#inimigo1"));
    let colisao4 = $("#disparo").collision($("#inimigo2"));
    let colisao5 = $("#jogador").collision($("#amigo"));
    let colisao6 = $("#inimigo2").collision($("#amigo"));

    //jogador com inimigo1
    if (colisao1.length > 0) {
      let inimigo1X = parseInt($("#inimigo1").css("left"));
      let inimigo1Y = parseInt($("#inimigo1").css("top"));
      explosao1(inimigo1X, inimigo1Y);

      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
      energiaAtual--;
    }

    // jogador com o inimigo2
    if (colisao2.length > 0) {
      inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      explosao2(inimigo2X, inimigo2Y);

      $("#inimigo2").remove();

      reposicionaInimigo2();
      energiaAtual--;
    }

    // jogador com o amigo
    if (colisao5.length > 0) {
      $("#amigo").remove();
      reposicionaAmigo();
      perdidos++;
    }

    // Disparo com o inimigo1
    if (colisao3.length > 0) {
      inimigo1X = parseInt($("#inimigo1").css("left"));
      inimigo1Y = parseInt($("#inimigo1").css("top"));

      explosao1(inimigo1X, inimigo1Y);
      $("#disparo").css("left", 950);

      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
      pontos = pontos + 100;
    }

    // Disparo com o inimigo2
    if (colisao4.length > 0) {
      inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      $("#inimigo2").remove();

      explosao2(inimigo2X, inimigo2Y);
      $("#disparo").css("left", 950);

      pontos = pontos + 50;
      reposicionaInimigo2();
    }

    //Inimigo2 com o amigo
    if (colisao6.length > 0) {
      amigoX = parseInt($("#amigo").css("left"));
      amigoY = parseInt($("#amigo").css("top"));
      explosao3(amigoX, amigoY);
      $("#amigo").remove();

      perdidos++;
      reposicionaAmigo();
    }
  }

  //Explosão 1
  function explosao1(inimigo1X, inimigo1Y) {
    $("#fundoGame").append("<div id='explosao1'></div");
    $("#explosao1").css("background-image", "url(./imgs/explosao.png)");
    var div = $("#explosao1");
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    div.animate({ width: 350, opacity: 0 }, "slow");

    var tempoExplosao = window.setInterval(removeExplosao, 1000);

    function removeExplosao() {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;
    }
  }

  //Explosão2
  function explosao2(inimigo2X, inimigo2Y) {
    $("#fundoGame").append("<div id='explosao2'></div");
    $("#explosao2").css("background-image", "url(./imgs/explosao.png)");
    var div2 = $("#explosao2");
    div2.css("top", inimigo2Y);
    div2.css("left", inimigo2X);
    div2.animate({ width: 200, opacity: 0 }, "slow");

    var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

    function removeExplosao2() {
      div2.remove();
      window.clearInterval(tempoExplosao2);
      tempoExplosao2 = null;
    }
  }

  //Explosão3
  function explosao3(amigoX, amigoY) {
    $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
    $("#explosao3").css("top", amigoY);
    $("#explosao3").css("left", amigoX);
    var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
    function resetaExplosao3() {
      $("#explosao3").remove();
      window.clearInterval(tempoExplosao3);
      tempoExplosao3 = null;
    }
  }

  //Reposiciona Inimigo2
  function reposicionaInimigo2() {
    var tempoColisao4 = window.setInterval(reposiciona4, 5000);

    function reposiciona4() {
      window.clearInterval(tempoColisao4);
      tempoColisao4 = null;

      if (fimdejogo == false) {
        $("#fundoGame").append("<div id=inimigo2></div");
      }
    }
  }

  //Reposiciona Amigo
  function reposicionaAmigo() {
    var tempoAmigo = window.setInterval(reposiciona6, 1000);

    function reposiciona6() {
      window.clearInterval(tempoAmigo);
      tempoAmigo = null;

      if (fimdejogo == false) {
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
        moveInimigoCam();
      }
    }
  }

  function placar() {
    $("#placar").html(
      "<h2> Pontos: " +
        pontos +
        " Salvos: " +
        salvos +
        " Perdidos: " +
        perdidos +
        "</h2>"
    );
  }

  function energia() {
    if (energiaAtual == 3) {
      $("#energia").css("background-image", "url(imgs/energia3.png)");
    }

    if (energiaAtual == 2) {
      $("#energia").css("background-image", "url(imgs/energia2.png)");
    }

    if (energiaAtual == 1) {
      $("#energia").css("background-image", "url(imgs/energia1.png)");
    }

    if (energiaAtual == 0) {
      $("#energia").css("background-image", "url(imgs/energia0.png)");

      gameOver();
    }
  }

  //Função GAME OVER
  function gameOver() {
    fimdejogo = true;

    window.clearInterval(jogo.timer);
    jogo.timer = null;

    $("#jogador").remove();
    $("#inimigo1").remove();
    $("#inimigo2").remove();
    $("#amigo").remove();

    $("#fundoGame").append("<div id='fim'></div>");

    $("#fim").html(
      "<h1> Game Over </h1><p>Sua pontuação foi: " +
        pontos +
        "</p>" +
        "<h3><span id='reinicia' onclick=reiniciaJogo()>Jogar Novamente</span></h3>"
    );
  }
}

function reiniciaJogo() {
  $("#fim").remove();
  start();
}
// Função para adicionar mais de um atributo
function setAttributes(el, attrs) {
  for (let key in attrs) el.setAttribute(key, attrs[key]);
}

//function colision(el) {
//  const teste = el.getBoundingClientRect();
//  console.log(
//    `top:${teste.top}, bottom:${teste.bottom}, left:${teste.left}, right:${teste.right}`
//  );
//}
