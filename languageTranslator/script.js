const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#btn");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const icons = document.querySelectorAll("img");



selectTag.forEach((tag , id) => {
    for (const countriesCode in countries) {
        let selected = "";
        if(id === 0 && countriesCode === 'en-GB'){
            selected = "selected";
        } else if(id === 1 && countriesCode === "hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

translateBtn.addEventListener("click", () => {
    let Text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;

    const apiURL = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(Text)}&langpair=${translateFrom}|${translateTo}`;
    
    fetch(apiURL).then(res => res.json()).then(data => {
            toText.value = data.responseData.translatedText;  //From API we found all these 
            // variable only by simply check from pasting the url in website
        }).catch(err => {
            console.error("Translation error:", err);
            toText.value = "Translation failed.";
        });
});

icons.forEach(icon=>{
    icon.addEventListener("click" ,({target}) =>{
        if(target.classList.contains("copy")){
            // console.log("copy");
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            // console.log("speak");
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});
