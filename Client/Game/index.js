/*The window.onload function and most global variables
  The gamestates are as follows:
    >username_menu
    >main_menu
    >lobby_list_menu
    >create_lobby_menu
    >game
    >lobby
    >pause_menu
    >settingsMenu
    */

//Booleans to represent if the current gameState has been initialised yet
var usernameMenu = false;
var mainMenuEventListeners = false;
var settingsMenu=false;
var gameStarted = false;
var lobbyWaitRoom = false;
var createLobbyMenu = false;
var lobbyMenu = false;

//Canvas and map settings
var canvas, canvasContext;
var height, width;
const TILE_W = 20;
const TILE_H = 20;
const TILE_COLS = 25;
const TILE_ROWS = 25;

//Game and lobby settings
var gameState = "username_menu";
var clientUsername = "";
var maxPlayers = 4;
var currentLobby;

var socket=io.connect();

window.onload = function() {
  //Ran when game is first loaded up
  //Sets canvas variables and interval for updateAll function
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext('2d');
  height = canvas.width;
  width = canvas.height;
  var framesPerSecond = 30;
  window.setInterval(updateAll, 1000/framesPerSecond);
  }

function updateAll() {
// Called every interval. Depending on the gameState it will run a separate file
 // console.log(gameState) 
  switch(gameState) {
    //For each gameState its starting function will be called once if it hasn't been already
    //and its update function will be called every interval until the gameState is changed
    case "username_menu":
      if (!usernameMenu) {
        startUserNameMenu();
        usernameMenu = true;
      }
      updateUserNameMenu();
      break;
    case "main_menu":
      if (!mainMenuEventListeners) {
        startmainmenu();
        mainMenuEventListeners = true;
      }
      updategamemenu();
      break;
    case "lobby_list_menu":
      if (!lobbyMenu) {
        startLobbyMenu();
        lobbyMenu = true;
      }
      updateLobbyMenu();
      break;
    case "settingsMenu":
      if(!settingsMenu){
        startSettingsMenu();
        settingsMenu=true;
      }
      updateSettingsMenu();
      break;
    case "create_lobby_menu":
      if (!createLobbyMenu) {
        startCreateLobbyMenu();
        createLobbyMenu = true;
      }
      createLobbyUpdate();
      break;
    case "game":
      if (!gameStarted) {
        startGame();
        gameStarted = true;
      }
      updateGame();
      break;
    case "lobby":
      if (!lobbyWaitRoom) {
        startLobbyWaitRoom();
        lobbyWaitRoom = true;
      }
      updateLobbyWaitRoom();
      break;
    case "pause_menu":
      break;
  }
//console.log(gameState);
}
