const container = document.querySelector("main");
const emptyContainer = document.querySelector(".empty-box");
const form = document.querySelector("form");
const input = document.getElementById("textContent") as HTMLInputElement | null;

interface Note {
  text: string;
  check: boolean;
  id: string;
}

type hasNote = string | null;
let notes: Note[] = [];

form!.addEventListener("submit", handleSubmitNote);

function handleSubmitNote(e: { preventDefault: () => void }) {
  e.preventDefault();

  if (!input!.value) {
    return;
  }

  const note = {
    text: input!.value,
    check: false,
    id: Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1),
  };

  let newArr = [...notes, note];
  localStorage.setItem("notes", JSON.stringify(newArr));
  checkHaveNotes();
  renderAllNote();

  input!.value = "";
}

function checkHaveNotes(): boolean {
  const arrNotes = getAllNotes();

  if (arrNotes?.length) {
    emptyContainer!.classList.remove("show-box");
    return true;
  } else {
    emptyContainer!.classList.add("show-box");
    return false;
  }
}

function getAllNotes(): Note[] {
  // @ts-ignore
  const notesArr: Note[] = JSON.parse(localStorage.getItem("notes"));

  return notesArr;
}

function createNoteComponent(
  text: string,
  id: string,
  check?: boolean,
): HTMLDivElement {
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
    const target = e.currentTarget as HTMLInputElement;

    if (target?.checked) {
      p.classList.add("line-through");
      p.classList.add("text-zinc-800");
    } else {
      p.classList.remove("line-through");
      p.classList.remove("text-zinc-800");
    }
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

function renderAllNote(): void {
  const notes = getAllNotes();

  [...notes].forEach((note: any) => {
    container!.appendChild(createNoteComponent(note.text, note.id, note.check));
  });
}

function deleteNote(id: string) {
  const note = document.getElementById(id);
  let notes = getAllNotes();

  notes = notes.filter((note: any) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));

  note?.remove();
  checkHaveNotes();
}

function checkNote(id: string, checked: boolean) {
  let notes = getAllNotes();

  notes = notes.filter((note: any) => {
    if (note.id === id) {
    }
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}

checkHaveNotes();
renderAllNote();
