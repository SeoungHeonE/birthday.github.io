// HTML 요소 선택
const lyricsOverlay = document.getElementById("lyricsOverlay");
const closeLyricsButton = document.getElementById("closeLyrics");
const toggleLyricsButton = document.getElementById("toggleLyricsButton");
const lyricsVolumeSlider = document.getElementById("lyricsVolumeSlider");
const playPauseButton = document.getElementById("playPauseButton");


// 음원 플레이어 요소 선택
const musicPlayerPopup = document.getElementById("musicPlayerPopup"); // musicPlayerPopup 요소 선택

// 음원 플레이어 팝업 클릭 시 collapsed 클래스 토글
musicPlayerPopup.addEventListener('click', function(event) {
    // 전체 음원 플레이어 팝업을 클릭한 경우에만 collapsed 클래스 추가
    musicPlayerPopup.classList.toggle('collapsed');
});

// 음원 플레이어 내부의 특정 요소들에서 클릭 이벤트 전파 방지
const musicImage = document.querySelector('.music-image');
const controls = document.querySelector('.controls');

// 내부 클릭 시 collapsed 클래스가 토글되지 않도록 이벤트 전파 차단
musicImage.addEventListener('click', function(event) {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
});

controls.addEventListener('click', function(event) {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
});

// 가사 보기 버튼 클릭 시 음원 플레이어 축소 및 가사 오버레이 표시
toggleLyricsButton.addEventListener('click', function(event) {
    event.stopPropagation(); // 클릭 이벤트 전파 방지 (이벤트 버블링 방지)
    musicPlayerPopup.classList.add('collapsed'); // 음원 플레이어 축소
    showLyricsOverlay(); // 가사 오버레이 표시
});

// X 버튼 클릭 시 음원 플레이어 원래 스타일로 복구 및 가사 오버레이 숨김
closeLyricsButton.addEventListener('click', function() {
    musicPlayerPopup.classList.remove('collapsed'); // 음원 플레이어 원래 크기로 복원
    hideLyricsOverlay(); // 가사 오버레이 숨김
});


// 가사 데이터 (시간과 텍스트)
const lyricsData = [
    { time: 0, text: ["♬"] },
    { time: 12.7, text: ["있잖아 나는 말야"] },
    { time: 15.7, text: ["아주 작은 별을 보았어"] },
    { time: 18.8, text: ["너와 나를 이어주던 그 빛 yeah"] },
    { time: 25, text: ["그래서 나는 말야"] },
    { time: 27.6, text: ["너를 찾아 여행을 떠난 거야"] },
    { time: 30.5, text: ["조각난 별의 숨소리에 mm"] },
    { time: 37, text: ["들려주고 싶었어"] },
    { time: 39.8, text: ["뛰는 심장 소릴"] },
    { time: 42.5, text: ["또 멈춰버릴까 두려워져"] },
    { time: 48.7, text: ["조금씩 나를 비추는"] },
    { time: 51.4, text: ["그 따스한 빛을 따라"] },
    { time: 54.5, text: ["내 맘이 너에게 닿기를"] },
    { time: 60, text: ["캄캄한 밤"] },
    { time: 62, text: ["별빛을 따라 너에게 갈게"] },
    { time: 66.6, text: ["멈춘 시간을 넘어"] },
    { time: 71, text: ["쉬지 않고 달려"] },
    { time: 72.8, text: ["숨이 차오르면"] },
    { time: 75.6, text: ["너를 만나게 되면"] },
    { time: 78.8, text: ["꼭 말해줄래 이렇게"] },
    { time: 83, text: ["happy birthday"] },
    { time: 91.4, text: ["조그만 빛을 따라"] },
    { time: 94, text: ["그 머나먼 어둠 속을 헤매다"] },
    { time: 97.6, text: ["눈을 감고 너를 그릴 때 mm"] },
    { time: 104, text: ["잊고 싶지 않았어"] },
    { time: 106.8, text: ["소중했던 맘이"] },
    { time: 109.6, text: ["다 사라지는 게 두려워서"] },
    { time: 115.7, text: ["여전히 나를 비추는"] },
    { time: 118, text: ["그 오래된 빛을 따라"] },
    { time: 121, text: ["내 맘이 너에게 닿기를"] },
    { time: 127, text: ["캄캄한 밤"] },
    { time: 129.2, text: ["별빛을 따라 너에게 갈게"] },
    { time: 133.7, text: ["멈춘 시간을 넘어"] },
    { time: 138, text: ["쉬지 않고 달려"] },
    { time: 140, text: ["숨이 차오르면 "] },
    { time: 142, text: ["너를 만나게 되면"] },
    { time: 145.7, text: ["꼭 말해줄래 이렇게 내게"] },
    { time: 152, text: ["♬"] },
    { time: 164, text: ["사실은 말야 조금 겁이 나"] },
    { time: 170, text: ["아직 자라지 못한 맘이"] },
    { time: 176.2, text: ["고장 난 시계처럼 난 움직일 수가 없어서"] },
    { time: 182.2, text: ["자꾸 너만 찾게 되는 걸"] },
    { time: 187.8, text: ["캄캄한 밤"] },
    { time: 189.5, text: ["네 빛을 따라 너에게 갈게"] },
    { time: 194, text: ["긴긴 어둠을 건너"] },
    { time: 198.8, text: ["쉬지 않고 달려"] },
    { time: 200.8, text: ["숨이 차오르면 "] },
    { time: 203.3, text: ["정말 만나게 되면"] },
    { time: 206.5, text: ["꼭 말해줄래 이렇게"] },
    { time: 210.8, text: ["happy birthday"] },
    { time: 212, text: ["나의 두 번째 생일 축하는 이런 엔딩이야."] },
    { time: 213.5, text: ["어때, 좀 색달랐어?"] },
    { time: 215, text: ["친구 이상의 존재라고 생각하고,"] },
    { time: 216.5, text: ["나도 이런 힘이 되어주는 사람이 옆에 있으면 좋겠다는 생각에,"] },
    { time: 218, text: ["내가 원하기 이전에 그런 사람이 되어보자 해서"] },
    { time: 219.5, text: ["시간 틈틈이 쪼개서 누나를 위한 웹을 만들어봤어."] },
    { time: 221, text: ["이 웹은 영원히 둘 거니까,"] },
    { time: 222.5, text: ["힘들 때나 울고 싶을 때 한 번씩 봐."] },
    { time: 224, text: ["힘이 나지 않을까?"] },
    { time: 225.5, text: ["내 지인이 이런 걸 해줬다면 나는 인생을 살아갈 버팀목이 될 수도 있다고 생각해.ㅎㅎ"] },
    { time: 227, text: ["생일 진짜루 축하해 장은정❤️"] },
];



