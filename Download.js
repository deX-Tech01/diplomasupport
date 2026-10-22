'use strict';
const search=document.getElementById('search');
const availability=document.getElementById('availability');
const clear=document.getElementById('clear');
const courses=[...document.querySelectorAll('.course')];
const collapse=document.getElementById('collapse');
const initialOpen=new Map(courses.map(course=>[course,course.open]));
function updateCollapse(){collapse.hidden=!courses.some(course=>!course.hidden&&course.open);}
function filterCourses(){
 const query=search.value.trim().toLowerCase();
 let shown=0,files=0;
 courses.forEach(course=>{
  const matchesCourse=course.dataset.name.includes(query);
  let matchingFiles=0;
  course.querySelectorAll('.file-row').forEach(row=>{row.hidden=Boolean(query)&&!matchesCourse&&!row.dataset.title.includes(query);if(!row.hidden)matchingFiles++;});
  course.hidden=(availability.value==='available'&&Number(course.dataset.count)===0)||(Boolean(query)&&!matchesCourse&&matchingFiles===0);
  if(!course.hidden){shown++;files+=matchingFiles;}
  course.open=query?!course.hidden:initialOpen.get(course);
 });
 document.getElementById('results').textContent=`${shown} ${shown===1?'course':'courses'} · ${files} ${files===1?'material':'materials'} linked`;
 document.getElementById('empty').hidden=shown!==0;
 clear.hidden=!search.value;
 updateCollapse();
}
search.addEventListener('input',filterCourses);
availability.addEventListener('change',filterCourses);
clear.addEventListener('click',()=>{search.value='';filterCourses();search.focus();});
document.getElementById('reset').addEventListener('click',()=>{search.value='';availability.value='all';filterCourses();search.focus();});
collapse.addEventListener('click',()=>{courses.forEach(course=>course.open=false);updateCollapse();});
courses.forEach(course=>course.addEventListener('toggle',updateCollapse));
document.getElementById('year').textContent=new Date().getFullYear();
filterCourses();
