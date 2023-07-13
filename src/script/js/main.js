"use strict";
const container = document.querySelector("main");
const emptyContainer = document.querySelector(".empty-box");
const form = document.querySelector("form");
const input = document.getElementById("textContent");
function checkHaveNotes() {
    const arrNotes = getAllNotes();
    if (arrNotes?.length) {
        emptyContainer.classList.remove("show-box");
    }
    else {
        emptyContainer.classList.add("show-box");
    }
}
function getAllNotes() {
    // @ts-ignore
    const notesArr = JSON.parse(localStorage.getItem("notes"));
    return notesArr;
}
checkHaveNotes();
