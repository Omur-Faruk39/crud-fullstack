const li = document.querySelector(".list");
const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", addTodo);

function addTodo() {
  const task = document.querySelector("#taskInput").value;
  const status = document.querySelector("#statusInput").value;

  if (task.length >= 5) {
    fetch("http://localhost:5029/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status.trim(),
        task: task,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === "ok") {
          document.querySelector("#taskInput").value = "";
          document.querySelector("#statusInput").value = "ONGOING";
          render();
        }
      })
      .catch((err) => console.error("Delete failed:", err));
  }
}

function render() {
  li.innerHTML = "";

  fetch("http://localhost:5029/")
    .then((data) => data.json())
    .then((data) => {
      data.data.forEach((element) => {
        li.innerHTML += `
    <div class="item">
      <input type="text" class="task ${element._id}" value="${element.task}" disabled />
      <select name="statusInput" class="statusInput ${element._id}" disabled>
        <option value="ONGOING">ONGOING</option>
        <option value="INCOMPLETE">INCOMPLATE</option>
        <option value="COMPLETE">COMPLATE</option>
      </select>
      <div>
        <button class="delete-btn delete" name="${element._id}">DELETE</button>
        <button class="delete-btn edit" name="${element._id}">EDIT</button>
      </div>
    </div>`;
      });

      document.querySelectorAll(".statusInput").forEach((select, idx) => {
        select.value = data.data[idx].status;
      });

      document.querySelectorAll(".delete").forEach((e) => {
        e.addEventListener("click", deleteFun);
      });
      document.querySelectorAll(".edit").forEach((e) => {
        e.addEventListener("click", editTodo);
      });
    });
}

function editTodo(e) {
  const inp = document.querySelectorAll(`.${e.target.name}`);
  inp.forEach((ele) => {
    ele.disabled = !ele.disabled;
  });
  if (e.target.innerText === "SAVE") {
    fetch("http://localhost:5029/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e.target.name,
        value: {
          task: inp[0].value,
          status: inp[1].value,
        },
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === "ok") {
          render();
        }
      });
  }
  e.target.innerHTML = e.target.innerText === "EDIT" ? "SAVE" : "EDIT";
}

function deleteFun(e) {
  console.log(e.target);
  fetch("http://localhost:5029/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: e.target.name,
    }),
  })
    .then((data) => data.json())
    .then((res) => {
      if (res.status === "ok") {
        render();
      }
    })
    .catch((err) => console.error("Delete failed:", err));
}

render();
