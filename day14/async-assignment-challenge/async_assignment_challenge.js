// 상수 선언
const MAX_TIME = 10;
const MIN_TIME = 1;

// 변수 선언
let timerCount = 0;
var timerMessage = "";

// DOM 요소
const timerInput = document.getElementById("timerInput");
const startTimerBtn = document.getElementById("startTimer");
const timerDisplay = document.getElementById("timerDisplay");

// timerInput 초기화
const resetTimerInput = () => {
  timerInput.value = "";
};

// timerDisplay 초기화 (텍스트 및 클래스 제거)
const resetTimerDisp = () => {
  timerDisplay.textContent = "";
  timerDisplay.classList.remove("error");
};

// timerDisplay에 sec 표시
const showTimerSec = (sec) => {
  resetTimerDisp();
  timerDisplay.textContent = `타이머: ${sec}초`;
};

// timerDisplay에 타이머 종료 메시지 표시
const showTimerComplete = () => {
  resetTimerDisp();
  timerDisplay.textContent = "타이머 종료!";
};

// timerDisplay에 오류 메시지 표시
const showTimerError = (message) => {
  resetTimerDisp();
  timerDisplay.textContent = message;
  timerDisplay.classList.add("error");
};

// 타이머 로직 구현 (함수 선언문, 기본값 매개변수 사용)
function processTimer(sec = 10) {

  showTimerSec(sec);
  timerCount = sec;

  // 버튼 비활성화
  startTimerBtn.disabled = true;

  // 1초마다 반복되는 타이머
  const timer = setInterval(() => {
    // 1초마다 sec 감소
    timerCount -= 1;
    if (timerCount > 0) {
      showTimerSec(timerCount);
    } else {
     
      // 타이머 종료
      clearInterval(timer);
      showTimerComplete();

      // 버튼 재활성화
      startTimerBtn.disabled = false;
    }
  }, 1000);
}

// 타이머 시작 버튼 클릭 핸들러
function handleClickTimer() {
  try {
    const time = Number(document.getElementById("timerInput").value);

    if (isNaN(time) || time < MIN_TIME || time > MAX_TIME || timerInput.value === "") {
      throw new Error("유효한 숫자(1-10)를 입력하세요!");
    }

    // 유효한 입력이면 타이머 시작
    processTimer(time);
  } catch (error) {
    // 오류 메시지 출력
    showTimerError(error.message);
    resetTimerInput();
  }
}

startTimerBtn.addEventListener("click", handleClickTimer);