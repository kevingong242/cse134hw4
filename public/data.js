const url = "http://localhost:3000/issue/";

window.addEventListener('DOMContentLoaded', function(){sendGet();});

//REST functions
function createXHR(){
    try {return new XMLHttpRequest(); } catch (e) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
        
    return null;
}

function sendGet(){
    var xhr = createXHR();
    if(xhr){
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {handleResponse(xhr);};
        xhr.send(null);
    }
}

function sendPost(issue){
    var payload = "name=" + issue.name + "&type=" + issue.type + "&description=" + issue.description + "&resolved=" + issue.resolved;
    var xhr = new XMLHttpRequest();
    if(xhr){
        xhr.open("POST", "http://localhost:3000/issue", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){handleResponse(xhr);};
        xhr.onload = function(){
            sendGet();
        };
        xhr.send(payload);
    }
}

function sendPut(issue, url){
    var payload = "name=" + issue.name + "&type=" + issue.type + "&description=" + issue.description + "&resolved=" + issue.resolved;
    var xhr = new XMLHttpRequest();
    if(xhr){
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {handleResponse(xhr);};
        xhr.onload = function() {
          sendGet();  
        };
        xhr.send(payload);
    }
}

function sendDelete(url){
    var xhr = new XMLHttpRequest();
    if(xhr){
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {handleResponse(xhr);};
        xhr.onload = function(){
            sendGet();
        }
        xhr.send(null);
    }
}

function handleResponse(xhr){
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = xhr.responseText;
        var jsonData = JSON.parse(data);
        let finalTable = `
        <table id="formTable" border="1">
            <tr id="headerTitle">
                <th>Issue Id</th>
                <th>Issue Name</th>
                <th>Issue Type</th>
                <th>Issue Description</th>
                <th>Resolved</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
        `;
        for(var x in jsonData){
            finalTable +=`
            <tr id="${jsonData[x].id}">
            <td>${jsonData[x].id}</td>
            <td>${jsonData[x].name}</td>
            <td>${jsonData[x].type}</td>
            <td>${jsonData[x].description}</td>
            <td><i class="fas fa-times-circle" onclick="resolveIssue(${jsonData[x].id}, ${jsonData[x].resolved})"></i></td>
            <td class="deleteCell" onclick="deleteIssue(${jsonData[x].id})"></td>
            <td class="editCell" onclick="editIssue(${jsonData[x].id})"></td>
            </tr>
            `;
        }
        finalTable += "</table>";
        document.getElementById('tableHolder').innerHTML = finalTable;
        
    }
}


//CRUD functions
function addIssue(){
    document.getElementById('addHolder').style.visibility = "visible";
    document.getElementById('addName').value = "";
    document.getElementById('addType').value = "";
    document.getElementById('addDescription').value = "";
}

function addSubmit(){
    var table = document.getElementById('formTable');
    var tableSize = table.children.length;
    const issue = {
        id: tableSize,
        name: document.getElementById('addName').value,
        type: document.getElementById('addType').value,
        description: document.getElementById('addDescription').value,
        resolved: false
    };
    sendPost(issue);
    document.getElementById('addHolder').style.visibility = "hidden";
}

function editIssue(id){
    document.getElementById('editHolder').style.visibility = "visible";
    var row = document.getElementById(id);
    document.getElementById('editHolder').children[1].setAttribute('id', id);
}

function editSubmit(){
    var form = document.querySelectorAll('form')[1];
    var count = form.id;
    var row = document.getElementById(count);
    var name = document.getElementById('editName').value;
    var type = document.getElementById('editType').value;
    var description = document.getElementById('editDescription').value;
    const issue = {
        name: name,
        type: type,
        description: description
    };
    sendPut(issue, url + count);
    row.children[1].textContent = name;
    row.children[2].textContent = type;
    row.children[3].textContent = description;
    document.getElementById('editHolder').style.visibility = "hidden";
    
}

function deleteIssue(id){
    var parent = document.querySelector('tbody');
    var row;
    for(var x in parent.children){
        if(parent.children[x].id == id){
            row = parent.children[x];
        }
    }
    parent.removeChild(row);
    sendDelete(url + id);
}

function resolveIssue(id, resolved){
    var block = document.getElementsByClassName('fas');
    var name = block[id-1].className;
    if(name == "fas fa-times-circle"){
        block[id-1].className = "fas fa-check-circle";
    }else{
        block[id-1].className = "fas fa-times-circle"
    }
}