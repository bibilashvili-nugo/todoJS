const add = document.querySelector(".add");
const inputValue = document.querySelector("#input");
const taskUl = document.querySelector(".task-ul");

let arr = [];

const getData = async () => {
  const result = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: inputValue.value,
      completed: false,
      userId: 5,
    }),
  });
  const todoCheck = await result.json();

  const taskLi = document.createElement("li");
  const taskDiv = document.createElement("div");
  const buttonLi = document.createElement("button");

  taskLi.setAttribute("id", arr.length);
  taskDiv.textContent = todoCheck.todo;
  buttonLi.setAttribute("class", "delete");
  buttonLi.textContent = "Delete";

  taskLi.appendChild(taskDiv);
  taskLi.appendChild(buttonLi);
  taskUl.appendChild(taskLi);

  arr.push({ id: arr.length, todo: todoCheck.todo });

  buttonLi.addEventListener("click", () => {
    const id = taskLi.getAttribute("id");
    taskLi.remove();
    arr = arr.filter((item) => item.id != id);
  });
};

add.addEventListener("click", getData);

inputValue.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getData();
    inputValue.value = "";
  }
});
