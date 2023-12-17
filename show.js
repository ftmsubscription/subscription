function showConnected(){
   try{
   BshowMinting=false;
   BshowWrongNetwork=false;
   document.getElementById("erroreth").style.display = "none";
  }catch (error) {
    console.log(error);
  }
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

function showMyList() {
  console.log("showMyList()")
  $("#my_listed").css("display", "contents");
  $("#listed").css("display", "none");
  $("#my_list_btn").css("background", "gray");
  $("#listed_btn").css("background", "white");
  // refreshMyList();
}

function showListed() {
  $("#my_listed").css("display", "none");
  $("#listed").css("display", "contents");
  $("#my_list_btn").css("background", "white");
  $("#listed_btn").css("background", "gray");
  // refreshListed();
}