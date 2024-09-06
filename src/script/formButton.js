const redButton = document.getElementById("form-button-red");
const returnButton = document.getElementById("form-return-button");
const closeForm = document.getElementById("close-form");

redButton.onclick = () => {
    closeForm.style.display = "grid";
}

returnButton.onclick = () => {
    closeForm.style.display = "none";
}


