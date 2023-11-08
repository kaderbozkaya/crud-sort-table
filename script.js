let arr= [] //create an empty array to add the data
let id=1  //for increase id dynamic 
const form= document.querySelector(".form")

form.addEventListener("submit", function(e){
    e.preventDefault() //to prevent page reloading or redirection

    //get the values entered in the form
    const firstname= document.querySelector("#firstname").value
    const lastname= document.querySelector("#lastname").value
    const age= document.querySelector("#age").value
    const email= document.querySelector("#email").value
    
    //appends the received values to the object

    let obj= {
        id: id,
        firstname: "",
        lastname: "",
        age: 0,
        email: ""
    }

    obj.firstname=firstname
    obj.lastname=lastname
    obj.age=age
    obj.email=email
    id++ //increase id
    
    arr=[...arr, obj] //add objects to the array

    showData()
//reset the form
    document.querySelector('#id').value=""
    document.querySelector("#firstname").value=""
    document.querySelector("#lastname").value=""
    document.querySelector("#age").value=""
    document.querySelector("#email").value=""
})

//insert arr data into rows with foreach
function showData() {
    const tBody= document.querySelector(".tbody")
    tBody.innerHTML=""
    arr.forEach((item)=> {
        const satir=tBody.insertRow()
        satir.insertCell(0).innerHTML=item.id
        satir.insertCell(1).innerHTML=item.firstname
        satir.insertCell(2).innerHTML=item.lastname
        satir.insertCell(3).innerHTML=item.age
        satir.insertCell(4).innerHTML=item.email
        satir.insertCell(5).innerHTML= ` <i onClick="onEdit(this)" class="fa-regular fa-pen-to-square"></i>Edit
        <i onClick="onDelete(this)" class="fa-regular fa-trash-can"></i> Delete`

        
    })

}
//sort rows by table header(th)

let rank= 'asc' 
function sortTable(header){
    if(header==="firstname"){
        arr.sort((a,b)=>b.firstname.localeCompare(a.firstname))
    }else if(header==="lastname"){
        arr.sort((a,b)=>b.lastname.localeCompare(a.lastname))
    }else {
        arr.sort((a,b)=>b.age-a.age)
    }
    if(rank=== 'asc'){
        arr.reverse()
        rank='desc'
    }else {
        rank='asc'
    }
    showData()
    
}


function onEdit(edit) {
    const row=edit.parentNode.parentNode //td>tr

    /*selects a specific row in an HTML table it extracts the content of individual cells within that row and assigns them to variables*/
    const id=row.cells[0].textContent
    const firstname=row.cells[1].textContent
    const lastname=row.cells[2].textContent
    const age=row.cells[3].textContent
    const email=row.cells[4].textContent

    //select form fields by their IDs and assigns the values from the extracted table cells to these form fields
    document.querySelector('#id').value=id
    document.querySelector('#firstname').value=firstname
    document.querySelector('#lastname').value=lastname
    document.querySelector('#age').value=age
    document.querySelector('#email').value=email

    const saveBtn=document.querySelector('.save')
    saveBtn.style.display= 'none'
    const updateBtn=document.querySelector('.update')
    updateBtn.style.display='block'


    updateBtn.onclick=function() {
        row.cells[1].textContent=document.querySelector('#firstname').value
        row.cells[2].textContent=document.querySelector('#lastname').value
        row.cells[3].textContent=document.querySelector('#age').value
        row.cells[4].textContent=document.querySelector('#email').value

        document.getElementById('id').value= ""
        document.getElementById('firstname').value=""
        document.getElementById('lastname').value=""
        document.getElementById('age').value=""
        document.getElementById('email').value=""

        saveBtn.style.display="block"
        updateBtn.style.display="none"
    }
    
}

/*if a matching element is found in the arr array (index is not -1) this code removes that element from the array using splice */
function onDelete(del) {
    const row=del.parentNode.parentNode
    const id=row.cells[0].textContent
    row.remove()

    const index=arr.findIndex(item=> item.id==id)
    if(index !==-1){ 
        arr.splice(index,1) 
    }

}
