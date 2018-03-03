
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


var alarms;
function getAlarmsForID(id)
{
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8085/alarms?wristId=" + id, false);
    request.send(null);
    alarms = JSON.parse(request.responseText);
}

getAlarmsForID("wrist1Id");
for (var i in alarms)
{
    pushAlarmToList(alarms[i]);
}

function pushAlarmToList(alarm)
{
    var tr = document.createElement("tr");
    tr.setAttribute("myID", alarm.id);
    
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(alarm.receiverWristId))
    tr.appendChild(td);

    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(alarm.creatorWristId));
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(" "));
    tr.appendChild(td3);

    var td4 = document.createElement("td");
    td4.appendChild(document.createTextNode(alarm.message));
    tr.appendChild(td4);

    var td5 = document.createElement("td");
    td5.appendChild(document.createTextNode(alarm.timeWhenShow));
    tr.appendChild(td5);

    document.getElementById("alarmTable").appendChild(tr);

}


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


///////////////////////////////////////////////////////////////
// Create New Alarm
///////////////////////////////////////////////////////////////
var addAppointmentFrm = document.getElementById('addAppointmentFrm');
function addAppointment () 
{
  var data = new FormData(addAppointmentFrm)
  var xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:8085/alarms', true)
  xhr.onreadystatechange = function (aEvt) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("Data has been added");
    }
  }
  xhr.send(data)
}

function overlayOn() {
    document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
    document.getElementById("overlay").style.display = "none";
}

///////////////////////////////////////////////////////////////
// Create a new list item when clicking on the "Add" button
///////////////////////////////////////////////////////////////
function newElement(resource) 
{
    var tr = document.createElement("tr");
    tr.setAttribute("myID", resource.id);
    
    var td = document.createElement("td");
    var tdi = document.createElement("img");

    if (resource.type == "device")
        tdi.setAttribute("src", "icons/icon_device.png");
    else if (resource.type == "patient")
        tdi.setAttribute("src", "icons/icon_patient.png");
    else if (resource.type == "doctor")
        tdi.setAttribute("src", "icons/icon_doctor.png");
    tdi.setAttribute("width", "34");
    tdi.setAttribute('alt', 'na');
    tdi.setAttribute('style', 'padding: 0px 0px 0px 0px;');
    td.appendChild(tdi);
    td.setAttribute('style', 'padding: 4px 0px 0px 60px;');
    // td.appendChild(document.createTextNode(resource.type));
    
    tr.appendChild(td);

    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(resource.name));
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    var str = "";
    // alert(resource.rooms);
    for (var i in resource.rooms)
    {
        var r = resource.rooms[i];
        str += " " +  r;
    }
    
    td3.appendChild(document.createTextNode(str));
    tr.appendChild(td3);



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
request = new XMLHttpRequest();
request.open("GET", "mockpositions.json", false);
request.send(null)
var mocks = JSON.parse(request.responseText);


function getPositionByID(id)
{
    if (id == 0)
    {
        // TODO get position data
        return [5,5];
    }
    else
    {
        if (mocks != null)
        {
            return [mocks.pos[id].x, mocks.pos[id].y];
        }
        return [25,25];
    }
}

function updateTableSelection(id) 
{

    ctx.clearRect(0,0,800,600);
    ctx.drawImage(img,0,0);
    var pos = getPositionByID(id);
    ctx.fillStyle="#FF0000";
    ctx.fillRect(pos[0], pos[1], 20, 20);
    ctx.fillStyle="#000000";
}


////////////////////////////////////////
// sort Resource table code  copied from https://www.w3schools.com/howto/howto_js_sort_table.asp
////////////////////////////////////////
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("resourceTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc"; 
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++; 
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
////////////////////////////////////////
// sort Alarm table code  copied from https://www.w3schools.com/howto/howto_js_sort_table.asp
////////////////////////////////////////
function sortTable2(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("alarmTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc"; 
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++; 
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

////////////////////////////////////
// Filter Resources Table code
////////////////////////////////////
  function filterResources() 
  {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("filterInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("resourceTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) 
    {
        var hide =true;
        td0 = tr[i].getElementsByTagName("td")[0];
        td1 = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];

        if (td0 && td1 && td2) 
        {
            if (td0.innerHTML.toUpperCase().indexOf(filter) > -1 || td1.innerHTML.toUpperCase().indexOf(filter) > -1 || td2.innerHTML.toUpperCase().indexOf(filter) > -1) 
            {
                tr[i].style.display = "";    
            } 
            else
            {
                tr[i].style.display = "none";
            }
        } 
    }
}

////////////////////////////////////
// Filter Alarms code
////////////////////////////////////
function filterAlarms() 
{
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("alarmFilter");
  filter = input.value.toUpperCase();
  table = document.getElementById("alarmTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) 
  {
      var hide =true;
      td0 = tr[i].getElementsByTagName("td")[0];
      td1 = tr[i].getElementsByTagName("td")[1];
      td2 = tr[i].getElementsByTagName("td")[2];
      td3 = tr[i].getElementsByTagName("td")[3];

      if (td0 && td1 && td2 && td3) 
      {
          if (  td0.innerHTML.toUpperCase().indexOf(filter) > -1 || td1.innerHTML.toUpperCase().indexOf(filter) > -1|| 
                td2.innerHTML.toUpperCase().indexOf(filter) > -1 || td3.innerHTML.toUpperCase().indexOf(filter) > -1) 
          {
              tr[i].style.display = "";    
          } 
          else
          {
              tr[i].style.display = "none";
          }
      } 
  }
}