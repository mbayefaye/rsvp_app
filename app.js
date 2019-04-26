//select elements
const form = document.querySelector("#rsvp-form");
const button = document.querySelector("#submit");

const list = document.querySelector("#rsvp-list");
const container = document.querySelector(".container");

//local storage
class Store {
  //get people
  static getPeople() {
    let peoples;
    if (localStorage.getItem("people") === null) {
      peoples = [];
    } else {
      peoples = JSON.parse(localStorage.getItem("people"));
    }
    return peoples;
  }
  //add people
  static addPeople(people) {
    const peoples = Store.getPeople();
    peoples.push(people);
    localStorage.setItem("people", JSON.stringify(peoples));
  }

  //remove people
  static removePeople(name) {
    const peoples = Store.getPeople();
    peoples.forEach((people, index) => {
      if (people.name === name) {
        peoples.splice(index, 1);
      }
    });
    localStorage.setItem("people", JSON.stringify(peoples));
  }
}

//alert function
function alert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  container.insertBefore(div, form);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}
//add person to the list
function addPeopleToList(people) {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${people.name}</td>
      <td> 
      <a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      <td>
      </td>
      
  `;
  list.appendChild(row);
}
//clear field after submitting
function clearfield() {
  const inputValue = (document.querySelector("#name").value = "");
}

//generate random id
var id = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

//submit form
function submitForm(e) {
  e.preventDefault();
  const inputValue = document.querySelector("#name").value;
  if (inputValue === "") {
    alert("name input can't be empty", "danger");
  } else {
    let people = {
      name: inputValue,
      confirmed: false,
      id: id()
    };

    Store.addPeople(people);
    addPeopleToList(people);
  }
  clearfield();
}

//delete people
function deletePeople(e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
}

//event listeners
form.addEventListener("submit", submitForm);
list.addEventListener("click", e => {
  deletePeople(e);
  console.log();

  Store.removePeople(e.target.parentElement.previousElementSibling.textContent);
});

//load the DOM
window.addEventListener("DOMContentLoaded", () => {
  const peoples = Store.getPeople();
  peoples.forEach(people => addPeopleToList(people));
});
