let clock = document.querySelector(".clock");
const batteryElement = document.querySelector(".battery");
const onecolor = document.querySelector('.one');
const twocolor = document.querySelector('.two');
const threecolor = document.querySelector('.three');
const fourcolor = document.querySelector('.four');
const fivecolor = document.querySelector('.five');

let alarmhour = document.getElementById("hour-input");
let alarmminute = document.getElementById("minute-input");
let alarmsecond = document.getElementById("second-input");
let addAlarmBtn = document.getElementById("add-alarm-btn");
let alarmsList = document.getElementById("alarms-list");
let count = 0;

var Alarm = {
    batteryLevel: 100,

    //현재시간을 출력하는 메서드
    getTime: function() {
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        clock.innerHTML = `${hour<10 ? `0${hour}`:hour} : ${minutes<10 ? `0${minutes}`:minutes} : ${seconds<10 ? `0${seconds}`:seconds}`
    },

    //배터리 잔량을 표시하는 메서드
    updateBattery: function() {
        batteryElement.innerHTML = `배터리 : ${this.batteryLevel}%`;
        this.batteryLevel -= 1;
        if (this.batteryLevel == -1) {
            onecolor.style.backgroundColor = "bisque";
            timecolor.style.backgroundColor = "black";
            clearInterval(batteryInterval);
            alert("배터리가 모두 소진되었습니다.")
        }
        if (this.batteryLevel == 79) {
            fivecolor.style.backgroundColor = "bisque";
        }
        if (this.batteryLevel == 59) {
            fourcolor.style.backgroundColor = "bisque";
        }
        if (this.batteryLevel == 39) {
            threecolor.style.backgroundColor = "bisque";
        }
        if (this.batteryLevel == 19) {
            twocolor.style.backgroundColor = "bisque";
        }
    },

    //알람을 추가하는 메서드
    addAlarm: function() {
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
    },

    init: function() {
        setInterval(this.getTime.bind(this), 1000);
        setInterval(this.updateBattery.bind(this), 1000);
        addAlarmBtn.addEventListener("click", this.addAlarm.bind(this));
    }
};

Alarm.init();


