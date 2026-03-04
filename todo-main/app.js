// date
let kun = document.querySelector("#kun");
let oy = document.querySelector("#oy");
let yil = document.querySelector("#yil");
// time
let soat = document.querySelector("#soat");
let minut = document.querySelector("#minut");
let sekund = document.querySelector("#sekund");
// form
let formCreate = document.querySelector("#form");
let formEdit = document.querySelector("#change-form");
//task lists
let formChange = document.querySelector("#change-form");
let taskLists = document.querySelector(".tasks-list");
// message
let message = document.querySelector("#error-message");
let changeError = document.querySelector("#change-error");
// modal
let modal = document.querySelector(".modal")
let overlay = document.querySelector(".overlay")

let editTodo;
// tekshirish


let todos = JSON.parse(localStorage.getItem("item"))
 ? JSON.parse(localStorage.getItem("list"))
 : [];

 // set local storage

function setTodo(){
    localStorage.setItem("list", JSON.stringify(todos))
}

// time

function time() {
  let now = new Date();

  kun.textContent = String(now.getDate()).padStart(2, "0");
  oy.textContent = String(now.getMonth() + 1).padStart(2, "0");
  yil.textContent = now.getFullYear();

  soat.textContent = String(now.getHours()).padStart(2, "0");
  minut.textContent = String(now.getMinutes()).padStart(2, "0");
  sekund.textContent = String(now.getSeconds()).padStart(2, "0");
}

setInterval(time, 1000);
time();
// showTodos

function showTodos(){
    taskLists.innerHTML = "";

    todos.forEach((item, i)=>{
        taskLists.innerHTML +=
        `<li ondblclick="completed(${i})" class="list ${item.completed == true ? "completed " : ""}">
              <span id="tesk-text">${item.title}</span>

              <span class="task-feture">
                <span id="task-time"> ${item.time} </span>
                <img onclick="handleChange(${i})" src="./edit.svg" width="22" id="edit" alt="edit-icon" />
                <img
                onclick="handleDelete(${i})"
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


// delete function
function handleDelete(id){
   let deletedTodo = todos.filter((item, i) => {
    return id !== i;
   })
   todos = deletedTodo
   showTodos();
   setTodo();
}

// completed
function completed (id){
    let completedTodo = todos.map((item, i) => {
        if (id === i){
            return {...item, completed:item.completed == true ? false : true}
        }else{
            return item;
        }
})
todos = completedTodo;
setTodo();
showTodos();

}
//change
function handleChange(id) {
    editTodo = id;
    openModal();
}

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
     
    }else{
        message.textContent = "iltimos nimadir yoz"
        setTimeout( () => (message.textContent = ""), 1000);
    }

    formCreate.reset();
 });

 //edit 
function handleEdit(id) {
    editTodo = id;
    openModal();
}

overlay.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none"; 
})

function openModal() {
    modal.classList.remove("hidden")
    overlay.classList.remove("overlay")
}

function closeModal() {
    modal.classList.add("hidden")
    overlay.classList.add("overlay")
}

let editIndex = null;

function handleEdit(id) {
  editIndex = id;

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  formEdit["change-input"].value = todos[id].title;
}

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  let newText = formEdit["change-input"].value.trim();

  if (!newText) {
    changeError.textContent = "nimadir yozing";
    setTimeout(() => (changeError.textContent = ""), 1000);
    return;
  }

  if (editIndex !== null) {
    todos[editIndex].title = newText;
    setTodo();
    showTodos();

    closeModal();
  }
});


function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  editIndex = null;
}


formEdit.addEventListener("submit", (e)=>{
    e.preventDefault();
        let textInput = formEdit["change-input"].value.trim();


    if (textInput) {
        todos.splice(editTodo, 1,{
            title: textInput, 
            time: getTime(), 
            completed: false,
        });
        setTodo();
        showTodos();
        closeModal();
    }else{
        message.textContent = "Tog'a nimadir yozib qoysinla"
        setTimeout( () => (message.textContent = ""), 1000);
    }

    formEdit.reset();
})


// cancel
const closeBtn = document.getElementById("close-modal");

closeBtn.addEventListener("click", function() {
    modal.classList.add("hidden")
})


