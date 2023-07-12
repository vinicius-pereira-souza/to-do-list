const container = document.querySelector("main");
const form = document.querySelector("form");
const input = document.getElementById("textContent") as HTMLInputElement | null;

interface Note {
  text: string;
  check: boolean;
  id: string;
}

let notes: Note[] = [];

function handleSubmit(e: any) {
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

  notes = [...notes, note];
  input!.value = "";

  localStorage.setItem("notes", JSON.stringify(notes));
  container!.appendChild(createNoteComponent(note.text, note.id));
}

function getAllNote(): void {
  const allNotes: any = localStorage.getItem("notes");
  const notesArr = JSON.parse(allNotes);

  notesArr?.forEach((note: Note) => {
    container!.appendChild(createNoteComponent(note.text, note.id));
  });
}

function createNoteComponent(text: string, id: string): HTMLDivElement {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const input = document.createElement("input");
  const button = document.createElement("button");

  input.setAttribute("type", "checkbox");
  p.textContent = text;
  button.textContent = "Delete";

  button.addEventListener("click", (e: MouseEvent) => {
    deleteNote(id);
  });

  input.addEventListener("click", (e: MouseEvent) => {
    const target = e.currentTarget as HTMLInputElement;

    if (target?.checked) {
      console.log("sim");
    } else {
      console.log("não");
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

function deleteNote(id: string): void {
  const allNotes: any = localStorage.getItem("notes");
  const notesArr = JSON.parse(allNotes);

  notes = notesArr.filter((note: Note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
}

getAllNote();
form!.addEventListener("submit", handleSubmit);
