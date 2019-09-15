let navMain = document.getElementById("check_menu");

document.addEventListener ("click", function (event) {
    let target = event.target;
    if (!target.closest("#check_menu") && !target.closest('.label_menu')) {
        if (!target.closest('.menu')) {
            navMain.checked = false;
        }
    }
});