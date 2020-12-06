const toggleColorMode = e => {
    
    const del_buttons = document.querySelectorAll(".delete-button");

    // Switch to light mode
    if (e.currentTarget.classList.contains("light-hidden")) {

        // Set custom html attribute
        document.documentElement.setAttribute("color-mode", "light");

        // Set pref in local storage
        localStorage.setItem("color-mode", "light");
        
        // Switch to light del_button
        del_buttons.forEach(btn => {
            btn.src = "assets/trash_2.svg";
        });

        return;
    }
    
    // Switch to dark mode
    document.documentElement.setAttribute("color-mode", "dark");

    // Set pref in local storage
    localStorage.setItem("color-mode", "dark");

    // Switch to dark del button
    del_buttons.forEach(btn => {
        btn.src = "assets/trash-2_dark.svg";
    });
};

// Set up event listeners
const toggleColorButtons = document.querySelectorAll(".color-mode_btn");

toggleColorButtons.forEach(btn => {
    btn.addEventListener("click", toggleColorMode);
})