let lyricsIndex = 0; // 현재 가사 인덱스

// 가사 데이터를 찾는 함수
function findCurrentLyricsIndex(currentTime) {
    for (let i = 0; i < lyricsData.length; i++) {
        if (currentTime < lyricsData[i].time) {
            return i - 1; // 이전 가사를 출력
        }
    }
    return lyricsData.length - 1; // 마지막 가사 인덱스를 반환
}

// 현재 시간에 맞는 가사를 업데이트하는 함수
// 가사 데이터를 찾고, 가사 인덱스를 업데이트하는 함수
// 현재 가사 인덱스를 찾고, 가사 텍스트를 업데이트하는 함수
function updateLyrics() {
    const currentIndex = findCurrentLyricsIndex(audioPlayer.currentTime);

    if (currentIndex !== lyricsIndex) {
        lyricsIndex = currentIndex; // 가사 인덱스를 최신화
        const lines = lyricsData[lyricsIndex].text;

        // 이전, 현재, 이후 가사들을 가져온다
        const previousLines = lyricsData[lyricsIndex - 1] ? lyricsData[lyricsIndex - 1].text : [];
        const nextLines = lyricsData[lyricsIndex + 1] ? lyricsData[lyricsIndex + 1].text : [];

        // 새로운 가사 HTML 생성
        const allLyrics = [
            ...previousLines.map(line => `<span class="previous-lyric">${line}</span>`),
            ...lines.map(line => `<span class="current-lyric">${line}</span>`),
            ...nextLines.map(line => `<span class="next-lyric">${line}</span>`),
        ];

        // lyricsText 업데이트
        lyricsText.innerHTML = allLyrics.join('<br>');
    }
}



// 가사 오버레이를 표시하는 함수
function showLyricsOverlay() {
    lyricsOverlay.classList.add("show");
    lyricsIndex = findCurrentLyricsIndex(audioPlayer.currentTime); // 현재 시간에 맞는 가사 인덱스 찾기
    updateLyrics(); // 현재 가사를 즉시 업데이트
    audioPlayer.addEventListener("timeupdate", updateLyrics); // timeupdate 이벤트 추가
}

// 가사 오버레이를 숨기는 함수
function hideLyricsOverlay() {
    lyricsOverlay.classList.remove("show");
    lyricsText.textContent = ""; // 가사 초기화
    audioPlayer.removeEventListener("timeupdate", updateLyrics);
}

// 음원의 시간이 변경될 때마다 슬라이더 값 업데이트
audioPlayer.addEventListener("timeupdate", function() {
    if (audioPlayer.duration > 0) {
        // 현재 시간을 바탕으로 슬라이더 값 갱신
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        audioRangeSlider.value = progress;
        sliderProgress.style.width = progress + '%'; // 진행 상태 바의 width 업데이트
    }
    updateLyrics(); // 시간이 갱신될 때마다 가사 업데이트
});

// 슬라이더의 값이 변경될 때마다 음원의 시간을 변경
audioRangeSlider.addEventListener("input", function() {
    audioPlayer.currentTime = audioRangeSlider.value;
    lyricsIndex = findCurrentLyricsIndex(audioPlayer.currentTime); // 슬라이더 이동 시 가사 동기화
    updateLyrics(); // 새로 동기화된 가사 표시
});


