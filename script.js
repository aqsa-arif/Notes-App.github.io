
let title = document.querySelector('.title');
let msg = document.querySelector('.msg');
let createbtn = document.querySelector('#createbtn');
let  savednotes = document.querySelector('.savednotes');
let form = document.querySelector('form');
let search =document.querySelector('#search');

search.addEventListener('input', () => {
    let searchVal =  search.value;
    // console.log(searchVal);

    let noteName = document.getElementsByClassName('snote');
    Array.from(noteName).forEach( (key) => {
        let noteTitle = key.getElementsByTagName('h5')[0].innerHTML;

        if(noteTitle.includes(searchVal))  {
            key.style.display = "block";
        }
        else{
            key.style.display = "none";
        }
    })
})


createbtn.addEventListener('click', () => {
    addNote();
})

let notesData = [];
let accesData = [];
let storeData = [];


// console.log(d.toLocaleString());
const addNote = () => {  
    let d = new Date();
    let fullDate = d.toLocaleString(); 

    notesData = [title.value,  msg.value, fullDate]; 

    let notes = localStorage.getItem('notes');    
   if(notes == null){
    parseData = []; 
   }
   else{
       parseData = JSON.parse(notes);
   }

   parseData.push(notesData);
   localStorage.setItem('notes', JSON.stringify(parseData));

   reset(); 
   savednotes.innerHTML = "";
   showData(); 
} 

function deleteItem(index){  

    parseData.splice(index, 1);
   localStorage.setItem('notes', JSON.stringify(parseData));

   savednotes.innerHTML = "";
   showData();
} 

const reset = () => { 
    document.getElementById('title').value = "";
    document.getElementById('title').placeholder = 'Title';
    document.querySelector('.msg').value = "";
    document.querySelector('.msg').placeholder = "Add notes here";
}



function showData(){  

    let  parseD = localStorage.getItem('notes'); 

    if(parseD === null ){  
     parseData = [];   
     const p = document.createElement('p');
     p.classList.add('marg');
     p.innerHTML = "You haven't added any notes yet."
     savednotes.appendChild(p);
   }
    else{ 
        parseData = JSON.parse(parseD);  

    }   
    
   parseData.forEach( (data, index) => {
    const  divNote = document.createElement('div');
    divNote.classList.add('snote');
    savednotes.appendChild(divNote);

    divNote.innerHTML = `
   <div class="date">${data[2]}</div>
   <h5>${data[0]}</h5>
   <p>${data[1]}</p>    
    <button type="button" id=${index} class="deletebtn" onclick="deleteItem(this.id)" >Delete Note</button>
   `;
   
//    console.log("id is "+ index);

   });

  };
 
showData();

form.addEventListener('submit', (e) => {    
    e.preventDefault();
})
