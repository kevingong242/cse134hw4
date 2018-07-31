//Fake issue database
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
    }];

function addIssue(){
    var table = document.getElementById('formTable');
    var node = document.createElement('tr');
    var count = table.childElementCount - 1;
    var classColor = document.createAttribute('class');
    console.log("Count: " + count + "| Length: " + data.length);
    if(count < data.length){
        node.innerHTML=`
            <tr>
            <td>${data[count].id}</td>
            <td>${data[count].name}</td>
            <td>${data[count].type}</td>
            <td>${data[count].description}</td>
            <td><i class="fas fa-times-circle"></i></td>
            </tr>
        `;
        if(count % 2){
            node.setAttribute('class', 'odd');
        }
        table.appendChild(node);
    }else{
        var msg = `<p>There are no more issues in the database to show</p>`;
        var msgHolder = document.getElementById('msgHolder');
        msgHolder.innerHTML = msg;
    }
}

function deleteIssue(){
    
}