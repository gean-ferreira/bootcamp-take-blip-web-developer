let countCol = 0;

const counterCol = document.getElementById("countCol");
counterCol.innerHTML = countCol;

const addCol = document.getElementById("addCol");
addCol.addEventListener("click", function () {
  countCol++;
  funcColors();
});

const rmCol = document.getElementById("rmCol");
rmCol.addEventListener("click", function () {
  countCol--;
  funcColors();
});

function funcColors() {
  if (countCol <= -1) {
    counterCol.style.color = "red";
  } else if (countCol > 0) {
    counterCol.style.color = "green";
  } else {
    counterCol.style.color = "yellow";
  }
  counterCol.innerHTML = countCol;
}

funcColors();
