var credits;
var devs;
function startCredits(){
    //starts the credits menu and sets the credits
    window.addEventListener("keydown",creditsMenuControls);
    credits=["Product Owner : Joseph Keatinge","Scrum Master : Sam Drugan"]
    devs=["Darragh McMahon          Evan Young", "Niall Buckley            Sile Neylon","Adam Egan          Michael Matthews"]
    canvasContext.font = "30px Silkscreen"
} 
function updateCreditsMenu(){
    //interval for the draw function
    creditsDraw();
}
function creditsDraw(){
    //draws the credits 
    canvasContext.fillStyle="#000000"
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle="#ffffff";
    canvasContext.font = "42px Silkscreen"
    canvasContext.fillText("Credits",canvas.width/2,100);
    canvasContext.font = "30px Silkscreen"
    for(i=0;i<credits.length;i++){
    canvasContext.fillText(credits[i],canvas.width/2,160+60*i);
    }
    canvasContext.fillText("Developers",canvas.width/2,280);
    for(i=0;i<devs.length;i++){
    canvasContext.fillText(devs[i],canvas.width/2,340+60*i+2);
    }
}
function creditsMenuControls(e){
    //if escape is pressed returns to main menu
    if(e.keyCode==27){
        endCredits()
        gameState="main_menu"
    }
}
function endCredits(){
    //turns off the controls and leaves the credits state
     window.removeEventListener("keydown",creditsMenuControls);
     creditsMenu=false;
}
