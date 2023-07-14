"use strict";
const container = document.querySelector("main");
const emptyContainer = document.querySelector(".empty-box");
const form = document.querySelector("form");
const input = document.getElementById("textContent");
let notes = [];
form.addEventListener("submit", handleSubmitNote);
function handleSubmitNote(e) {
    e.preventDefault();
    const notesAll = getAllNotes();
    if (!input.value) {
        return;
    }
    const note = {
        text: input.value,
        check: false,
        id: Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1),
    };
    let newArr;
    if (notesAll) {
        newArr = [...notesAll, note];
    }
    localStorage.setItem("notes", JSON.stringify(newArr));
    input.value = "";
    checkHaveNotes();
    container.appendChild(createNoteComponent(note.text, note.id, note.check));
}
function checkHaveNotes() {
    const arrNotes = getAllNotes();
    if ((arrNotes === null || arrNotes === void 0 ? void 0 : arrNotes.length) > 0) {
        emptyContainer.classList.remove("show-box");
        return;
    }
    else {
        localStorage.setItem("notes", JSON.stringify([]));
        emptyContainer.classList.add("show-box");
    }
}
function getAllNotes() {
    const notes = localStorage.getItem("notes");
    let notesArr;
    if (notes) {
        notesArr = JSON.parse(notes);
    }
    else {
        notesArr = [];
    }
    return notesArr;
}
function createNoteComponent(text, id, check) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const input = document.createElement("input");
    const button = document.createElement("button");
    input.setAttribute("type", "checkbox");
    p.textContent = text;
    button.textContent = "Delete";
    button.addEventListener("click", (e) => {
        deleteNote(id);
    });
    if (check) {
        input.checked = check;
    }
    input.addEventListener("change", (e) => {
        const target = e.currentTarget;
        checkedInputValue(id, target.checked);
    });
    div.classList.add("box-note");
    div.setAttribute("id", id);
    input.classList.add("input-note");
    p.classList.add("text-note");
    button.classList.add("button-note");
    div.appendChild(input);
    div.appendChild(p);
    div.appendChild(button);
    return div;
}
function renderAllNote() {
    const notes = getAllNotes();
    try {
        if (notes.length > 0) {
            notes === null || notes === void 0 ? void 0 : notes.forEach((note) => {
                container.appendChild(createNoteComponent(note.text, note.id, note.check));
            });
        }
    }
    catch (error) {
        checkHaveNotes();
    }
}
function deleteNote(id) {
    const note = document.getElementById(id);
    let notes = getAllNotes();
    notes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    note === null || note === void 0 ? void 0 : note.remove();
    checkHaveNotes();
}
function checkedInputValue(id, checked) {
    let notes = getAllNotes();
    notes === null || notes === void 0 ? void 0 : notes.filter((note) => {
        if (note.id == id) {
            if (checked == true) {
                return (note.check = true);
            }
            else {
                return (note.check = false);
            }
        }
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}
checkHaveNotes();
renderAllNote();
