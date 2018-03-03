// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}


//////////////////////////
//parse json file with resource data
//////////////////////////

var request = new XMLHttpRequest();
request.open("GET", "resources.json", false);
request.send(null)
var resources = JSON.parse(request.responseText);



for (var i in resources.resources)
{
    //alert(resources.resources[i]);
   newElement(resources.resources[i]);
}



// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}




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