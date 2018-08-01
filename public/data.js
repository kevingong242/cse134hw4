//Fake issue database
var data = [];

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
        xhr.open("GET", "http://localhost:3000/issue", true);
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
        xhr.send(payload);
    }
}

function sendDelete(url){
    var xhr = new XMLHttpRequest();
    if(xhr){
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {handleResponse(xhr);};
        xhr.send(null);
    }
}

function handleResponse(xhr){
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = xhr.responseText;
        var output = document.getElementById('testArea');
        output.innerHTML = data;
        //var jsonResponse = JSON.parse(data);
        //console.log(jsonResponse[0]);
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
    const issue = {
        id: data.length+1,
        name: document.getElementById('addName').value,
        type: document.getElementById('addType').value,
        description: document.getElementById('addDescription').value,
        resolved: false
    };
    sendPost(issue);
    data.push(issue);
    var table = document.getElementById('formTable');
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
    //console.log(node);
    document.getElementById('addHolder').style.visibility = "hidden";
}

function editIssue(id){
    document.getElementById('editHolder').style.visibility = "visible";
    var row = document.getElementById(id);
    document.getElementById('editHolder').children[1].setAttribute('id', id);
    
    
    /*
    document.getElementById('editName').value = data[id-1].name; 
    document.getElementById('editType').value = data[id-1].type;
    document.getElementById('editDescription').value = data[id-1].description;
    */
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
    var url = "http://localhost:3000/issue/" + count;
    sendPut(issue, url);
    if(name != ""){
        row.children[1].textContent = name;
    }
    if(type != ""){
        row.children[2].textContent = type;
    }
    if(description != ""){
        row.children[3].textContent = description;
    }
    /*
    data[id].name = name;
    data[id].type = type;
    data[id].description = description;
    */
    document.getElementById('editHolder').style.visibility = "hidden";
    
}

function deleteIssue(id){
    var row = document.getElementById(id);
    var parent = document.getElementById('formTable');
    var test = document.querySelectorAll('tr');
    data.splice(id, 1);
    var url = "http://localhost:3000/issue/" + id;
    sendDelete(url);
    parent.removeChild(row);
}

function resolveIssue(resolved){
    var block = document.getElementById('resolve');
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
    var name = block.childNodes[0].className;
    if(name == "fas fa-times-circle"){
        block.childNodes[0].className = "fas fa-check-circle";
    }else{
        block.childNodes[0].className = "fas fa-times-circle"
    }
}