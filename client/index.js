//Global Variable
const data=[];
//TableBody
const tBody=document.querySelector('table tbody');
//Inserting Variables
const insertRow=document.querySelector('.insertRow');
const iNameInput=document.querySelector('.I_NameInput');
const iAddressInput=document.querySelector('.I_AddressInput');
const iEmailInput=document.querySelector('.I_EmailInput');
//Updating Variables
const updateRow=document.querySelector('#update-row');
const updateButton=document.querySelector('#update-row-btn');
const updateName=document.querySelector('#update-name-input');
const updateAddress=document.querySelector('#update-address-input');
const updateEmail=document.querySelector('#update-email-input');
//Search Variables
const searchButton=document.querySelector('#search-btn');
const searchInput=document.querySelector('#search-input');

document.addEventListener('DOMContentLoaded',function(){
    fetch('http://127.0.0.1:8000/getAll')
        .then(response=>response.json())
        .then(data=>loadHTMLTable(data['data']));
    }
)
//EDIT/UPDATE button's function
document.querySelector('table tbody').addEventListener('click',function(event){
    if(event.target.className === 'delete-row-btn'){
        console.log(event.target.dataset.id);
        deleteRowById(event.target.dataset.id); 
    }
    if(event.target.className === 'edit-row-btn'){
        handleEditRow(event.target.dataset.id);
    }
})
//loading all records into database on screen loading
function loadHTMLTable(data){
    console.log(data);
    if(data.length === 0){
        tBody.innerHTML=`<tr><td colspan="6" style="text-align:center" class="no_data">No Data</td></tr>`;  
        return;
    }
    else{
        let tableHTML=``;
        data.forEach(element => {
            tableHTML+=`<tr>`
            tableHTML+=`<td>${element._id}</td>`;
            tableHTML+=`<td>${element.name}</td>`;
            tableHTML+=`<td>${element.address}</td>`;
            tableHTML+=`<td>${element.email}</td>`;
            tableHTML+=`<td><button class='delete-row-btn' data-id=${element._id}>Delete</button></td>`;
            tableHTML+=`<td><button class='edit-row-btn' data-id=${element._id}>Edit</button></td>`;
            tableHTML+=`<tr>`
        });
        tBody.innerHTML=tableHTML;
    }
}
//inserting record into table
insertRow.addEventListener('click',()=>{
    const name=iNameInput.value;
    const address=iAddressInput.value;
    const email=iEmailInput.value;
    iNameInput.value="";
    iAddressInput.value="";
    iEmailInput.value="";
    fetch('http://127.0.0.1:8000/insertRecord',{
        headers:{
            'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({
            name:name,
            address:address,
            email:email,
        })
    }).then(response=>response.json())
    .then(data=>insertRowIntoTable(data))
})
function insertRowIntoTable(data){
    console.log(data);
    const isTableData=tBody.querySelector('.no_data');
    let tableHTML ='';

    data.forEach(elem=>{
        tableHTML+='<tr>';
        tableHTML+=`<td>${elem._id}</td>`;
         tableHTML+=`<td>${elem.name}</td>`;
         tableHTML+=`<td>${elem.address}</td>`;
        tableHTML+=`<td>${elem.email}</td>`;
         tableHTML+=`<td><button class='delete-row-btn' data-id=${elem._id}>Delete</button></td>`;
         tableHTML+=`<td><button class='edit-row-btn' data-id=${elem._id}>Edit</button></td>`;
        tableHTML+=`<tr>`
     })
     console.log(tableHTML);

    if(isTableData){
        console.log(isTableData);
        tBody.innerHTML=tableHTML;
    }
    else{
        const newRow=table.insertRow();
        newRow.innerHTML=tableHTML;
    }
}
//deleting records from database
function deleteRowById(id){
    //console.log("hello my name is Aashish Bhandari",id);
    fetch(`http://127.0.0.1:8000/delete/${id}`,{
        method:'DELETE'
    })
        .then(response=>response.json())
        .then(data=>{
            if(data === true)
                location.reload();
        });
}
//handling edits
function handleEditRow(id){
    updateRow.style.display="block";
    updateRow.dataset.id=id;
}
updateButton.addEventListener('click',()=>{
    //console.log(updateName.value,updateAddress.value,updateEmail.value,updateRow.dataset.id);
    fetch('http://127.0.0.1:8000/update',{
        headers:{
            'Content-type':'application/json'
        },
        method:'PATCH',
        body:JSON.stringify({
            name:updateName.value,
            address:updateAddress.value,
            email:updateEmail.value,
            id:updateRow.dataset.id
        })
    })
        .then(response=>response.json())
        .then(data=>{
            if(data === true)
                location.reload();
        })
})

//search button
searchButton.addEventListener('click',()=>{
    fetch(`http://127.0.0.1:8000/search/${searchInput.value}`)
        .then(response=>response.json())
        .then(data=>loadHTMLTable(data['data']))
    searchInput.value='';
})
