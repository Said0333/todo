// date
let kun = document.querySelector("#kun");
let oy = document.querySelector("#oy");
let yil = document.querySelector("#yil");
// time
let soat = document.querySelector("#kun");
let minut = document.querySelector("#minut");
let sekund = document.querySelector("#sekund");
// form
let formCreate = document.querySelector("#form");
let formEdit = document.querySelector("#change-form");
// task lists
let taskLists = document.querySelector(".tasks-list");
// message
let message = document.querySelector("#error-message");


// tekshirish

let todos = JSON.parse(localStorage.getItem("item"))
 ? JSON.parse(localStorage.getItem("list"))
 : [];

 // set local storage

function setTodo(){
    localStorage.setItem("list", JSON.stringify(todos))
}

// showTodos

function showTodos(){
    taskLists.innerHTML = "";
    todos.forEach((item)=>{
        taskLists.innerHTML += `<li class="list">
              <span id="tesk-text">${item.title}</span>

              <span class="task-feture">
                <span id="task-time"> ${item.time} </span>
                <img src="./edit.svg" width="22" id="edit" alt="edit-icon" />
                <img
                  src="./delete.svg"
                  width="22"
                  id="delete"
                  alt="delete-icon"
                />
              </span>
            </li>`
    })
}
if (todos.lenght) showTodos();

// time
function getTime(){
    let now = new Date();
    let date = now.getDate() < 10 ? "0" + now.getDay() : now.getDate();
    let month = now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : ((now.getMonth() + 1));
    let year = now.getFullYear();
    // time
    let hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    let minut = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    let seconde = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    return  `${hour}:${minut}, ${date}.${month}.${year}`
}
getTime();

 formCreate.addEventListener("submit", (e)=>{
    e.preventDefault();
    let textInput = formCreate["task"].value.trim();
 

    if (textInput) {
        todos.push({
            title: textInput, 
            time: getTime(), 
            completed: false,
        });
        setTodo();
        showTodos();
        console.log(todos);
    }else{
        message.textContent = "iltimos nimadir yoz"
        setTimeout( () => (message.textContent = ""), 1000);
    }

    formCreate.reset();
 });
