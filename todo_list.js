window.onload = function() {
    let tasks = [];

    function renderTask(task) {
        const list = document.querySelector(".todo-list");

        // Check if task is done or not.
        const isChecked = task.checked ? "done": "";

        // Create list element and add to list.
        const node = document.createElement("li");

        node.setAttribute("class", "task ${isChecked}");
        node.setAttribute("data-key", task.id);

        // Set the contents of the list element.
        node.innerHTML = `
            <label for="${task.id}" class="tick js-tick">${task.text}</label>
            <input id="${task.id}" type="checkbox"/>
            <img src="assets/trash_2.svg" class="delete-button" alt="Delete button">
        `;

        list.append(node);
    }

    function addToDo(text) {
        const todo = {
            text,
            checked: false,
            id: Date.now(),
        };

        tasks.push(todo);
        renderTask(todo);
    }

    function removeTask(key) {
        const index = tasks.findIndex(item => item.id === Number(key));
        
        const task = {
            deleted: true,
            text: tasks[index].text,
            checked: true,
            id: tasks[index].id,
        };
        // Remove the task from the task list.
        if (index !== -1) {
            tasks.splice(index, 1);
        }

        const item = document.querySelector(`[data-key='${task.id}']`);
        item.remove();
    }

    function showErrorMessage() {
        input_field = document.querySelector(".todo-list-input");

        input_field.className += " error-border";
        input_field.setAttribute("placeholder", "Do I have to show you how to do it myself?");
    }

    function clearErrorMessage() {
        input_field = document.querySelector(".todo-list-input");

        input_field.className = "todo-list-input";
        input_field.setAttribute("placeholder", "E.g. End world hunger");
    }

    function hideInputField() {
        const form = document.getElementById("todo-list-form");
        
        if (form.className === "show") {
            console.log("Form hidden");
            form.className = "hide";
            if (document.querySelector(".todo-list-input").classList.contains("error-border")) {
                console.log("hello")
                clearErrorMessage();
            }
        }
    }

    const form = document.getElementById("todo-list-form");

    form.addEventListener("submit", event => {

        // Prevent page refresh on submit.
        event.preventDefault();

        const input = document.querySelector(".todo-list-input")

        // Get the text in the input field.
        const text = input.value.trim();

        if (text !== "") {
            addToDo(text);
            input.value = "";
            input.focus();
            clearErrorMessage();
            hideInputField();
        }   else {
            showErrorMessage()
        }
    });

    // Get the task list.
    const list = document.querySelector(".todo-list");

    // Add click event listener to the list and its children.
    list.addEventListener("click", event => {
        if (event.target.classList.contains("task") || 
            event.target.classList.contains("tick") ||
            event.target.classList.contains("delete-button")) {
            
            console.log("clicked");
            // Get the key of the item that was clicked.
            let itemKey = 0
            if (event.target.classList.contains("task")) {
                itemKey = event.target.dataset.key;
            }   else {
                itemKey = event.target.parentElement.dataset.key;
            }
            removeTask(itemKey);
        }
    });

    document.getElementById("todo-list-form").addEventListener("click", event => {
        if (event.target !== event.currentTarget) {
            input_field = document.querySelector(".todo-list-input");
            input_field.setAttribute("placeholder", "");
            return;
        }

        console.log("Form was clicked, not input field.");
        hideInputField();
    });
}

    function activateInputField() {
        form = document.getElementById("todo-list-form");

        form.className = "show";

        // Focus input field
        document.querySelector(".todo-list-input").focus();
    }