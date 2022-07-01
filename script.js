let rightQuestions = 0;
let currentQuestion = 0;
let AudioSuccess = new Audio('audio/richtig.mp3')
let AudioFail = new Audio('audio/falsch.mp3')
let lobbyMusik = new Audio('audio/lobby.mp3')
let AudioCongrates = new Audio('audio/congrates.mp3')

// MUSIC FUNCTION
function muteAudio() {
    lobbyMusik.muted = true;
    lobbyMusik.pause();
}

function playAudio() {
    lobbyMusik.muted = false;
    lobbyMusik.play();
    lobbyMusik.loop = true;
}
// STARTSEITE
function startScreen() {

}


// ÜBERTRAGUNG DIREKTE FUNKTION 1
function init() {
    document.getElementById('questionamount').innerHTML = question.length;
    document.getElementById("nextbutton").classList.remove('finishhover2');
    document.getElementById('btnblock').classList.remove('btnblock2');
    showQuestion();
    playAudio();
}
// ÜBERTRAGUNG DIREKTE FUNKTION 2
function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= question.length
}
// ÜBERTRAGUNG DIREKTE FUNKTION 3
function showEndScreen() {
    let percent = currentQuestion / question.length;
    percent = Math.round(percent * 100);
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display:none';
    document.getElementById('endScreen').innerHTML = /*html*/`                
        <div class="finishingheader cursornone">Quiz beendet!</div>
        <div class="cursornone footermargin">Du hast
            <b id="amountRightQuestions">XXX</b> Fragen von
            <b id="amountOfQuestions">XXX</b> richtig beantwortet.<br>
        </div>
        <img src="img/finish.png"><br>
        <a href="index.html" onclick="restartGame()" class="finishingbtn">Neustart</a>
    `;
    document.getElementById('amountOfQuestions').innerHTML = question.length;
    document.getElementById('amountRightQuestions').innerHTML = rightQuestions;
    document.getElementById('progress-bar').innerHTML = `${percent}% Herzlichen Glückwunsch! Du hast es geschafft!`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
    document.getElementById('nextbutton').style = 'display:none';

    AudioCongrates.play();
}

function updateProgressBar() {
    let percent = currentQuestion / question.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent}% !`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

function updateToNextQuestion() {
    let questpush = question[currentQuestion];
    document.getElementById('questionamountlive').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = questpush['quest'];
    document.getElementById('answer_1').innerHTML = questpush['answer_1'];
    document.getElementById('answer_2').innerHTML = questpush['answer_2'];
    document.getElementById('answer_3').innerHTML = questpush['answer_3'];
    document.getElementById('answer_4').innerHTML = questpush['answer_4'];
}
// BEANTWORTUNG FUNKTION
function answer(answerselect) {
   
    let questpush = question[currentQuestion];
    let questNumberSelect = answerselect.slice(-1);
    let xyx = `answer_${questpush['rightanswer']}`;

    if (rightAnswerSelected(questNumberSelect)) {
        document.getElementById(answerselect).classList.add('bg-success');
        AudioSuccess.play();
        rightQuestions++;

    } else {
        document.getElementById(answerselect).classList.add('bg-danger');
        document.getElementById(xyx).classList.add('bg-success');
        AudioFail.play();

    }
    document.getElementById('nextbutton').disabled = false;
    document.getElementById("nextbutton").classList.add('finishhover2');
    document.getElementById('btnblock').classList.add('btnblock2');
    
}

function rightAnswerSelected(questNumberSelect){
    let questpush = question[currentQuestion];
    return questNumberSelect == questpush['rightanswer'];
    
}
// NÄCHSTE FRAGE FUNKTION
function nextQuestion() {
    currentQuestion++;
    showQuestion();
    document.getElementById('nextbutton').disabled = true;
    resetAnswerBtn();
    showQuestion();
    document.getElementById('btnblock').classList.remove('btnblock2');
}
// NACH NÄCHSTE FRAGE > RESET
function resetAnswerBtn() {
    document.getElementById('answer_1').classList.remove('bg-success');
    document.getElementById('answer_1').classList.remove('bg-danger');
    document.getElementById('answer_2').classList.remove('bg-success');
    document.getElementById('answer_2').classList.remove('bg-danger');
    document.getElementById('answer_3').classList.remove('bg-success');
    document.getElementById('answer_3').classList.remove('bg-danger');
    document.getElementById('answer_4').classList.remove('bg-success');
    document.getElementById('answer_4').classList.remove('bg-danger');
    document.getElementById("nextbutton").classList.remove('finishhover2');
}

function restartGame() {
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display:none';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}