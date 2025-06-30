var count=0;
function htmlReader(){
    document.querySelector(".meraButton").addEventListener("click",() => {
        const searchBar=document.getElementById("searchBar")
        let userInput=searchBar.value;
        if(userInput.trim() !== ""){
            createTask(userInput);
            searchBar.value="";
        }
        else{
            alert("Please enter a valid Input");
        }
    }
    )
}
async function loadTasks(){
    const response=await fetch('/todo',{method: "GET",});
    const result=await response.json();     // awaiting result first then access tasks
    const allTasks=result.tasks;
    for (const task of allTasks) {
        createTask(task.value,task._id,task.isChecked);
    }
}
function checkTask(inp,value,container){
    inp.addEventListener("click",function(){   
        if(this.checked){
            count-=1;
            this.parentElement.style.opacity="0.5";
            this.nextSibling.style.textDecoration = "line-through";
            updateDatabase(value,container,true);
        }
        else{
            count+=1;
            this.parentElement.style.opacity="1";
            this.nextSibling.style.textDecoration = "none";
            updateDatabase(value,container,false);
        }
        updateTasksLeft(count);
    })
}
function addDelButton(cross,inp,val,container){
    cross.addEventListener("click",function(){
        if(inp.checked){
            cross.parentElement.remove();
            updateDatabase(val,container,true,true);
        }
        else{
            let newVal = confirm("The task is not completed yet, Are u sure u want to delete it");
            if(newVal) {
                cross.parentElement.remove();
                updateDatabase(val,container,true,true);
                count-=1;
                updateTasksLeft(count);
            }
        }
    })
}

function updateTasksLeft(count){
    document.querySelector(".counter").innerHTML="Your remaining todos: "+count;
}

async function createTask(text, existingId=null,isChecked=false){
    let target=document.querySelector(".container");
    let a = document.createElement("div");                     //container->task->{inp,p}
    a.className="task";

    let inp=document.createElement("input");
    inp.type="checkbox";
    inp.className="done";
    inp.checked = isChecked;

    let val=document.createElement("p");
    val.innerHTML=text;
    if (isChecked) {
        a.style.opacity = "0.5";
        val.style.textDecoration = "line-through";
    }
    checkTask(inp,text,a);
    a.append(inp);
    
    val.addEventListener("dblclick",function(){
        let newVal=prompt("Update the task");
        if(newVal.trim()!=""){
            this.innerHTML=newVal;
            updateDatabase(newVal,a);
        }
    })
    a.append(val);

    let cross=document.createElement("button");
    cross.innerHTML="X";
    cross.className="btn btn-outline-success crossButton";
    addDelButton(cross,inp,text,a);
    a.append(cross);

    target.append(a);
    if(!isChecked) count+=1;
    updateTasksLeft(count);
    if(existingId==null) addToDatabase(text,a);
    else a.setAttribute("data-id", existingId);
}
async function addToDatabase(text,container){
    const response=await fetch('/todo',{
        method: "Post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({value: text})
    });
    const result=await response.json();
    container.setAttribute("data-id",result.task._id);
    console.log(result.message)
}
async function updateDatabase(value,container,checked=false, del=false){
    const id=container.getAttribute("data-id");
    if(!del){
        const response=await fetch(`/todo/${id}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({value: value, isChecked:checked})
        });
        const result=await response.json();
        console.log(result.message);
    }
    else{
        const response=await fetch(`/todo/${id}`,{
            method: "DELETE"
        });
        const result=await response.json();
        console.log(result.message);
    }
}
htmlReader();
loadTasks();
//more things to add:
//1. better mobile spacing using @media for max-width 600px
//2. local storage integration using backend
//3. use google fonts

//To-Do List Web App – HTML, CSS, JavaScript
//Built a responsive to-do list with dynamic task creation, status tracking, deletion, inline editing, and localStorage-based persistence.
