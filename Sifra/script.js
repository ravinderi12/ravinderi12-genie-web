let btn = document.querySelector('#btn');
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {//iss se jo bhi hum text pass krenge vo bolaa jayegaa ...
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = "hi-GB";
    text_speak.pitch = 1;
    text_speak.rate = 1;
    text_speak.volume = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir");
    } else {
        speak("Good evening sir");
    }
}

window.addEventListener('load', () => wishMe());

//speechRecog. -> humm jo bolenge vo recog krega or humee API ki form m degaa ...
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "en-IN"; 
recognition.interimResults = false; 
recognition.continuous = false;
recognition.maxAlternatives = 1;

// Auto-restart if needed (UX improvement)
recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
    btn.style.display = "flex";
    voice.style.display = "none";
    speak("Sorry, I didn't catch that. Please try again.");
};

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", async () => {
    try {
        // Request clean mic audio
        await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 16000
            }
        });
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block";
    } catch (error) {
        console.error("Microphone access error:", error);
        speak("Unable to access your microphone.");
    }
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello!sir");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by team Bit For Byte");
    } else if (message.includes("open google")) {
        speak("Opening Google .... ");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open youtube")) {
        speak("Opening Youtube .... ");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("love")) {
        speak("SORRY!! As a large language model, I don't have the capacity to experience emotions like love .. ");
    } else if (message.includes("open facebook") || message.includes("open my facebook account")) {
        speak("Opening Facebook .... ");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open instagram") || message.includes("open my instagram account")) {
        speak("Opening Instagram .... ");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator .... ");
        window.open("calculator://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else if (message.includes("play song")) {
        let finalTxt = "Playing " + (message.replace("chiiti play", "").replace("chiiti play", "").trim());
        speak(finalTxt);
        window.open(`https://www.youtube.com/results?search_query=${finalTxt}`, "_blank");
    } else {
        let finalTxt = message.replace("chiiti", "").replace("chiiti", "").trim();
        speak(`This is what I found on the internet regarding ${finalTxt}`);
        window.open(`https://www.google.com/search?q=${finalTxt}`, "_blank");
    }
}