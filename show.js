function showConnected(){
   
   BshowMinting=false;
   BshowWrongNetwork=false;
   document.getElementById("erroreth").style.display = "none";
  
}
var BshowWrongNetwork=false;
function showWrongNetwork(){
          BshowMinting=false;
          BshowWrongNetwork=true;
          document.getElementById("erroreth").style.display = "table";
}
var BshowMinting=false;

function showMinting(){
  BshowMinting=true;
  BshowWrongNetwork=false;
   document.getElementById("mintId").style.display = "none";
     document.getElementById("mintingId").style.display = "";
        document.getElementById("maxtext").style.display = "none";
     document.getElementById("pausedId").style.display = "none";
  
}

function showStopMint(){
     document.getElementById("pausedId").style.display = "";
   document.getElementById("mintId").style.display = "none";
     document.getElementById("mintingId").style.display = "none";
        document.getElementById("maxtext").style.display = "none";
  
}