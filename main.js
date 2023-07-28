var clock = document.querySelector(".clock");

function getTime() {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    clock.innerHTML = `${hour<10 ? `0${hour}`:hour} : ${minutes<10 ? `0${minutes}`:minutes} : ${seconds<10 ? `0${seconds}`:seconds}`
}

var onecolor = document.querySelector('.one');  //red
var twocolor = document.querySelector('.two');  //blue
var threecolor = document.querySelector('.three');
var fourcolor = document.querySelector('.four');
var fivecolor = document.querySelector('.five');

var batteryElement = document.querySelector(".battery");
var batteryLevel = 100;
var timecolor = document.querySelector('.time');

function updateBattery() {
    batteryElement.innerHTML = `배터리 : ${batteryLevel}%`;
    batteryLevel -= 1;
    if (batteryLevel == -1) {
        onecolor.style.backgroundColor = "bisque";
        timecolor.style.backgroundColor = "black";
        clearInterval(batteryInterval);
        alert("배터리가 모두 소진되었습니다.")
    }
    if (batteryLevel == 79) {
        fivecolor.style.backgroundColor = "bisque";
    }
    if (batteryLevel == 59) {
        fourcolor.style.backgroundColor = "bisque";
    }
    if (batteryLevel == 39) {
        threecolor.style.backgroundColor = "bisque";
    }
    if (batteryLevel == 19) {
        twocolor.style.backgroundColor = "bisque";
    }
}

var alarmhour = document.getElementById("hour-input");
var alarmminute = document.getElementById("minute-input");
var alarmsecond = document.getElementById("second-input");
var addAlarmBtn = document.getElementById("add-alarm-btn");
var alarmsList = document.getElementById("alarms-list");
var count = 0;
function addAlarm() {
    if (count >= 3) {
        alert("알림은 3개까지만 추가 가능합니다.");
        return;
    }
    const alarmhours = alarmhour.value;
    const alarmminutes = alarmminute.value;
    const alarmseconds = alarmsecond.value;

    if (alarmhours && alarmminutes && alarmseconds) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${alarmhours<10 ? `0${alarmhours}`:alarmhours} : ${alarmminutes<10 ? `0${alarmminutes}`:alarmminutes} : ${alarmseconds<10 ? `0${alarmseconds}`:alarmseconds}`;
        alarmsList.appendChild(listItem);
        count += 1;
    }
}

function init(){
    setInterval(getTime, 1000);
    batteryInterval = setInterval(updateBattery, 1000);
    addAlarmBtn.addEventListener("click", addAlarm);
}

init();
