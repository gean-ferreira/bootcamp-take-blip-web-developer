function getId(id) {
  const el = document.getElementById(`accordion-item-${id}`);
  const icon = el.children[0].children[0].children[1];
  const children = el.children[1];

  children.getAttribute("contentShow") === "false"
    ? ((children.style.display = "block"),
      children.setAttribute("contentShow", "true"),
      icon.classList.remove(icon.classList[0], icon.classList[1]),
      icon.classList.add("fa-solid", 'fa-caret-up'))
    : ((children.style.display = "none"),
      children.setAttribute("contentShow", "false"),
      icon.classList.remove(icon.classList[0], icon.classList[1]),
      icon.classList.add("fa-solid", 'fa-caret-down'))
}
