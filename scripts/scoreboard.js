//Getting the final score
const finalScore = sessionStorage.getItem('finalScore');
document.getElementById("score").innerHTML = finalScore;

//Getting the game sound status
const soundStatus = sessionStorage.getItem('soundStatus');

window.addEventListener("load", function() {

    const opSound = document.getElementById("optionSound");     //Sound for options
    const bgm = document.getElementById('bgm');                 //Bgm for game over

    function optionSound() {
        opSound.play().catch(error => {
            console.error("Error playing audio: ",error);
        });
    }

    if(soundStatus === '1') {
        //Play the bgm
        bgm.play().catch(error => {
            console.error("Error playing audio: ",error);
        });
        //Add sound to the options
        document.getElementById("playAgain").addEventListener("mouseenter", optionSound);
        document.getElementById("mainMenu").addEventListener("mouseenter", optionSound);
    }
    else if(soundStatus === '0') {
        //Don't play any sound
        bgm.pause();
    }    

});

