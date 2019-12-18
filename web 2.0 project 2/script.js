var num_of_char=0;
var txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var vis=[];
var DBDiv=document.getElementById('5');
DBDiv.hidden=true;
var eventtypes=["load","unload","generate"];
var uplode = {
    EventType: '',
    EventTarget: '',
    EventTime: new Date()
}
window.addEventListener("load",function(e) {
    var temp=JSON.parse(localStorage.getItem("load")||"[]");
    uplode.EventType='load';
    uplode.EventTarget=e.target;
    uplode.EventTime=new Date();
    temp.push(uplode);
    localStorage.setItem("load",JSON.stringify(temp));
});
window.addEventListener("unload",function(e) {
    var temp=JSON.parse(localStorage.getItem("unload")||"[]");
    uplode.EventType='unload';
    uplode.EventTarget=e.target;
    uplode.EventTime=new Date();
    temp.push(uplode);
    localStorage.setItem("unload",JSON.stringify(temp));
});
// timer for clearing the local storage
setInterval( function () {
    for(var i=0;i<3;i++){
        var eventtyp=eventtypes[i];
        var temp=JSON.parse(localStorage.getItem(eventtyp)||"[]");
      //  console.log("what "+ temp);
        for(var j=0;j<temp.length;j++){
            console.log(temp[j]);
            var Item = { 
                "EventType": temp[j].EventType,
                "EventTarget": JSON.stringify(temp[j].EventTarget),
                "EventTime": temp[j].EventTime 
            };
        $.ajax({
            "type":"POST",
            "url":"ajaxpost.php",
            "data":{  "data":JSON.stringify(Item)},
            "success":function(response){
                console.log("good boy, pushing data into dp");
            }
        });
    }
    }
    localStorage.clear();
},5000);
function Display_Letters(){
    var txtnode=document.getElementById('1');
    var  txtval=txtnode.value;
    if(txtval==""){
        alert("please enter a number");
    }else{
        num_of_char=parseInt(txtval);
        if(num_of_char<1||num_of_char>26){
            alert("please enter a number between 1 and 26");
        }else{
            // first we clear the div from previous query
            var Divbutton=document.getElementById('2');
            var LastChild=Divbutton.lastElementChild;
            while(LastChild){
                Divbutton.removeChild(LastChild);
                LastChild=Divbutton.lastElementChild;
            }
            // image div
            var Divimage=document.getElementById('3');
            LastChild=Divimage.lastElementChild;
            while(LastChild){
                Divimage.removeChild(LastChild);
                LastChild=Divimage.lastElementChild;
            }
            // then we intialize out vis array
            // we use it to make sure we don't use the same char twice
            for(var i=0;i<26;i++)
                vis[i]=0;
            
            for(var i=0;i<num_of_char;i++){
                var index=GetIndex(); // first we get an index randomlly
                vis[index]=1; // mark it visitted
                AddToDiv(txt[index]);// we add it to the div
            }
            
        }
    }
}
// adding the button ch to the div
function AddToDiv(ch){
    var DivNode=document.getElementById('2');
    var NewButton=document.createElement("button");
    var NewText=document.createTextNode(" "+ch);
    NewButton.appendChild(NewText);
     // store the clicking in the local storage
    NewButton.addEventListener("click",function(e){
        Display_Image(ch);
        var temp=JSON.parse(localStorage.getItem("LetterClick")||"[]");
        uplode.EventType='LetterClick';
        uplode.EventTarget=e.target.textContent;
        uplode.EventTime=new Date();
        temp.push(uplode);
        localStorage.setItem("LetterClick",JSON.stringify(temp));
    });
    DivNode.appendChild(NewButton);
}
// displaying the image of the letter ch
function Display_Image(ch){
    // first we remove old image
    var Divimage=document.getElementById('3');
    LastChild=Divimage.lastElementChild;
    while(LastChild){
        Divimage.removeChild(LastChild);
        LastChild=Divimage.lastElementChild;
    } 
    var NewImage=document.createElement("img");
    var SourceText='images\\'+ch+'.jpg';
    NewImage.setAttribute("src",SourceText);
    Divimage.appendChild(NewImage);
}
// check that we get a new index
function GetIndex(){
    var index=getRndInteger();
    while(vis[index])
        index=getRndInteger();
    return index;
}
// return random number between 0 and 25 inclusive
function getRndInteger() {
  return Math.floor(Math.random() * (26) );
}
var Generate_Button=document.getElementById("4");
Generate_Button.addEventListener("click",function(e){
   Display_Letters();
     var temp=JSON.parse(localStorage.getItem("generate")||"[]");
    uplode.EventType='generate';
    uplode.EventTarget=e.target;
    uplode.EventTime=new Date();
    temp.push(uplode);
    localStorage.setItem("generate",JSON.stringify(temp));
});
var Log_Button=document.getElementById("log");
    Log_Button.addEventListener("click",function(e){
    DBDiv.innerHTML="";
    console.clear();
    $.ajax({
        "type":"GET",
        "url":"ajaxget.php",
        "data":{"data":""},
        "success":function(response){
            var $data=JSON.parse(response);
            //console.log($data);
             for(var i=0;i<$data.length;i++){
             console.log("data type "+$data[i]["EventType"]+"\n");
             console.log("data date "+$data[i]["EvenDate"]+"\n");
             console.log("data target "+$data[i]["EvenTarget"]+"\n");
             }
        }
    });
});
