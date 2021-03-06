/**
 * Creates a menu of available lobbies which can be selected
 * When a user selects a lobby they will be brought to that game of selection
 * The lobby menu displays the host,number of players and if there is a password
 *
*/
var pageNum;
var pagesPerPage;
var lobbyMenuKeyDown;
var lobbies;
var lobbyMenuPointer;
var enteringLobbyPassword;
var passwordAttempt = "";

socket.on('lobbyList', function (data) {
   lobbies = data;
});

function startLobbyMenu() {
    //starts the current menu and sets variables
    lobbies = []
    window.addEventListener("keydown",lobbyMenuControls);
    pageNum=0;
    pagesPerPage=8;
    lobbyMenuPointer = 0;
    enteringLobbyPassword = false;
    socket.emit('requestLobbies');
}

function updateLobbyMenu() {
    /*
    Creates an interval to call clear and draw
    */
    lobbyMenuDraw();
}

function lobbyMenuParseArray(i) {
    /*
    Generates the text for the draw function
    */

    var str = ""
    if (lobbies.length > 0) {
        if (lobbies[i].pwordOn != false) {
            str = lobbies[i].id + "-" +lobbies[i].map + " - " + lobbies[i].max_players + " - " + "Yes";
        } else {
            str = lobbies[i].id + "-" +lobbies[i].map + " - " + lobbies[i].max_players + " - " + "No";
        }
    }
    return str;
}

function lobbyMenuDraw() {
     /*
    Draws the text to the screen
    */
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.font = "30px Silkscreen"
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText("Press escape to go to the main menu",canvas.width/2,500,400);
    canvasContext.fillText(("Select Lobby"),canvas.width/2,40);
    if(!enteringLobbyPassword){
    canvasContext.fillText(("Host - Map - Max Players - Password"),canvas.width/2,70,400);
    canvasContext.fillStyle = "#888888";
    for(i=0;i<Math.min(lobbies.length-(pagesPerPage*pageNum),pagesPerPage);i++) {
        canvasContext.fillText(lobbyMenuParseArray(i+pagesPerPage*pageNum),canvas.width/2,120+40*i,400);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(lobbyMenuParseArray(lobbyMenuPointer),canvas.width/2,120+40*(lobbyMenuPointer-(pagesPerPage*pageNum)),400);
    }else{
	canvasContext.fillText("Password attempt : "+passwordAttempt,canvas.width/2,250);
    }
}

function lobbyMenuControls(e) {
    /*
    Sets the controls for the user and keeps track of lobbyMenuPointers
    */
    if(enteringLobbyPassword){
        //User trying to enter lobby password
        switch(e.keyCode){
            case 13:
                menuSound.play()
                menuSound.currentTime=0;
                enteringLobbyPassword=false;
                console.log("Entered: " + passwordAttempt);
                break;
            case 8:
                //remove last letter using backspace
                passwordAttempt = passwordAttempt.slice(0,passwordAttempt.length-1);
                break;
            default:
                //enter values A-Z or 1-9 and append to passwordAttempt
                if(e.keyCode>=65 && e.keyCode<=90 ){
                        letter = String.fromCharCode(e.keyCode)
                        passwordAttempt+=letter.toUpperCase();
                }
                if(e.keyCode>=48 && e.keyCode<=57){
                        letter = String.fromCharCode(e.keyCode)
                        passwordAttempt+=letter.toUpperCase();
           	}
                break;
        }
    }
    switch(e.keyCode){
        case 87://s key pressed
            menuSound.play()
            menuSound.currentTime=0;
            if(lobbyMenuPointer > 0 + (pagesPerPage*pageNum)){
                lobbyMenuPointer-=1;
            }else if(pageNum>0){
                lobbyMenuPointer-=1;
                pageNum-=1;
            }
            break;
        case 83://a key pressed
            menuSound.play()
            menuSound.currentTime=0;
            if(lobbyMenuPointer < lobbies.length-1){
                lobbyMenuPointer+=1;
                //moves the lobby pointer up one if its less than the total number of lobbies
            }if(lobbyMenuPointer>(pagesPerPage-1)+(pagesPerPage*pageNum)){
                //changes the current page if the pointer has reached the end of the current page
                pageNum+=1;
            }
            break;
        case 13:
            menuSound.play()
            menuSound.currentTime=0;
             //Enter key pressed
            selectedLobby = lobbies[lobbyMenuPointer];
            //If the selected lobby has a password
            if (selectedLobby.passwordOn) {
                //Check if the current password if any is correct
                if (passwordAttempt == selectedLobby.password) {
                    //If so connect
                    socket.emit('join_lobby', { "lobby": selectedLobby.id,"username":clientUsername });
                    currentLobby = selectedLobby;
                    gameState = "lobby";
                    endLobbyMenu();
                //If the current attempt is not correct or no attempt has been made, allow the user to enter the password
                } else {
                    passwordAttempt = "";
                    enteringLobbyPassword = true;}
            }else{
                //join the selected lobby if entered password is correct and end the menu
                socket.emit('join_lobby', { "lobby": selectedLobby.id,"username":clientUsername});
                currentLobby = selectedLobby;
                gameState = "lobby";
                endLobbyMenu();
            }
            break;
	    case 27:
            //leave menu if escape is pressed
            menuSound.play()
            menuSound.currentTime=0;
		    if(!enteringLobbyPassword){
		        endLobbyMenu();
		        gameState="main_menu";
		    }else{
		        enteringLobbyPassword=false;
		    }      
		    break;
        }
}

function endLobbyMenu() {
    //ends the currrent menu and turns off the controls
    window.removeEventListener("keydown", lobbyMenuControls);
    lobbyMenu = false;
}
