var username=""
var UserNameMenupointer;
var text;
var enterName;
function startUserNameMenu(){
    window.addEventListener("keydown",UserNameMenuControls);
    text=["Enter Name:","Enter Game"]
    var UserNameMenupointer=0;
}
function updateUserNameMenu(){
    /* 
    Creates an interval in which clear and draw are called
    */
    UserNameMenuDraw();

}
function UserNamestringGen(i){
    var str=""
    if(i==0){
	if(username.length>0){
        var str="Enter Name: "+username;
	}else{
	var str ="Enter Name:"
	}
    }else if(i==1){
        if(username.length>0){
	  var str="Enter Game"
	}
    }
    return str;
}
function UserNameMenuDraw(){
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    /* 
    Draws the text to the screen
    */
    canvasContext.textAlign = "center";
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillStyle="#888888";
    canvasContext.font = "20px Silkscreen";
    for(i=0;i<text.length;i++){
        canvasContext.fillText(UserNamestringGen(i),canvas.width/2,40*i+100);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(UserNamestringGen(0+UserNameMenupointer),canvas.width/2,40*UserNameMenupointer+100);
}
function UserNameMenuControls(e){
        keycode=e.keyCode;
        if(enterName){
        switch(e.keyCode){
            case 13:
                enterName=false;
                break;
            case 8:
                username=username.slice(0,username.length-1);
                break;
            default:
                letter = String.fromCharCode(e.keyCode)
                username+=letter;
        }
    }else{
        switch(e.keyCode){
        case 87:
            if(UserNameMenupointer>0){
                UserNameMenupointer-=1;
            }else{
                UserNameMenupointer=0;
            }
            break;
        case 83:
            if(UserNameMenupointer<text.length-1){
                UserNameMenupointer+=1;
            }else{
                UserNameMenupointer=text.length-1;
            }
            break;
        case 13:
            if(UserNameMenupointer==0){
                enterName=true;
            }
            if(UserNameMenupointer==1){
                console.log("Welcome to game")
                endUserNameMenu()
            }
            break;
        }

    }
}
function endUserNameMenu(){
  window.removeEventListener("keydown",UserNameMenuControls);
  createLobbyMenu = false;
  gameState = "main_menu";
}