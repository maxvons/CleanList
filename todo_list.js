window.onload = function() {
    let tasks = [];

    // Add saved tasks on browser refresh.
    const ref = localStorage.getItem("tasksRef");
        if (ref) {
          tasks = JSON.parse(ref);
          tasks.forEach(t => {
            renderTask(t);
          });
        }

    // Set progress indicator width on browser refresh
    const progress_indicator_width = localStorage.getItem("progress-indicator-width");
    const progress_indicator = document.querySelector(".progress-indicator");
    
    if (progress_indicator_width) {
        progress_indicator.style.width = progress_indicator_width;
    }

    function renderTask(task) {
        localStorage.setItem("tasksRef", JSON.stringify(tasks));

        const list = document.querySelector(".todo-list");

        // Check if task is done or not.
        const isChecked = task.checked ? "done": "";

        // Create list element and add to list.
        const node = document.createElement("li");

        node.setAttribute("class", "task ${isChecked} animate__animated animate__fadeInUp");
        node.setAttribute("data-key", task.id);

        // Set the contents of the list element.
        dark_or_light = document.documentElement.getAttribute("color-mode");
        dark_or_light = dark_or_light == "light" ? "assets/trash_2.svg": "assets/trash-2_dark.svg";

        node.innerHTML = `
            <label for="${task.id}" class="tick js-tick">${task.text}</label>
            <input id="${task.id}" type="checkbox"/>
            <img src="${dark_or_light}" class="delete-button" alt="Delete button">
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

        // Update local storage.
        localStorage.setItem("tasksRef", JSON.stringify(tasks));
    }

    function showErrorMessage() {
        input_field = document.querySelector(".todo-list-input");

        input_field.className += " error-border";
        input_field.setAttribute("placeholder", "Cannot add an empty task.");
        micron.getEle("#todo-textarea").interaction("shake").duration(".45").timing("ease-in-out");
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

    function increment_progress_indicator() {
        const progress_indicator = document.querySelector(".progress-indicator");
        const current_width = progress_indicator.style.width;
        const current_width_val = parseInt(current_width.slice(0, -1));
        console.log(current_width_val);
        console.log(current_width);

        if (current_width !== "100%") {
            const updated_width = `${current_width_val+20}%`
            progress_indicator.style.width = updated_width;

            // Set value in local storage
            localStorage.setItem("progress-indicator-width", updated_width);
            console.log(`Set width in local storage to ${updated_width}`)

            if (updated_width === "100%") {
                const tasks_heading = document.querySelector(".tasks-heading");
                tasks_heading.classList += " animate__animated animate__flip"
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
            increment_progress_indicator();
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

        // Focus input field.
        document.querySelector(".todo-list-input").focus();
    }