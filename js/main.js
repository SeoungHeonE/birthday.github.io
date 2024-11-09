// HTML 요소 선택
const audioPlayer = document.getElementById("audioPlayer");
const lyricsText = document.getElementById("lyricsText");
const playButton = document.getElementById("playButton");
const lyricsButton = document.getElementById("lyricsButton");
const startButton = document.querySelector("#welcomePopup button");

const lyricsContainer = document.querySelector(".lyrics-container");



// Lottie 애니메이션 로드
const welcomeAnimation = lottie.loadAnimation({
    container: document.getElementById('welcomeLottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './lottie/welcome.json'
});

const questionAnimation = lottie.loadAnimation({
    container: document.getElementById('userNameLottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './lottie/userName.json'

});
// 질문 리스트와 해당 Lottie 파일 경로
const questions = [
    {
        text: "11월 16일 오늘은 무슨 날?",
        lottiePath: './lottie/question1.json' // 첫 번째 질문에 해당하는 Lottie 파일
    },
    {
        text: "내가 제일 좋아하는 음식은 무엇일까요?",
        lottiePath: './lottie/question2.json' // 두 번째 질문에 해당하는 Lottie 파일
    },
    {
        text: "우리가 처음 만난 장소는 어디였죠?",
        lottiePath: './lottie/question3.json' // 세 번째 질문에 해당하는 Lottie 파일
    }
];

const finalAnimation = lottie.loadAnimation({
    container: document.getElementById('finalLottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'final.json'
});

let currentQuestionIndex = 0;
let userName = ""; // 사용자 이름 저장

// 이름 입력 팝업으로 이동
function askName() {
    document.querySelector('.popup.show').classList.remove('show');
    document.getElementById('namePopup').classList.add('show');
}

// 질문 시작
function startQuestions() {
    userName = document.getElementById('userNameInput').value.trim();
    if (userName === "") {
        alert("이름을 입력해 주세요!");
        return;
    }
    document.querySelector('.popup.show').classList.remove('show');
    document.getElementById('questionArea').classList.add('show');
    showQuestion();
}

// 현재 질문 보여주기
function showQuestion() {
    document.getElementById('questionText').innerText = questions[currentQuestionIndex].text; // 질문 텍스트 업데이트
    document.getElementById('answerInput').value = '';

    // Lottie 애니메이션 로드
    const questionLottie = document.getElementById('userNameLottie'); // Lottie 컨테이너
    questionLottie.innerHTML = ''; // 이전 애니메이션 초기화

    // 새로운 Lottie 애니메이션 로드
    lottie.loadAnimation({
        container: questionLottie,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: questions[currentQuestionIndex].lottiePath // 현재 질문에 해당하는 Lottie 파일 경로
    });
}

// 다음 질문 또는 최종 팝업
function nextQuestion() {
    const answer = document.getElementById('answerInput').value.trim();
    if (answer === "") {
        alert("답변을 입력해 주세요!");
        return;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        // 질문을 업데이트하기 전에 애니메이션 클래스를 다시 추가
        const questionArea = document.getElementById('questionArea');
        questionArea.classList.remove('show'); // show 클래스 제거
        void questionArea.offsetWidth; // 리플로우를 강제로 발생시킴
        questionArea.classList.add('show'); // show 클래스 다시 추가
        showQuestion();
    } else {
        document.getElementById('questionArea').classList.remove('show');
        document.getElementById('finalPopup').classList.add('show');
        document.getElementById('finalMessage').innerText = `${userName}님의 생일을 진심으로 축하해요!`;
    }
}

// "시작하기" 버튼 클릭 시 음원 재생 여부 확인
// 시작하기 버튼 클릭 시 음원 재생 여부 확인 및 플레이어 축소
function startEvent() {
    if (audioPlayer.paused) {
        alert("음원을 재생한 후 시작 버튼을 눌러주세요!");
    } else {
        // 음원 플레이어를 간소화 상태로 변경
        musicPlayerPopup.classList.add('collapsed');
        
        // 100ms 지연 후 환영 팝업을 닫고 이름 입력 팝업 표시
        setTimeout(() => {
            document.getElementById("welcomePopup").classList.remove("show");
            document.getElementById("namePopup").classList.add("show");
        }, 100);
    }
}





// 음원의 길이를 기준으로 슬라이더의 범위를 설정
const audioRangeSlider = document.getElementById("audioRangeSlider");

// 음원의 길이가 로드되었을 때 슬라이더 범위 설정
audioPlayer.addEventListener("loadedmetadata", function() {
    // 음원의 길이를 가져와 슬라이더의 최대값을 설정
    audioRangeSlider.max = audioPlayer.duration;
});

// 슬라이더의 값이 변경될 때마다 음원의 시간을 변경
audioRangeSlider.addEventListener("input", function() {
    audioPlayer.currentTime = audioRangeSlider.value;
});

// 음원의 시간이 변경될 때마다 슬라이더의 값을 업데이트
audioPlayer.addEventListener("timeupdate", function() {
    // 현재 재생 중인 시간에 맞게 슬라이더 값을 갱신
    audioRangeSlider.value = audioPlayer.currentTime;
});

// 음원의 끝까지 재생되면 슬라이더 값 초기화
audioPlayer.addEventListener("ended", function() {
    audioRangeSlider.value = 0; // 종료되면 슬라이더를 처음 위치로 되돌림
});




// 재생/일시 정지 토글
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            // 재생 성공 시 버튼 아이콘 변경
            playButton.textContent = "⏸︎"; // 일시 정지 아이콘
        }).catch(error => {
            // 자동 재생 제한 시 오류 처리
            console.error("오디오 재생 오류:", error);
            alert("브라우저 설정으로 인해 자동 재생이 제한될 수 있습니다. 버튼을 다시 눌러주세요.");
        });
    } else {
        audioPlayer.pause();
        playButton.textContent = "▶︎"; // 재생 아이콘
    }
}

// 이벤트 리스너 추가
playButton.addEventListener("click", togglePlay);
startButton.addEventListener("click", startEvent);


