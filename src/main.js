let txtTitleNode = document.querySelector("#txt-title");
let txtContentNode = document.querySelector("#txt-content");
let editNoteNode = null;
let listNotesNode = document.querySelector(".list-notes");

function addNote() {
  if (!txtTitleNode.value) {
    alert("Please input title");
    return;
  }
  if (!txtContentNode.value) {
    alert("Please input content");
    return;
  }

  //thêm
  const newNote = `<li data-title="${txtTitleNode.value}" data-content="${txtContentNode.value}" class="bg-yellow-100 cursor-pointer flex items-center justify-between gap-2 p-2 rounded-md relative note-item">
                        <span  class="font-bold">${txtTitleNode.value}</span>
                        <span class="cursor-pointer absolute right-8 text-fuchsia-800" onclick="loadDataIntoForm(event)">
                                <i class="fa-solid fa-eye"></i>
                        </span>
                        <span>
                        <span class="cursor-pointer text-rose-700" onclick="deleteItem(event)">
                            <i class="fa-solid fa-trash"></i>
                        </span>
                    </li>`;
  listNotesNode.innerHTML += newNote;
  _resetForm();
  document.querySelector(".list-note-empty-message")?.classList.add("hidden");
}

function _resetForm() {
  txtTitleNode.value = "";
  txtContentNode.value = "";
  editNoteNode = null;
  document
    .querySelector(".btn-submit span:nth-child(2)")
    .classList.add("hidden");
  document
    .querySelector(".btn-submit span:nth-child(1)")
    .classList.remove("hidden");
}

function loadDataIntoForm(evt) {
  editNoteNode = evt.target.closest('.note-item');
  editNoteNode.classList.add('bg-green-100');
  const txtTitle = editNoteNode.getAttribute("data-title");
  const txtContent = editNoteNode.getAttribute("data-content");
  txtTitleNode.value = txtTitle;
  txtContentNode.value = txtContent;
  document
    .querySelector(".btn-submit span:nth-child(1)")
    .classList.add("hidden");
  document
    .querySelector(".btn-submit span:nth-child(2)")
    .classList.remove("hidden");
}

function editNote() {
  editNoteNode.querySelector("li span:first-child").innerText = txtTitleNode.value;
  editNoteNode.setAttribute("data-title", txtTitleNode.value);
  editNoteNode.setAttribute("data-content", txtContentNode.value);
  alert('メモを変更しました');
  txtTitleNode.value = "";
  txtContentNode.value = "";
  editNoteNode.classList.remove('bg-green-100');
  editNoteNode.classList.add('bg-yellow-100');
  console.log(editNoteNode);
}

function submitNoteData() {
  if (editNoteNode) {
    editNote();
  } else {
    addNote();
  }

  _saveData();
}

function _saveData() {
  const notes = [];
  const listNoteNodes = document.querySelectorAll(".list-notes li");
  listNoteNodes.forEach((node) => {
    notes.push({
      title: node.getAttribute("data-title"),
      content: node.getAttribute("data-content"),
    });
  });
  localStorage.setItem("NOTES_KEY", JSON.stringify(notes));
}

function _loadData() {
  const notes = JSON.parse(localStorage.getItem("NOTES_KEY")) ?? [];
 
  if (notes.length != 0) {
    document.querySelector(".list-note-empty-message").classList.add("hidden");
  }
  const listNoteNodes = document.querySelector(".list-notes");
  notes.forEach((note) => {
    const newNote = `<li data-title="${note.title}" data-content="${note.content}" class="bg-yellow-100 cursor-pointer flex items-center justify-between gap-2 p-2 rounded-md relative note-item">
                        <span  class="font-bold">${note.title}</span>
                        <span class="cursor-pointer absolute right-8 text-fuchsia-800" onclick="loadDataIntoForm(event)">
                                <i class="fa-solid fa-eye"></i>
                        </span>
                        <span>
                            <span class="cursor-pointer text-rose-600" onclick="deleteItem(event)">
                            <i class="fa-solid fa-trash"></i>
                            </span>
                    </li>`;
    listNoteNodes.innerHTML += newNote;
  });
}

_loadData();

function deleteItem(evt) {
  const deleteItemNode = evt.target.closest(".note-item");
  console.log(deleteItemNode);
  listNotesNode.removeChild(deleteItemNode);
  _saveData();
}

function focusInputField() {
  txtTitleNode.focus();
  txtContentNode.classList.add("bg-yellow-100");
}

let btnEditChangeToAddNode = document.querySelector('#btn-edit-change-to-add');
btnEditChangeToAddNode.addEventListener("mouseenter", function() {
    btnEditChangeToAddNode.title = "このボタンをクリックすると、エディットからメモの追加に切り替わります";
});