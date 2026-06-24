let studentsData = [];

async function loadStudents(){

const response =
await fetch(
"http://localhost:5000/api/students"
);

studentsData =
await response.json();

displayStudents(
studentsData
);

}

function displayStudents(
students
){

const table =
document.getElementById(
"studentTable"
);

table.innerHTML = "";

students.forEach(
(student)=>{

table.innerHTML += `
<tr>

<td>${student.name}</td>

<td>${student.rollNo}</td>

<td>${student.course}</td>

<td>
${student.percentage.toFixed(2)}%
</td>

<td>
${student.result}
</td>

</tr>
`;

});

}

document
.getElementById("search")
.addEventListener(
"keyup",
(e)=>{

const value =
e.target.value.toLowerCase();

const filtered =
studentsData.filter(
(student)=>

student.name
.toLowerCase()
.includes(value)

);

displayStudents(
filtered
);

});

loadStudents();