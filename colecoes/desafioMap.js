const employees = new Map();

employees.set("João", "user");
employees.set("Antônio", "admin");
employees.set("Maria", "user");
employees.set("José", "admin");
employees.set("Carlina", "admin");

const admins = [];
const users = [];
function getAdmin(map) {
  for ([key, value] of map) {
    value === "admin" ? admins.push(key) : users.push(key);
  }
  return console.log(`Administradores: ${admins} \nUsuários normais: ${users}`)
}

getAdmin(employees)
