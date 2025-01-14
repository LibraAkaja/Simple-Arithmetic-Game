document.getElementById("playButton").addEventListener('click',function() {
    location.href = "pages/main.html";
});

const soundImg = document.getElementById("gameSound");

const bgm = document.getElementById("backgroundMusic");

let clk;

let soundS = 0;     //Default sound status set to 0 (OFF) 

soundImg.addEventListener("click", function() {
    if(soundImg.src.includes("assets/images/GSON.png")) {
        soundImg.src = "assets/images/GSOFF.png";
        soundS = 1;     //Sounds 'ON'
        clk = document.getElementById("clickOption");
        bgm.play()
        .then(() => {
            document.getElementById("developer").addEventListener("mouseenter", function() {
                clk.play().catch(error => {
                    console.error("Error playing audio: ",error);
                });
            });
            document.getElementById("playButton").addEventListener("mouseenter", function() {
                clk.play().catch(error => {
                    console.error("Error playing audio: ",error);
                });
            });
        })
        .catch(error => {
            console.error("Error playing audio: ",error);
        });
    }
    else {
        soundImg.src = "assets/images/GSON.png";
        soundS = 0;     //Sounds 'OFF'
        bgm.pause();
        clk = null;
    }
    sessionStorage.setItem('soundStatus',soundS);   //Clicking sound image button will save the sound status 
});

sessionStorage.setItem('soundStatus',soundS);   //Not clicking the sound image button will also save the default sound status

/* To check if there was any previous status of sound */