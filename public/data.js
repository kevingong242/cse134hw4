//Fake issue database
var data = [];
/*
var data = 
    [{
        id: 1,
        name: 'Old tags',
        type: 'marquee',
        description: 'Marquee tags are no longer supported as developers prefer that animation be apart of CSS rather than HTML. Applet tags are also outdated but still work on Firefox and earlier IE version. Instead of using the applet tags, it is recommended to use embed or object tags'
    },{
        id: 2,
        name: 'HTML5',
        type: 'Bdi tags',
        description: 'Gives a warning about not being supported in all browsers and consider using a polyfill. To fix this warning, an idea could be to include a CDN script and run a polyfill'
    }, {
        id: 3,
        name: 'MATHML',
        type: 'Math tag',
        description: 'Math is not supported by a lot of different browser versions, so it appears as plain text. An alternatice to using math tags could be to use JavaScript to perform math operations'   
    },
    {
        id: 4,
        name: 'CSS tags',
        type: 'nested elements',
        description: 'Error thrown when trying to work on a nested elements style within another element in css'
    },
    {
        id: 5,
        name: 'More tags',
        type: 'More types',
        description: 'More description'
    },
    {
        id: 6,
        name: 'More tags',
        type: 'More types',
        description: 'More description'
    }];
*/


//REST functions
function testGet(){
    var xhr = new XMLHttpRequest();
    if(xhr){
        xhr.open("GET", "http://localhost:3000/test", true);
        xhr.onreadystatechange = function() {handleResponse(xhr);};
        xhr.send(null);
    }
}

function handleResponse(xhr){
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = xhr.responseText;
        var jsonResponse = JSON.parse(data);
        console.log(jsonResponse[0].name);
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
        id: data.length,
        name: document.getElementById('addName').value,
        type: document.getElementById('addType').value,
        description: document.getElementById('addDescription').value
    };
    data.push(issue);
    var table = document.getElementById('formTable');
    var node = document.createElement('tr');
    node.innerHTML=`
            <tr>
            <td>${issue.id}</td>
            <td>${issue.name}</td>
            <td>${issue.type}</td>
            <td>${issue.description}</td>
            <td id="resolve"><i class="fas fa-times-circle" onclick="resolveIssue()"></i></td>
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
    var count = 0;
    for(x in data){
        if(x.name == id){
            break;
        }
        count++;
    }
    
    document.getElementById('editHolder').children[1].setAttribute('id', id);
    document.getElementById('editName').value = data[id].name; 
    document.getElementById('editType').value = data[id].type;
    document.getElementById('editDescription').value = data[id].description;
}

function editSubmit(){
    var form = document.querySelectorAll('form')[1];
    console.log(form);
    var count = form.attributes[0].value;
    var row = document.getElementById(count);
    var name = document.getElementById('editName').value;
    var type = document.getElementById('editType').value;
    var description = document.getElementById('editDescription').value;
    
    var count = 0;
    for(x in data){
        if(x.name == name){
            break;
        }
        count++;
    }
    if(name != ""){
        row.children[1].textContent = name;
    }
    if(type != ""){
        row.children[2].textContent = type;
    }
    if(description != ""){
        row.children[3].textContent = description;
    }
    data[id].name = name;
    data[id].type = type;
    data[id].description = description;
    document.getElementById('editHolder').style.visibility = "hidden";
    
}

function deleteIssue(id){
    var row = document.getElementById(id);
    var parent = document.getElementById('formTable');
    var test = document.querySelectorAll('tr');
    data.splice(id, 1);
    parent.removeChild(row);
}

function resolveIssue(){
    var block = document.getElementById('resolve');
    var name = block.childNodes[0].className;
    if(name == "fas fa-times-circle"){
        block.childNodes[0].className = "fas fa-check-circle";
    }else{
        block.childNodes[0].className = "fas fa-times-circle"
    }
}