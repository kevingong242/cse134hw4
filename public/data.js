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
        console.log("Recreating the whole table");
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
        //var table = document.getElementById('formTable');
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
            //node.setAttribute('id', jsonData[x].id);
            //table.appendChild(node);
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
    /*
    var node = document.createElement('tr');
    node.innerHTML=`
            <tr>
            <td>${issue.id}</td>
            <td>${issue.name}</td>
            <td>${issue.type}</td>
            <td>${issue.description}</td>
            <td id="resolve"><i class="fas fa-times-circle" onclick="resolveIssue(${issue.resolved})"></i></td>
            <td class="deleteCell" onclick="deleteIssue(${issue.id})"></td>
            <td class="editCell" onclick="editIssue(${issue.id})"></td>
            </tr>
    `;
    node.setAttribute('id', issue.id);
    table.appendChild(node);
    */
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
    if(name != ""){
        row.children[1].textContent = name;
    }
    if(type != ""){
        row.children[2].textContent = type;
    }
    if(description != ""){
        row.children[3].textContent = description;
    }
    document.getElementById('editHolder').style.visibility = "hidden";
    
}

function deleteIssue(id){
    var parent = document.querySelector('tbody');
    var row;
    //console.log(document.querySelector('tbody').children);
    for(var x in parent.children){
        //console.log(parent.children[x].id);
        if(parent.children[x].id == id){
            row = parent.children[x];
        }
    }
    //console.log("ID: " + id);
    parent.removeChild(row);
    //parent.deleteRow(id);
    sendDelete(url + id);
}

function resolveIssue(id, resolved){
    var block = document.getElementsByClassName('fas');
    /*
    var count = block.parentElement.id;
    var url = "http://localhost:3000/issue/" + count;
    if(!resolved){
        block.childNodes[0].className = "fas fa-check-circle";
        //resolved = true;
    }else{
        block.childNodes[0].className = "fas fa-times-circle";
        //issue.resolved = false;
    }
    //sendPut(issue, url);
    */
    console.log(block[id]);
    var name = block[id-1].className;
    if(name == "fas fa-times-circle"){
        block[id-1].className = "fas fa-check-circle";
    }else{
        block[id-1].className = "fas fa-times-circle"
    }
}