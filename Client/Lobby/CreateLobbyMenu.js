/**
 * Creates a menu of settings for creating a new Lobby
 * User can change the number of players and set a password
 *  
*/
var passwordOn;
var password;
var enterPassword;
var rightpointer;
var text;
var pointer;
function startCreateLobbyMenu(){
    CreateLobbyCotrols=window.addEventListener("keydown",createLobbyControls);
    passwordOn=false;
    password="";
    enterPassword=false;
    rightpointer=0;
    pointer=0;
    text=["Create Lobby","Number Of Players :","Password On :","Password :"]
}
function stringGen(i){
    /* 
    Generates the needed lines of text based on i from the draw loop
    */
    var str=""
    if(i==0){
        var str="Create Lobby";
    }
    if(i==1){
        var str="Number Of Players :"+numOfPlayers;
    }else if(i==2){
        var str="Password On:"+passwordOn;
    }
    if(passwordOn==true){
        if(i==3){
        var str="Password : "+password;
            }
        }
    return str;
}
function createLobbyUpdate(){
    /* 
    Creates an interval in which clear and draw are called
    */
    createLobbyDraw();
}
function createLobbyDraw(){
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
        canvasContext.fillText(stringGen(i),canvas.width/2,40*i+100);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(stringGen(pointer),canvas.width/2,40*pointer+100);
}
function createLobbyInfo(){
    var newlobbiesinfo={
        "max_players" :numOfPlayers,
        "pwordOn":passwordOn,
        "password":password
    };
    return newlobbiesinfo;
}
function createLobbyControls(e){
    /*
    Sets the controls for the user and keeps track of pointers 
    */
    keycode=e.keyCode;
    if(enterPassword){
        switch(e.keyCode){
            case 13:
                enterPassword=false;
                break;
            case 8:
                password=password.slice(0,password.length-1);
                break;
            default:
                letter = String.fromCharCode(e.keyCode)
                password+=letter;
        }
    }else{
    switch(e.keyCode){
        case 87:
            if(pointer>0){
                pointer-=1;false;
            }else{
                pointer=0;
            }
            break;
        case 83:
            if(passwordOn==true){
                if(pointer<text.length-1){
                pointer+=1;
                }else{
                pointer=text.length-1;
                }
            }else if(passwordOn==false){
                if(pointer<text.length-2){
                    pointer+=1;
                    pwordOn = false,
                    password = '';
                }else{
                    pointer=text.length-2;
                }
            }
            break;
        case 68:
            if(pointer==1){
                rightpointer+=1;
                if(numOfPlayers<maxPlayers){
                    numOfPlayers+=1;
                }
            }
            if(pointer==2){
                passwordOn= !passwordOn;
            }
            break;
        case 65:
            if(pointer==1){
                rightpointer-=1;
                if(numOfPlayers>0){
                    numOfPlayers-=1;
                }                
            }
            if(pointer==2){
                passwordOn= !passwordOn;
            }
            break;
        case 13:
            if(pointer==0){
                create_lobby(socket,createlobbyinfo());
                gameState="lobby";
            }
            if(pointer==3){
                enterPassword=true;
            }
            break;
        }
    }
}
function endCreateLobbyMenu(){
  CreateLobbyCotrols = window.removeEventListener("keydown",createlobbycontrols);
  createLobbyMenu = false;
  gameState = "lobby";
}