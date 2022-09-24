const  addBox = document.querySelector(".add-box"),
popupTitle = document.querySelector("header p"),
popupBox = document.querySelector(".popup-box"),
closeModal = document.querySelector(".uil-times"),
addBtn = document.querySelector("form button")
noteTit = document.querySelector(".title input"),
noteDesc = document.querySelector(".description textarea")
;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem('notes') || '[]');


let isUpdate = false, updateId;

addBox.addEventListener('click', ()=>
{popupBox.classList.add('show')
noteTit.focus();
});

closeModal.addEventListener('click', ()=>{
    isUpdate = false;
    noteTit.value = ''; 
    noteDesc.value = ''; 
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add a New Note';
    popupBox.classList.remove('show');
});

// popupBox.addEventListener('click', ()=>{
//     popupBox.classList.remove('show');
//     noteTit.value = ''; 
//     noteDesc.value = ''; 
// });

function showNotes(){
    document.querySelectorAll('.note').forEach((note)=>note.remove());
    notes.forEach((note, index) => {

        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h">...</i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;

                    addBox.insertAdjacentHTML('afterend', liTag);
    });
}
showNotes();


function showMenu(elem){
    elem.parentElement.classList.add('show');
    document.addEventListener('click', (e)=>{
        if(e.target.tagName != 'I' || e.target != elem){
            elem.parentElement.classList.remove('show');
        }
    });
}




addBtn.addEventListener('click', (e)=>{
    e.preventDefault(); 
    noteTitle = noteTit.value;
    noteDescription = noteDesc.value;

    if(noteTitle || noteDescription){
        let dateObj = new Date(),
        dateYear = dateObj.getFullYear(), 
        dateDay = dateObj.getDate(), 
        dateMonth = months[dateObj.getMonth()];

        let noteInfo =  {
            title: noteTitle,
            description: noteDescription,
            date:  `${dateMonth} ${dateDay},${dateYear}`
        };

        if(!isUpdate){
            notes.push(noteInfo);
        }else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }

        localStorage.setItem('notes',  JSON.stringify(notes));
    }
    popupBox.classList.remove('show');
    showNotes();
});


function updateNote(noteId, title, desc){

    isUpdate = true;
    updateId = noteId;
    noteTit.value = title;
    noteDesc.value = desc;
    addBox.click();
    addBtn.innerText = 'Upate Note';
    popupTitle.innerText = 'Edit Note';
    

}


function deleteNote(noteId){
    let confirmDel = confirm('Are you sure you want to delete this note?');

    if(confirmDel){
        notes.splice(noteId, 1);
        localStorage.setItem('notes',  JSON.stringify(notes));
        showNotes();
        // console.log(noteId);
    }

}
