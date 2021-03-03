let showHideBtn = document.querySelector('#showhide')
let studentsTable = document.querySelector('#studentsTable')




let students = [
    {name:'basma', class:1,age:20,degree:100},
    {name:'sama', class:2,age:19,degree:500},
    
]
let actions = [
    {txt:'delete student', classes:'btn btn-danger m-1'},
    {txt:'edit degree', classes:'btn btn-warning m-1'},
    
]
let StudentForm = document.querySelector('#addStudent')
let tableHeaders= ['id','name', 'class','age','degree','grade','actions']


showHideBtn.addEventListener('click', function(e){
    this.innerText=="show form"? this.innerText="hide form" : this.innerText="show form";
    StudentForm.classList.toggle('d-none')
})


StudentForm.addEventListener('submit',function(e){
    e.preventDefault()
    let student = {
        name: this.elements.name.value,
        class: this.elements.class.value,
        age: this.elements.age.value,
        degree: this.elements.degree.value
    
    }
    students.push(student)
    this.reset()
    this.classList.toggle('d-none')
    showHideBtn.innerText="show form"
    showStudents()
})
let addElement = function(eleType, parent, txt='', classes=''){
    ele = document.createElement(eleType)
    if(txt!='') ele.innerText = txt
    if(classes!='') ele.classList=classes
    parent.appendChild(ele)
    return ele
}
let showStudents = function(){
    studentsTable.innerText=''
    students.forEach((student, i)=>{
        tr = addElement('tr', studentsTable)
        tableHeaders.forEach(element=>{ 
            if(element=="id") txt = i+1
           
            else if(element=='grade') txt = getgrade(i)
            else if(element=='actions') txt = ''
            else txt=student[element]
            td = addElement('td', tr, txt)
        })
        actions.forEach(action=>{
            btn = addElement('button', td, action.txt, action.classes)
            btn.addEventListener('click',function(e){
                if(action.txt=='edit degree') editDegree(i)
                else if(action.txt=='delete student') deleteStudent(i)
                           
            })
        })
    })
}
function getgrade(index){
  if (students[index].degree>=90) grade="A"
  else if (students[index].degree>=80) grade="B"
  else if (students[index].degree>=60) grade="C"
  else grade="f"
  return grade;
}

function editDegree(index){
    let degree= prompt('enter degree')
    students[index].degree = degree
    showStudents()
}
function deleteStudent(index){
    students.splice(index,1)
    showStudents()
}


showStudents()