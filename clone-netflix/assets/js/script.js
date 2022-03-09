const carousel = document.getElementById("carousel");

for (let i = 1; i <= 11; i++) {
  const el = document.createElement("div");
  const img = document.createElement("img");
  el.classList.add("item");
  img.setAttribute("src", `./imgs/img${i}.jpg`);
  el.append(img);
  carousel.append(el);
}

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 16,
  nav: false,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 4,
    },
    1000: {
      items: 6,
    },
  },
});
