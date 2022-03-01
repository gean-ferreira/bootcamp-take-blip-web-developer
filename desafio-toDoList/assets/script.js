const bntSave = document.getElementById("saveTask");
const inputTask = document.getElementById("inputTask");
const contentTasks = document.getElementsByClassName("tasks");

let num = 1;
bntSave.addEventListener("click", function () {
  event.preventDefault();
  const elTask = document.createElement("div");
  elTask.setAttribute("class", "each-task");
  const elLabel = document.createElement("label");
  elLabel.setAttribute("for", `task${num}`);
  const elInput = document.createElement("input");
  setAttributes(elInput, {
    name: `task${num}`,
    type: "checkbox",
    status: 'unchecked',
  });
  elLabel.innerText = inputTask.value;

  elTask.append(elInput, elLabel);

  contentTasks[0].append(elTask);
  inputTask.value = "";
  num++;
});

function setAttributes(el, attrs) {
  for (let key in attrs) el.setAttribute(key, attrs[key]);
}