// 재생/일시 정지 토글
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = "⏸︎";
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = "▶︎";
    }
}

// 버튼에 이벤트 리스너 추가
toggleLyricsButton.addEventListener("click", showLyricsOverlay);
closeLyricsButton.addEventListener("click", hideLyricsOverlay);


// 오디오 요소 선택
const audioRange = document.getElementById('audioRangeSlider');
const sliderProgress = document.getElementById('sliderProgress');
const volumeSlider = document.getElementById('volumeSlider');

// 음량 슬라이더 기능 추가
volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = volumeSlider.value; // 음량을 슬라이더 값에 맞게 설정
});

// 오디오가 준비되었을 때, 슬라이더 최대값을 오디오의 총 길이로 설정
audioPlayer.addEventListener('loadedmetadata', function() {
    audioRange.max = 100; // 슬라이더의 최대값을 100으로 설정
});

// 오디오의 진행에 맞춰 슬라이더 업데이트
audioPlayer.addEventListener('timeupdate', function() {
    if (audioPlayer.duration > 0) { // 음원의 길이가 유효한 경우에만 실행
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        audioRange.value = progress;
        sliderProgress.style.width = progress + '%'; // 진행 상태 바의 width 업데이트
    }
});

// 슬라이더 클릭 시, 오디오 위치 변경
audioRange.addEventListener('input', function() {
    const value = audioRange.value;
    audioPlayer.currentTime = (value / 100) * audioPlayer.duration;
});

// 사용자 인터랙션으로 오디오 재생 (브라우저 보안 상 자동 재생이 제한될 수 있기 때문에)
document.querySelector('#audioRangeSlider').addEventListener('click', function() {
    audioPlayer.play(); // 클릭 시 오디오 재생 시작
});











// { time: 0, text: ["♬"] },
// { time: 25.5, text: ["過ぎてゆくんだ今日も", "스기테유쿤다 쿄오모", "오늘도 지나가네"] },
// { time: 28, text: ["この寿命の通りに", "코노 주묘오노 토오리니", "이 생명의 통례로"] },
// { time: 31, text: ["限りある数字が減るように", "카기리 아루 스우지기 헤루요오니", "한정된 숫자가 줄어드는 것처럼"] },
// { time: 34, text: ["美しい数字が増えるように", "우츠쿠시이 스우지가 후에루요오니", "아름다운 숫자가 늘어나길"] },
// { time: 38.4, text: ["思い出の宝庫", "오모이데노 호오코", "추억의 보물창고"] },
// { time: 40.8, text: ["古いものは棚の奥に", "후루이모노와 타나노 오쿠니", "낡은 것들은 선반 안쪽에 둘게"] },
// { time: 43.8, text: ["埃を被っているのに", "호코리오 카붓테이루노니", "먼지를 뒤집어쓰고 있지만"] },
// { time: 47, text: ["誇りが光って見えるように", "호코리가 히캇테 미에루요오니", "그 먼지(긍지)가 빛나 보이도록"] },
// { time: 50.6, text: ["されど", "사레도", "하지만"] },
// { time: 51.4, text: ["By my side"] },
// { time: 52.4, text: ["不安 喝采 連帯", "후안 캇사이 렌타이", "불안 응원 연대"] },
// { time: 54.2, text: ["濁ったりの安全地帯", "니곳타리노 안젠치다이", "흐린 안전지대"] },
// { time: 57.3, text: ["グワングワンになる", "구완구완니나루", "머리가 빙빙 도는 듯한"] },
// { time: 59, text: ["朝方の倦怠感", "아사가타노 켄타이칸", "아침의 권태감"] },
// { time: 61, text: ["三番ホーム 準急電車", "산반 호오무 주큐우텐샤", "3번 홈의 준급행열차"] },
// { time: 64, text: ["青に似た", "아오니 니타", "푸름을 닮은"] },
// { time: 64.8, text: ["すっぱい春とライラック", "슷파이 하루토 라이락쿠", "새콤한 봄과 라일락"] },
// { time: 67.2, text: ["君を待つよ ここでね", "키미오 마츠요 코코데네", "너를 기다리고 있어 여기에서"] },
// { time: 70.4, text: ["痛みだす人生単位の傷も", "이타미다스 진세탄이노 키즈모", "아파오는 인생 단위의 상처도"] },
// { time: 73.8, text: ["愛おしく思いたい", "이토오시쿠오모이타이", "사랑스럽게 여기고 싶어"] },
// { time: 76.3, text: ["探す宛ても無いのに", "사가스아테모 나이노니", "찾을 곳도 없지만"] },
// { time: 79, text: ["忘れてしまう僕らは", "와스레테시마우 보쿠라와", "잊어버리고 마는 우리들은"] },
// { time: 83, text: ["何を経て 何を得て", "나니오헤테 나니오에테", "무엇을 거쳐 무엇을 얻어"] },
// { time: 85.3, text: ["大人になってゆくんだろう", "오토나니낫테유쿤다로오", "어른이 되어가는걸까"] },
// { time: 89, text: ["♬"] },