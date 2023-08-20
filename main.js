
const clockElement = document.querySelector(".clock"); // 시계를 출력하는 DOM 요소를 선택합니다.
const batteryElement = document.querySelector(".battery"); // 배터리 잔량을 표시하는 DOM 요소를 선택합니다.
const timeBGColor = document.querySelector(".time");

const colors = {
    one: document.querySelector(".one"), // 배터리 잔량이 19 이하일 때 적용할 배경색을 가진 DOM 요소입니다.
    two: document.querySelector(".two"), // 배터리 잔량이 39 이하일 때 적용할 배경색을 가진 DOM 요소입니다.
    three: document.querySelector(".three"), // 배터리 잔량이 59 이하일 때 적용할 배경색을 가진 DOM 요소입니다.
    four: document.querySelector(".four"), // 배터리 잔량이 79 이하일 때 적용할 배경색을 가진 DOM 요소입니다.
    five: document.querySelector(".five"), // 배터리 잔량이 100 이하일 때 적용할 배경색을 가진 DOM 요소입니다.
};

const { hour: alarmHourInput, minute: alarmMinuteInput, second: alarmSecondInput } = {
    hour: document.getElementById("hour-input"), // 알람 시간의 시 입력을 받는 DOM 요소를 선택합니다.
    minute: document.getElementById("minute-input"), // 알람 시간의 분 입력을 받는 DOM 요소를 선택합니다.
    second: document.getElementById("second-input"), // 알람 시간의 초 입력을 받는 DOM 요소를 선택합니다.
};

const addAlarmBtn = document.getElementById("add-alarm-btn"); // 알람을 추가하는 버튼을 선택합니다.
const alarmsList = document.getElementById("alarms-list"); // 알람 목록을 출력하는 DOM 요소를 선택합니다.

const BatteryLevelColors = [
    { level: 79, color: "bisque" }, // 배터리 잔량이 79 이하일 때 적용할 배경색을 매칭합니다.
    { level: 59, color: "bisque" }, // 배터리 잔량이 59 이하일 때 적용할 배경색을 매칭합니다.
    { level: 39, color: "bisque" }, // 배터리 잔량이 39 이하일 때 적용할 배경색을 매칭합니다.
    { level: 19, color: "bisque" }, // 배터리 잔량이 19 이하일 때 적용할 배경색을 매칭합니다.
];

const Alarm = {
    batteryLevel: 100, // 초기 배터리 잔량을 100으로 설정합니다.
    alarmsCount: 0, // 초기 알람 개수를 0으로 설정합니다.
    getTime() {
        // 현재 시간을 얻어와서 시, 분, 초를 추출합니다.
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        // 시, 분, 초를 시계 출력에 표시합니다.
        clockElement.innerHTML = this.formatTime(hour, minutes, seconds);
    },

    updateBatteryLevel() {
        batteryElement.innerHTML = `배터리 : ${this.batteryLevel}%`;
        this.batteryLevel -= 1;
        if (this.batteryLevel == 79) {
            colors.five.style.backgroundColor = "bisque";
        }
        if (this.batteryLevel == 59) {
            colors.four.style.backgroundColor = "bisque";
        }
        if (this.batteryLevel == 39) {
            colors.three.style.backgroundColor = "bisque";
        }
        if (this.batteryLevel == 19) {
            colors.two.style.backgroundColor = "bisque";
        }
        if (this.batteryLevel === -1) {
            colors.one.style.backgroundColor = "bisque";
            timeBGColor.style.backgroundColor = "black";
            clearInterval(this.batteryInterval);
            alert("배터리가 모두 소진되었습니다.");
        }
    },

    addAlarm() {
        // 알람을 추가하는 동작을 처리합니다.
        if (this.alarmsCount >= 3) {
            alert("알림은 3개까지만 추가 가능합니다.");
            return;
        }

        const alarmHour = alarmHourInput.value;
        const alarmMinute = alarmMinuteInput.value;
        const alarmSecond = alarmSecondInput.value;

        if (alarmHour && alarmMinute && alarmSecond) {
            const listItem = document.createElement("li");
            listItem.innerHTML = this.formatTime(alarmHour, alarmMinute, alarmSecond);
            alarmsList.appendChild(listItem);
            this.alarmsCount += 1;
        }
    },

    formatTime(hour, minutes, seconds) {
        // 시간을 포맷팅하여 문자열로 반환합니다.
        return `${hour < 10 ? `0${hour}` : hour} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    },

    init() {
        // 초기화 함수로써, 시간과 배터리 레벨을 업데이트하고, 알람 추가 버튼의 클릭 이벤트를 처리합니다.
        this.alarmsCount = 0;
        setInterval(this.getTime.bind(this), 1000);
        this.batteryInterval = setInterval(this.updateBatteryLevel.bind(this), 1000);
        addAlarmBtn.addEventListener("click", this.addAlarm.bind(this));
    },
};
    
Alarm.init(); // 알람 객체 초기화를 호출합니다.


