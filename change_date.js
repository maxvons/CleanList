function change_date() {
    const title = document.querySelector(".title")
    const sub_title = document.querySelector(".sub-title");
    const current = new Date();
    const title_date = title.textContent;
    const days_with_names = {
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat",
        7: "Sun"
    };

    date_str = current.toLocaleDateString().replace(/\//g, ".");
    day = days_with_names[current.getDay().toString()];

    console.log(`date: ${date_str}, day: ${day}`);
    console.log(title_date);

    if (date_str !== title_date) {
        title.textContent = date_str;
        sub_title.textContent = days_with_names[day];

        console.log(`Updated date to ${date_str} and day to ${day}`);
    }
}

change_date();

(function loop() {
    console.log("checked");
    let current = new Date();
    if (current.getHours() === 24 && current.getMinutes() === 0) {
        change_date();
    }
    current = new Date();
    let delay = 60000 - (current % 60000);
    setTimeout(loop, delay);
})();