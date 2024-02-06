// VARIABLES
const formElement = document.getElementById('formElement');
const homeworkList = document.getElementById('homeworkList');
const borrarElement=document.getElementsByClassName("borrar-tweet");

let homeworks = [];
let homework="";
// LISTENERS

loadListeners();

function loadListeners() {
	formElement.addEventListener('submit', createHomework);
	document.addEventListener('DOMContentLoaded',()=>{
		homeworks=JSON.parse(localStorage.getItem('homeworks')) || [];
		console.log(homeworks);
		showHomeworkHtml();
	});	
	
}



// FUNCIONES
function createHomework(e) {
	e.preventDefault();
	const homework = document.getElementById('homework').value.trim();
	if (homework === '') {
		showAlert('Tarea vacia ');
		return;
	}
	const homeworkObject = {
		id: Date.now(),
		homework,
	};
	homeworks = [...homeworks, homeworkObject];
	formElement.reset();
	console.log(homeworks);

	showHomeworkHtml();
	
}

function showAlert(message) {
	const element = document.createElement('p');
	element.textContent = message;
	element.classList.add('error');

	const exist = document.querySelector('.error');

	if (!exist) {
		formElement.appendChild(element);
		return;
	}


}

// Create (crear - post)
// Read ( leer - get )
// Update (actualizar - put)
// Delete (borrar - delete)

function showHomeworkHtml(){
	clearShowHomeworkHtml();
	homeworks.forEach(variablehomework=>{
		const deleteHomework=document.createElement("button");
		deleteHomework.textContent="X";
		deleteHomework.classList.add("borrar-tweet");
		
		
		const homeworkElement=document.createElement("li");
			homeworkElement.classList.add("list-homework");
			homeworkElement.textContent=variablehomework.homework;
			homeworkElement.appendChild(deleteHomework);
			homeworkList.appendChild(homeworkElement);

			readHomewordkLS();

			deleteHomework.onclick=()=>{
				let idTweetEliminar=variablehomework.id;
				deleteTweet(idTweetEliminar);
				readHomewordkLS();
			}

			
			
	});
}
function clearShowHomeworkHtml(){
	homeworkList.textContent="";
}
function readHomewordkLS(){
	localStorage.setItem('homeworks',JSON.stringify(homeworks));
}

function deleteTweet(id){
		homeworks=homeworks.filter(variablehomework=>variablehomework.id!==id);
		console.log(homeworks);
		showHomeworkHtml();
}



