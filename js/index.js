let monsterContainer = document.getElementById("monster-container");

document.addEventListener("DOMContentLoaded", function () {
  monsterContainer = document.getElementById("monster-container");
  fetchMonsters(page);
  createMonsterForm();
  listenToForm();
  listenToForwardBtn();
  listenToBackBtn();
});

let page = 1;
const form = document.createElement("form");
const nameInputField = document.createElement("input");
const ageInputField = document.createElement("input");
const descInputField = document.createElement("input");

// The page parameter assigns the 50 monsters to that page number
function fetchMonsters(page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then((resp) => resp.json())
    .then((monsters) => {
      // Empty page before rendering monsters
      monsterContainer.innerHTML = "";
      renderFiftyMonsters(monsters);
    });
}

function renderSingleMonster(monster) {
  const monsterDiv = document.createElement("div");
  const monsterNameHeader = document.createElement("h2");
  const monsterAgeHeader = document.createElement("h4");
  const monsterDescPTag = document.createElement("p");

  monsterNameHeader.textContent = monster.name;
  monsterAgeHeader.textContent = monster.age;
  monsterDescPTag.textContent = monster.description;

  monsterContainer.append(monsterDiv);
  monsterDiv.append(monsterNameHeader);
  monsterDiv.append(monsterAgeHeader);
  monsterDiv.append(monsterDescPTag);
}

function renderFiftyMonsters(json) {
  json.forEach((monster) => {
    console.log(monster);
    renderSingleMonster(monster);
  });
}

function createMonsterForm() {
  const createMonsterDiv = document.getElementById("create-monster");

  const submit = document.createElement("input");

  nameInputField.setAttribute("id", "name");
  nameInputField.setAttribute("placeholder", "name...");

  ageInputField.setAttribute("id", "age");
  ageInputField.setAttribute("placeholder", "age...");

  descInputField.setAttribute("id", "description");
  descInputField.setAttribute("placeholder", "description...");

  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Create");

  createMonsterDiv.append(form);
  form.append(nameInputField);
  form.append(ageInputField);
  form.append(descInputField);
  form.append(submit);
}

function listenToForm() {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    postMonster();
  });
}

function postMonster() {
  const postObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: nameInputField.value,
      age: ageInputField.value,
      description: descInputField.value,
    }),
  };

  fetch("http://localhost:3000/monsters", postObj)
    .then((resp) => resp.json())
    .then((monster) => renderSingleMonster(monster));
}

function listenToForwardBtn() {
  const forwardBtn = document.getElementById("forward");
  /* Every click will call the pageUp function, which will increase the page number and fetch the next page which are assigned the next 50 monsters */
  forwardBtn.addEventListener("click", () => pageUp());
}

function pageUp() {
  ++page;
  // We are fetching a specific page, based on the page number
  fetchMonsters(page);
}

function listenToBackBtn() {
  const backBtn = document.querySelector("#back");
  backBtn.addEventListener("click", () => pageDown());
}

function pageDown() {
  --page;
  if (page < 1) {
    alert("There are no monsters here!");
  } else {
    fetchMonsters(page);
  }
}
