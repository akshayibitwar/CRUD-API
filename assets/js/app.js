let cl = console.log;

const stdform = document.getElementById("stdAdd");

const stdContainer = document.getElementById("stdContainer");

const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");

const updatestd = document.getElementById("updatestd");
const submitbtn = document.getElementById("submitbtn");

const  generateUuid = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  
let  stdArry = [];

stdArry = JSON.parse(localStorage.getItem("stdData")) ?? [];

const onEdit = (ele) =>{
    cl(ele.closest('tr').getAttribute('id'))
    let editId = ele.closest('tr').getAttribute('id');
    localStorage.setItem('editId', editId);
    let editObj = stdArry.find(std => std.id === editId)
    cl(editObj);
    fnameControl.value = editObj.fname;
    lnameControl.value = editObj.lname;
    emailControl.value = editObj.email;
    contactControl.value = editObj.contact;

    submitbtn?.classList.add('d-none');
    updatestd?.classList.remove('d-none');
}

const onDelete = (ele) =>{
   let deleteId = ele.closest('tr').id;
   //cl(deleteId);
  let deleteIndex = stdArry.findIndex(std => std.id === deleteId);
  //cl(deleteIndex);
  stdArry.splice(deleteIndex, 1);
  localStorage.setItem("stdData", JSON.stringify(stdArry));
  templating(stdArry);
}

const templating = (arr) => {
    let result = '';
    arr.forEach((std, i) => {
        result += `
            <tr id="${std.id}">
                <td>${1 + i}</td>
                <td>${std.fname}</td>
                <td>${std.lname}</td>
                <td>${std.email}</td>
                <td>${std.contact}</td>
                <td>
                <button class="btn btn-primary" onClick="onEdit(this)">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                </td>
                <td>
                <button class="btn btn-danger" onClick="onDelete(this)">
                <i class="fa-solid fa-trash-can"></i>
                </button>
                </td>
            </tr>`
        });
        stdContainer.innerHTML = result;
}

// if(localStorage.getItem("stdData")){
//     stdArry = JSON.parse(localStorage.getItem("stdData"));
// }
templating(stdArry);

const onstdAdd = (eve) =>{
    eve.preventDefault();
    let stdObj = {
        fname : fnameControl.value,
        lname : lnameControl.value,
        email : emailControl.value,
        contact : contactControl.value,
        id : generateUuid()
    }
        eve.target.reset();
        stdArry.push(stdObj);
        localStorage.setItem("stdData", JSON.stringify(stdArry));
        templating(stdArry);
}


const onStdupdate = () =>{
    let updatestd = localStorage.getItem("editId");
    //cl(`update... ${updatestd}`);
   
    stdArry.forEach(obj =>{
        if(obj.id === updatestd){
            obj.fname = fnameControl.value,
            obj.lname = lnameControl.value,
            obj.email = emailControl.value,
            obj.contact = contactControl.value
        }
       })
       localStorage.setItem("stdData", JSON.stringify(stdArry));
       templating(stdArry);
       stdform.reset();
}

stdform.addEventListener("submit", onstdAdd);
updatestd?.addEventListener("click", onStdupdate)

