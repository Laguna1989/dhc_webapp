
//////////////////////////
//parse json file with resource data
//////////////////////////

var request = new XMLHttpRequest();
request.open("GET", "resources.json", false);
request.send(null)
var resources = JSON.parse(request.responseText);

for (var i in resources.resources)
{
   newElement(resources.resources[i]);
}
//////////////////////////
//parse json file for alarms
//////////////////////////

// var request = new XMLHttpRequest();
// request.open("GET", "http://192.168.4.15:8085/alarms", false);
// request.send(null)
// var alarms = JSON.parse(request.responseText);



/////////////////////////////////////////
// get canvas and draw an image
/////////////////////////////////////////
var c = document.getElementById("mapCanvas");
var ctx = c.getContext("2d");

var img = new Image();
img.src = "map2.png"; // can also be a remote URL e.g. http://
img.onload = function() 
{
    ctx.drawImage(img,0,0);
};  // can be redrawn later, but loading has to be complete first




// Create a new list item when clicking on the "Add" button
function newElement(resource) 
{
    var tr = document.createElement("tr");
    tr.setAttribute("myID", resource.id);
    
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(resource.type));
    tr.appendChild(td);

    td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(resource.name));
    tr.appendChild(td2);


    document.getElementById("resourceTable").appendChild(tr);

}

//////////////////////////////
// clicking the table
//////////////////////////////
var table = document.getElementById("resourceTable");
if (table != null) 
{
    
    for (var i = 0; i < table.rows.length; i++) 
    {
        table.rows[i].onclick = function () 
        {
            var myID = this.getAttribute("myID") ;
            updateTableSelection(myID);
        };
    }
}


/////////////////////////////////////////
// load json mock positions
/////////////////////////////////////////
// TODO
function getPositionByID(id)
{
    if (id == 0)
    {
        // TODO get position data
        return [5,5];
    }
    else
    {
        return [25,25];
    }
}

function updateTableSelection(id) 
{
    alert(id);
    ctx.clearRect(0,0,800,600);
    ctx.drawImage(img,0,0);
    var pos = getPositionByID(id);
    ctx.fillRect(pos[0], pos[1], 20, 20);
}