
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
img.src = "map.png"; // can also be a remote URL e.g. http://
img.onload = function() {
   ctx.drawImage(img,0,0);
};







// Create a new list item when clicking on the "Add" button
function newElement(resource) 
{
    var tr = document.createElement("tr");
    
    
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(resource.type));
    tr.appendChild(td);

    td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(resource.name));
    tr.appendChild(td2);


    document.getElementById("resourceTable").appendChild(tr);

    
    for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
    }
}