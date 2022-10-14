let selectedRow = 1;
function onFormSubmit() {
    let formData = readFormData();
    if (selectedRow == 1)
        insertNewRecord(formData);
    else
        updateRecord(formData);
    resetForm();
}
function readFormData() {
    let formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    const userDateinput = document.getElementById("dob").value;

    const userdate = userDateinput;

    // convert user input value int`o date object
    const birthDate = new Date(userDateinput);
    console.log(" birthDate" + birthDate);

    // get difference from current date;
    const difference = Date.now() - birthDate.getTime();

    const ageDate = new Date(difference);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

    formData["dob"] = calculatedAge;
    formData["dob1"] = userdate;
    formData["gender"] = document.forms[0].elements["gender"].value;
    let hobbieSelected = document.forms[0].elements["hobbies"];
    console.log(hobbieSelected[0].value);
    let hobbieList = [];
    for (let i = 0; i < hobbieSelected.length; i++) {
        if (hobbieSelected[i].checked) {
            hobbieList.push(hobbieSelected[i].value);
        };
        console.log(hobbieSelected[i].checked);
    };
    let skillSelected = document.forms[0].elements.skill.options;
    console.log(document.getElementById("skill").value);
    let skillList = [];
    for (let i = 0; i < skillSelected.length; i++) {
        if (skillSelected[i].selected) {
            skillList.push(skillSelected[i].value);
        }
    }
    formData["skill"] = skillList;
    formData["hobbies"] = hobbieList;
    console.log(formData);
    return formData;
}
function insertNewRecord(data) {
    let table = document.getElementById("dataList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.dob;
    cell2.setAttribute("data-fullDOB", data.dob1);
    //const fullDOB = Document.creatElement("data");
    //  fullDOB.innerHTML =  ""
    console.log(cell2);
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.skill;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.hobbies;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a onClick="onEdit(this)">Edit📝️</a>
                       <a onClick="onDelete(this)"> Delete🗑️</a>`;
}
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("dob").value = "";
    document.forms[0].elements["gender"].value = "";
    skillList = "";
    hobbieList = "";
    document.forms[0].reset();
}
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;

    let fullDOB = document.getElementsByTagName("td")[1].getAttribute("data-fulldob");

    //fullDOB = selectedRow.cells[1].getAttribute("data-fulldob");

    //here  //
    document.forms[0].elements["DOB"].value = fullDOB;
    console.log(fullDOB);
    document.forms[0].elements["gender"].value = selectedRow.cells[2].innerHTML;
    const hobbSelected = selectedRow.cells[4].innerHTML;
    let myHobbies = hobbSelected.split(",");

    const checkList = document.getElementsByName("hobbies");
    console.log(checkList);
    console.log(myHobbies);
    for (let i = 0; i < checkList.length; i++) {
        if (myHobbies.includes(checkList[i].value)) {
            checkList[i].checked = true;
        }
    }
    const skillItemSelected = selectedRow.cells[3].innerHTML;

    let skillList1 = skillItemSelected.split(",");
    // here //
    const selectList = document.getElementById("skill");

    for (let i = 0; i < selectList.length; i++) {
        if (skillList1.includes(selectList[i].value)) {
            selectList[i].selected = true;
        }
    }
    skillList1 = selectedRow.cells[3].innerHTML;
    myHobbies = selectedRow.cells[4].innerHTML;

    document.getElementsByTagName("td")[5].innerHTML = selectedRow.cells[5].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.dob;
    selectedRow.cells[2].innerHTML = formData.gender;
    selectedRow.cells[3].innerHTML = formData.skill;
    selectedRow.cells[4].innerHTML = formData.hobbies;
}
function onDelete(td) {
    row = td.parentElement.parentElement;
    document.getElementById("dataList").deleteRow(row.rowIndex);
    resetForm();
}