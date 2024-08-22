
const setAlarmBtn = document.querySelector("button")
const selectMenu = document.querySelectorAll("select")
const currentTime = document.querySelector("h1")
const content = document.querySelector("content")
const timeImg = document.getElementById("clockImg")

ringtone = new Audio("./101_wakeup_02.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i ;
    let option = `<option value="${i}">${i}</option>` 
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for( let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for(let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM"
    let option = `<option value="${ampm}">${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";

    if(h >= 12){
        h = h - 12
        ampm = "PM"
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play()
        timeImg.src = "./101_wakeup.png"
        timeImg.classList.add("glow"); // Add glow effect
        ringtone.loop = true
    }  
})


let alarmTime,isAlarmSet

function setAlarm(){
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        timeImg.src = "./101_clock.png";
        timeImg.classList.remove("glow"); // Remove glow effect
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    else {

        let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
        if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
            return alert("Did you forget to set something? Don’t worry, we won’t tell the clock...");
        }
        alarmTime = time       
        isAlarmSet = true
        console.log(setAlarmBtn.innerText)
        setAlarmBtn.innerText = "Clear Alarm";  
    }

}

setAlarmBtn.addEventListener("click", setAlarm)
