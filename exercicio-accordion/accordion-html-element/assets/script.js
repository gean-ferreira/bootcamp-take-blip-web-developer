const accordions = [
  {
    title: "O sol",
    srcImg: "./img/sol.png",
    details: [
      {
        question: "O que é o sol?",
        answer: "Uma estrela.",
      },
      {
        question: "A cor do sol é amarelo?",
        answer: "Não, ele é branco!",
      },
      {
        question: "Quanto tempo a luz do sol demora pra chegar até a Terra?",
        answer: "8 minutos.",
      },
      {
        question: "Vamos ver se vai funcionar?",
        answer: "Sim, claro!",
      },
    ],
  },
  {
    title: "A lua",
    srcImg: "./img/lua.png",
    details: [
      {
        question: "Quais são as fases da lua?",
        answer: "Cheia, minguante, nova e crescente.",
      },
      {
        question: "Quem é maior, a lua ou plutão?",
        answer: "A lua.",
      },
      {
        question: "Em que ano o homem pisou na lua?",
        answer: "1969.",
      },
    ],
  },
  {
    title: "Sobre a Terra",
    srcImg: "./img/terra.png",
    details: [
      {
        question: "Qual a montanha mais alta do mundo?",
        answer: "Monte Everest.",
      },
      {
        question: "Qual a maior floresta tropical do mundo?",
        answer: "Floresta Amazônica.",
      },
      {
        question: "Quantos continentes existem na Terra?",
        answer: "6.",
      },
    ],
  },
];

for (const res of accordions) {
  const acc = document.getElementById("accordions");
  const title = document.createElement("details");
  const subTitle = document.createElement("summary");
  const myContent = document.createElement("section");
  const rSide = document.createElement("section");
  const img = document.createElement("img");

  subTitle.innerText = res.title;

  myContent.setAttribute("class", "meuConteudo");
  rSide.setAttribute("class", "rightSide");
  img.setAttribute("src", res.srcImg);

  title.append(subTitle);
  title.appendChild(myContent);

  myContent.appendChild(img);
  myContent.appendChild(rSide);

  acc.appendChild(title);

  for (let i = 0; i < res.details.length; i++) {
    question = document.createElement("h4");
    answer = document.createElement("span");
    question.innerText = res.details[i].question;
    answer.innerText = res.details[i].answer;
    rSide.append(question);
    rSide.append(answer);
  }
}
