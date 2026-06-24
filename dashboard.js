async function loadDashboard(){

const response =
await fetch(
"http://localhost:5000/api/dashboard"
);

const data =
await response.json();

document.getElementById(
"totalStudents"
).innerText =
data.totalStudents;

document.getElementById(
"passStudents"
).innerText =
data.passStudents;

document.getElementById(
"failStudents"
).innerText =
data.failStudents;

document.getElementById(
"avgPercentage"
).innerText =
data.averagePercentage + "%";

new Chart(
document.getElementById(
"studentChart"
),
{
type:"bar",

data:{

labels:[
"Total",
"Pass",
"Fail"
],

datasets:[{

label:"Students",

data:[
data.totalStudents,
data.passStudents,
data.failStudents
]

}]

}

}
);

}

loadDashboard();