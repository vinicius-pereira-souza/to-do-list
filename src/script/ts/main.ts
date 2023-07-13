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

function checkHaveNotes(): void {
  const arrNotes = getAllNotes();

  if (arrNotes?.length) {
    emptyContainer!.classList.remove("show-box");
  } else {
    emptyContainer!.classList.add("show-box");
  }
}

function getAllNotes(): Note[] {
  // @ts-ignore
  const notesArr: Note[] = JSON.parse(localStorage.getItem("notes"));

  return notesArr;
}

checkHaveNotes();
