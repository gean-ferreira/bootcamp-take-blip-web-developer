let count = 0;

const counter = document.getElementById("count");
counter.innerHTML = count;

const addCount = document.getElementById("add");
addCount.addEventListener("click", function () {
  count++;
  funcDesabled();
});

const rmCount = document.getElementById("rm");
rmCount.addEventListener("click", function () {
  count--;
  funcDesabled();
});

function funcDesabled() {
  if (count <= 0) {
    rmCount.disabled = true;
  } else if (count >= 10) {
    addCount.disabled = true;
  } else {
    rmCount.disabled = false;
    addCount.disabled = false;
  }
  counter.innerHTML = count;
}

funcDesabled();
