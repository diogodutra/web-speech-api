var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
//var voiceSelect = document.querySelector('select');
//var inputTxt = document.querySelector('.triangle-border');
var dialogBox = document.getElementById('triangle-border');

//var pitch = document.querySelector('#pitch');
//var pitchValue = document.querySelector('.pitch-value');
//var rate = document.querySelector('#rate');
//var rateValue = document.querySelector('.rate-value');

var voices = [];

//var scoreTxt = document.querySelector('rubberBand');
//scoreTxt.addClass('playing');
//$('#cardRight').removeClass('playing');
//triggerAnimation



var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var iTurn = 0;
var repetitions = 0;

var conversation = new Array();

const professora = 'Microsoft Maria Desktop - Desktop(Brazil)';
const man1 = 'Google UK English Male';
const lady1 = 'Google UK English Female';
const user = 'user'

var conversationCorrection = new Array();
conversationCorrection.push({name: professora, phrase: 'Repita'});
conversationCorrection.push({name: '', phrase: ''});
conversationCorrection.push({name: user, phrase: ''});

var conversation1 = new Array();
conversation1.push({name: 'professora', phrase: 'Aula de conversação 1.'});
conversation1.push({name: 'professora', phrase: 'Uma senhora pede informação.'});
conversation1.push({name: 'lady1', phrase: 'Excuse me. Do you know where is the restaurant?'});
conversation1.push({name: 'student', phrase: 'No, I don\'t.'});
conversation1.push({name: 'professora', phrase: 'Ela insiste.'});
conversation1.push({name: 'lady1', phrase: 'Well, I think it is near the pool. Do you know where the pool is?'});
conversation1.push({name: 'student', phrase: 'Sorry.'});
conversation1.push({name: 'lady1', phrase: 'Ok, thanks. Bye.'});
conversation1.push({name: 'student', phrase: 'Bye.'});
conversation1.push({name: 'professora', phrase: 'Fim da aula 1.'});


var conversation2 = new Array();
conversation2.push({name: professora, phrase: 'Aula de conversação 2.'});
conversation2.push({name: man1, phrase: 'Portuguese.'});
conversation2.push({name: user, phrase: 'Portuguese.', score:2});
conversation2.push({name: man1, phrase: 'Portuguese.'});
conversation2.push({name: user, phrase: 'Portuguese.', score:1});
//conversation2.push({name: man1, phrase: '2.'});
//conversation2.push({name: user, phrase: '2.'});
//conversation2.push({name: man1, phrase: 'Portuguese.'});
//conversation2.push({name: user, phrase: 'Portuguese.', score:2});
conversation2.push({name: professora, phrase: 'Aula de conversação 2.'});
conversation2.push({name: professora, phrase: 'Escute essa conversa em inglês.'});
conversation2.push({name: man1, phrase: 'Excuse me miss. Do you understand Portuguese?'});
conversation2.push({name: lady1, phrase: 'No sir. I don\'t understand Portuguese.'});
conversation2.push({name: man1, phrase: 'I understand a little English.'});
conversation2.push({name: lady1, phrase: 'Are you Brazilian?'});
conversation2.push({name: man1, phrase: 'Yes miss.'});
conversation2.push({name: professora, phrase: 'Em alguns minutos você entenderá essa conversa e participará dela.'});
conversation2.push({name: professora, phrase: 'Imagine um brasileiro na Inglaterra sentado ao lado de uma jovem.'});
conversation2.push({name: professora, phrase: 'Ele tenta conversar com ela.'});
conversation2.push({name: professora, phrase: 'Então ele diz com licença.'});
conversation2.push({name: professora, phrase: 'Apenas escute.'});
conversation2.push({name: man1, phrase: 'Excuse me.'});
conversation2.push({name: professora, phrase: 'Escute e repita.'});
conversation2.push({name: man1, phrase: 'Excuse.'});
conversation2.push({name: user, phrase: 'Excuse.'});
conversation2.push({name: man1, phrase: 'Me.'});
conversation2.push({name: user, phrase: 'Me.'});
conversation2.push({name: man1, phrase: 'Excuse me.'});
conversation2.push({name: user, phrase: 'Excuse me.'});
conversation2.push({name: professora, phrase: 'Como se diz com licença ou desculpe me em inglês?'});
conversation2.push({name: user, phrase: 'Excuse me.', score: 1});
conversation2.push({name: professora, phrase: 'Agora ele pergunta à moça se ela entende português.'});
conversation2.push({name: professora, phrase: 'Primeiro português.'});
conversation2.push({name: professora, phrase: 'Apenas escute.'});
conversation2.push({name: man1, phrase: 'Portuguese.'});
conversation2.push({name: professora, phrase: 'Escute e repita.'});
conversation2.push({name: man1, phrase: 'Port.'});
conversation2.push({name: user, phrase: 'Port.'});
conversation2.push({name: man1, phrase: '2.'});
conversation2.push({name: user, phrase: '2.'});
conversation2.push({name: man1, phrase: 'Portuguese.'});
conversation2.push({name: user, phrase: 'Portuguese.'});
conversation2.push({name: professora, phrase: 'Como se diz português na língua inglesa?'});
conversation2.push({name: user, phrase: 'Portuguese.', score: 1});
conversation2.push({name: professora, phrase: 'Diga com licença.'});
conversation2.push({name: user, phrase: 'Excuse me.', score: 1});
conversation2.push({name: professora, phrase: 'Agora ele quer perguntar. você entende.'});
conversation2.push({name: professora, phrase: 'Você entende?'});
conversation2.push({name: professora, phrase: 'Apenas escute primeiro a palavra entende.'});
conversation2.push({name: man1, phrase: 'Understand.'});
conversation2.push({name: professora, phrase: 'Escute e repita.'});
conversation2.push({name: man1, phrase: 'Under.'});
conversation2.push({name: user, phrase: 'Under.'});
conversation2.push({name: man1, phrase: 'Stand.'});
conversation2.push({name: user, phrase: 'Stand.'});
conversation2.push({name: man1, phrase: 'Understand.'});
conversation2.push({name: user, phrase: 'Understand.'});
conversation2.push({name: professora, phrase: 'Como se diz entende em inglês?'});
conversation2.push({name: user, phrase: 'Understand.', score: 1});
conversation2.push({name: professora, phrase: 'Escute como se diz você entende.'});
conversation2.push({name: man1, phrase: 'You understand.'});
conversation2.push({name: professora, phrase: 'Escute e repita.'});
conversation2.push({name: man1, phrase: 'You.'});
conversation2.push({name: user, phrase: 'You.'});
conversation2.push({name: man1, phrase: 'You understand.'});
conversation2.push({name: user, phrase: 'You understand.'});
conversation2.push({name: professora, phrase: 'Como se diz você em inglês?'});
conversation2.push({name: user, phrase: 'You.', score: 1});
conversation2.push({name: professora, phrase: 'Você se lembra de como se diz português?'});
conversation2.push({name: user, phrase: 'Portuguese.', score: 1});
conversation2.push({name: professora, phrase: 'Diga você entende.'});
conversation2.push({name: user, phrase: 'You understand.', score: 1});
conversation2.push({name: professora, phrase: 'Agora tente dizer. Você entende português.'});
conversation2.push({name: user, phrase: 'You understand portuguese.', score: 2});
conversation2.push({name: professora, phrase: 'Esta é uma palavra usada para fazer perguntas em inglês.'});
conversation2.push({name: man1, phrase: 'Do.'});
conversation2.push({name: professora, phrase: 'Escute e repita.'});
conversation2.push({name: man1, phrase: 'Do.'});
conversation2.push({name: user, phrase: 'Do.'});
conversation2.push({name: professora, phrase: 'Em inglês, muitas afirmações podem ser transformadas em perguntas pondo essa palavra no início da frase.'});
conversation2.push({name: professora, phrase: 'Diga outra vez. Você entende.'});
conversation2.push({name: user, phrase: 'You understand.', score: 1});
conversation2.push({name: professora, phrase: 'Agora tente perguntar. Você entende?'});
conversation2.push({name: user, phrase: 'Do you understand?', score: 2});
conversation2.push({name: professora, phrase: 'Diga. Com licença.'});
conversation2.push({name: user, phrase: 'Excuse me.', score: 1});
conversation2.push({name: professora, phrase: 'Pergunte me se eu entendo.'});
conversation2.push({name: user, phrase: 'Do you understand?', score: 1});
conversation2.push({name: professora, phrase: 'Agora pergunte me se eu entendo português.'});
conversation2.push({name: user, phrase: 'Do you understand portuguese?', score: 2});
conversation2.push({name: professora, phrase: 'A moça responde. Não. Escute'});
conversation2.push({name: lady1, phrase: 'No.'});
conversation2.push({name: professora, phrase: 'Escute e repita.'});
conversation2.push({name: lady1, phrase: 'No.'});
conversation2.push({name: user, phrase: 'No.'});
conversation2.push({name: professora, phrase: 'Agora ela vai dizer. Não, senhor.'});
conversation2.push({name: lady1, phrase: 'No, sir.'});
conversation2.push({name: professora, phrase: 'Escute e repita.'});
conversation2.push({name: lady1, phrase: 'Sir.'});
conversation2.push({name: user, phrase: 'Sir.'});
conversation2.push({name: lady1, phrase: 'No, sir.'});
conversation2.push({name: user, phrase: 'No, sir.'});
conversation2.push({name: professora, phrase: 'Como se diz senhor?'});
conversation2.push({name: user, phrase: 'Sir.', score:1});
conversation2.push({name: professora, phrase: 'Diga. Não.'});
conversation2.push({name: user, phrase: 'No.'});
conversation2.push({name: professora, phrase: 'Diga. Não, senhor.'});
conversation2.push({name: user, phrase: 'No, sir.', score:1});
conversation2.push({name: professora, phrase: 'Diga. Com licença, senhor.'});
conversation2.push({name: user, phrase: 'Excuse me, sir.', score:1});
conversation2.push({name: professora, phrase: 'Como você pergunta a alguém se ele entende?'});
conversation2.push({name: user, phrase: 'Do you understand?', score: 1});
conversation2.push({name: professora, phrase: 'Me pergunte se eu entendo português.'});
conversation2.push({name: user, phrase: 'Do you understand portuguese?', score: 1});
conversation2.push({name: professora, phrase: 'O homem diz a você. Eu entendo.'});
conversation2.push({name: professora, phrase: 'Primeiro a palavra eu. Escute.'});
conversation2.push({name: lady1, phrase: 'I.'});
conversation2.push({name: professora, phrase: 'Escute e repita.'});
conversation2.push({name: lady1, phrase: 'I.'});
conversation2.push({name: user, phrase: 'I.'});
conversation2.push({name: professora, phrase: 'Agora diga. Eu entendo.'});
conversation2.push({name: user, phrase: 'I understand.', score:1});
conversation2.push({name: professora, phrase: 'Tente dizer. Eu entendo português.'});
conversation2.push({name: user, phrase: 'I understand portuguese.', score:2});
conversation2.push({name: professora, phrase: 'Agora diga. Você entende.'});
conversation2.push({name: user, phrase: 'You understand.', score:1});
conversation2.push({name: professora, phrase: 'Diga. Eu entendo.'});
conversation2.push({name: user, phrase: 'I understand.'});
conversation2.push({name: professora, phrase: 'Diga. Com licença.'});
conversation2.push({name: user, phrase: 'Excuse me.', score:1});
conversation2.push({name: professora, phrase: 'Pergunte. Você entende?'});
conversation2.push({name: user, phrase: 'Do you understand?', score: 1});
conversation2.push({name: professora, phrase: 'Pergunte à moça. Você entende português?'});
conversation2.push({name: user, phrase: 'Do you understand portuguese?', score: 1});
conversation2.push({name: professora, phrase: 'Como ela responde não senhor?'});
conversation2.push({name: user, phrase: 'No, sir.', score:1});
conversation2.push({name: professora, phrase: 'Como se diz eu entendo?'});
conversation2.push({name: user, phrase: 'I understand.', score:1});
conversation2.push({name: professora, phrase: 'Agora ela quer dizer. Eu não entendo.'});
conversation2.push({name: professora, phrase: 'Fim da aula 2.'});



var voicesAll = new Array();

var rightAnswer = 'I heard the correct phrase!';
var wrongAnswer =  'That didn\'t sound right.';
var firstMistake = -1;
var firstMistakeWord = [];

var phrasePara = document.querySelector('.phrase');
var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');

var testBtn = document.querySelector('#microphone');
var rewindBtn = document.querySelector('#rewindBtn');

var voiceMan;
var voiceLady;
var voiceProf;




function populateVoiceList() {
  voices = synth.getVoices();
  //var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  //voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    //voiceSelect.appendChild(option);
	
	if (voices[i].name === professora) {voiceProf = voices[i];}
	if (voices[i].name === lady1) {voiceLady = voices[i];}
	if (voices[i].name === man1) {voiceMan = voices[i];}
  }
  //voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function say(actor_phrase) {
	//inputTxt.value = actor_phrase.phrase;
	dialogBox.innerHTML = actor_phrase.phrase;
	voiceActor = actor_phrase.name;
	speak();
}

function speak(){
	window.utterances = [];
	
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    //if (inputTxt.value !== '') {
    if (dialogBox.innerHTML !== '') {
		//var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
		var utterThis = new SpeechSynthesisUtterance(dialogBox.innerHTML);
		utterThis.onend = function (event) {
			console.log('SpeechSynthesisUtterance.onend');
			
			resumeChat();
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    //var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    //for(i = 0; i < voices.length ; i++) {
    //  if(voices[i].name === selectedOption) {
    //    utterThis.voice = voices[i];
    //  }
    //}
	
	//DD
	utterThis.voice = voices[19];
	//if (conversation[iTurn].name == professora) utterThis.voice = voices[19];
	//if (conversation[iTurn].name == lady1) utterThis.voice = voices[0];
	//if (conversation[iTurn].name == man1) utterThis.voice = voices[8];
	/*
	if (trainPhrase) {
		if (conversationCorrection[iTurn].name == professora) utterThis.voice = voiceProf;
		if (conversationCorrection[iTurn].name == lady1) utterThis.voice = voiceLady;
		if (conversationCorrection[iTurn].name == man1) utterThis.voice = voiceMan;
	} else {
		if (conversation[iTurn].name == professora) utterThis.voice = voiceProf;
		if (conversation[iTurn].name == lady1) utterThis.voice = voiceLady;
		if (conversation[iTurn].name == man1) utterThis.voice = voiceMan;
		
	}
	*/
	if (voiceActor == professora) utterThis.voice = voiceProf;
	if (voiceActor == lady1) utterThis.voice = voiceLady;
	if (voiceActor == man1) utterThis.voice = voiceMan;
	
    utterThis.pitch = 1.0;//pitch.value;
    utterThis.rate = 1.0;//rate.value;
	
	utterances.push(utterThis);//DD
    synth.speak(utterThis);
  }
}



function repeatSyllables(json_syllables) {
	console.log('repeatSyllables', json_syllables);
	
	for (i = 0; i < json_syllables.count; i++) {
		say(json_syllables.list[i]);
		listen(json_syllables.list[i]);
	}
}

function getSyllables(word) {
	nSyllables = 0;
	
	const url = 'https://wordsapiv1.p.mashape.com/words/' + word + '/syllables';
	
	fetch(url, {
		method: 'GET',
		headers: {
		'X-Mashape-Key': 'rQFMGPDcBUmsh2AkqtjiGcMSIqCIp1tpqbDjsnah4TjpjAoMK9',
		'Accept': 'application/json'
		}
	})
	.then(function(res) {
	// Here you get the data to modify as you please
	
		if (res.ok) {
			res.json().then(function(data) {
				console.log('getSyllables', word, data.syllables);
				
				iSyllables = 0;
				nSyllables = data.syllables.count;
				json_syllables = data.syllables;
				//repeatSyllables(data.syllables)
		
				resumeChat();
			});
		} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		
			resumeChat();
		}
		
		//resumeChat();
	})
	.catch(function(error) {
		// If there is any error you will catch them here
		
		resumeChat(); //BUG falta tratar erros
	});
}

function animScore(phrase, score) {
	var str = ' ponto';
	if (score>1) {str = str + 's'}
	document.getElementById('scorePoints').innerHTML = '+' + score + str;
	document.getElementById('scorePhrase').innerHTML = phrase;
	$('#scoreBox').addClass('scoring');
	
	setTimeout(function(){
		$('#scoreBox').removeClass('scoring');
	}, 2000);
}

function PrepareForComparison(str) {
  str = str.toLowerCase();
  str = str.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');
  str = str.replace(/\s{2,}/g," ");
  return str;
}

var recognition = new SpeechRecognition();

function listen(objConversation) {
  saidCorrectly = false;
  //testBtn.disabled = true;
  //testBtn.textContent = 'Test in progress';

  //phrasePara.textContent = phrase;
  //resultPara.textContent = 'Right or wrong?';
  //resultPara.style.background = 'rgba(0,0,0,0.2)';
  //diagnosticPara.textContent = '...diagnostic messages';
  
  var phrase = objConversation.phrase;

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  //var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
    var speechResult = event.results[0][0].transcript;
    //diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
	console.log('Speech received: ' + speechResult + '.');
    //if(speechResult === phrase) {
	speechResult = PrepareForComparison(speechResult)
	phrase = PrepareForComparison(phrase)
    if(speechResult == phrase) {
	  saidCorrectly = true;
      //resultPara.textContent = 'I heard the correct phrase!';
      //resultPara.style.background = 'lime';
	  
	  if (objConversation.hasOwnProperty('score')) {
		animScore(phrase, objConversation.score);		  
	  }
    } else {
	  console.log('Speech result: ' + phrase + ' <> ' + speechResult);
				
      //resultPara.textContent = 'That didn\'t sound right.';
      //resultPara.style.background = 'red';
	  splitSpeech = speechResult.split(" ");
	  splitPhrase = phrase.split(" ");
	  //if (splitPhrase.length == 1) {
		//difficulties speaking 1 particular word
		//askTrainSyllables();
	  //} else {
		//difficulties speaking word(s) inside a phrase
		//firstMistake = -1;
		askTrainPhrase(phrase);
		/*
		firstMistakeWord = [];
		for (i=0; i<splitPhrase.length; i++) {
		   if (splitPhrase[i] != splitSpeech[i]) {
				//firstMistakeIndex =  i;
				firstMistakeWord = splitPhrase[i];
				askTrainWord(firstMistakeWord);
				break;
			} 
		}
		*/
		  //repeatWord(firstMistakeWord);
		  
		  //resumeChat(); //no correction
	  //}
    }
	
	resumeChat(); //DD

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    //testBtn.disabled = false;
    //testBtn.textContent = 'Start new test';
  }

  recognition.onerror = function(event) {
    //testBtn.disabled = false;
    //testBtn.textContent = 'Start new test';
    //diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
	
	
	askTrainPhrase(phrase);
	
	resumeChat(); //DD
  }
  
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
	
	//resumeChat(); //DD BUG chat continua se ficar quieto, deveria inisitir treinamento se aplicavel
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
}





function askTrainSyllables() {
	trainSyllables = true;
}

function askTrainWord(word) {
	trainWord = true;
	wordToBeTrained = word;
	//iTurn--;
	if (iTurn<0) {iTurn=0;}
}

function repeatWord(word) {
	listen(conversation[iTurn-1]);
}

function cancelTrainPhrase() {
	repetitions = 0;
	trainPhrase = false;
}

function askTrainPhrase(phrase) {
	if (repetitions < 2) {
		trainPhrase = true;
		wordToBeTrained = phrase;
		repetitions++;
		//iTurn--;
	if (iTurn<0) {iTurn=0;}
	} else {
		cancelTrainPhrase();
	}
}

function rewindChat() {
	//pauseChat();
	//synth.cancel();
	//iTurn = 0;
	//playChat();
	//restartChat();
	
	
	pauseChat();
	
	setTimeout(function(){
		iTurn = 0;
		playChat();
	},1000);
}

function pauseChat() {
	chatPaused = true;
    var recognition = new SpeechRecognition();
	recognition.abort();
	recognition.stop();
	synth.cancel();
	oneBackChat();
}

function oneBackChat() {
	iTurn--;
	if (iTurn < 0) {
		iTurn = 0;
	}
}

function playChat() {	
	chatPaused = false;
	
	/*
	if (conversation[iTurn].name == user) {
		iTurn--;
	}
	
	if (iTurn < 0) {
		iTurn = 0;
	}
	*/
	
	resumeChat();
	//synth.resume();
}

function restartChat() { 
  playChat();

  iTurn = 0;//nao deveria dar bug
  
  //askTrainWord('Important');
  //wordToBeTrained = 'Understand';
  //askTrainSyllables();
	
  conversation = conversation2;
	
  resumeChat();
  
	//$(".box").toggleClass("hovered");
	//$(".box").hovered;
	//$('.box').addClass('hovered');
	//$('scoreBox').addClass('hover');
	//$('.box').addClass('hover');
	//$(".box").css("color", "ccff00");
	//var scoreBox = document.getElementById('scoreBox');
	//scoreBox.addClass('hover');
}

var chatPaused = false;
var iTurn_old = 0;
var trainWord = false;
var trainSyllables = false;
var trainPhrase = false;
var wordToBeTrained;
var state = 'resuming';
var iSyllables = 0;
var nSyllables = 0;
var json_syllables;
var saidCorrectly = false;
function resumeChat() {
  $('#cardLeft').removeClass('playing');
  $('#cardRight').removeClass('playing');
	
  if (!chatPaused) {
			
	if (trainSyllables) {
		if (state == 'resuming') {
			getSyllables(wordToBeTrained);
			state = 'waitingSyllables';
			iSyllables = 0;
		} else if (state =='waitingSyllables' || state =='sayingSyllable') {
			if (nSyllables == 0) {
				//problem BUG falta tratar
				state = 'resuming';
				trainSyllables = false;
			} else {
				say(json_syllables.list[iSyllables]);
				state = 'listeningSyllable';
			}
		} else {
			saidCorrectly = false;
			listen(json_syllables.list[iSyllables]);
			state = 'sayingSyllable';
			if (saidCorrectly) {
				iSyllables++;
			}
			if (iSyllables == nSyllables) {
				trainSyllables = false;
				state = 'resuming';
			//} else {
			//	resumeChat();
			}
		}
		
	} else if (trainWord) {
		if (state=='resuming') {
			iTurn--;
			state = 'haltingClass';
		}
		if (state=='haltingClass') {
			state = 'repeatingWord';
			say(wordToBeTrained);
		} else if(state=='repeatingWord') {
			state = 'haltingWord';
			say(wordToBeTrained);
		} else {
			state = 'resuming';
			trainWord = false;
			listen(wordToBeTrained);
		}
		
	} else if (trainPhrase) {
		if (state == 'resuming') {
			//iTurn--;
			//iTurn--;
			//iTurn_old = iTurn;
			//iTurn = 0;
			state = 'haltingClass';
			conversationCorrection[1].name = man1;
			conversationCorrection[1].phrase = conversation[iTurn-1].phrase;
			conversationCorrection[2].phrase = conversation[iTurn-1].phrase;
			if ((conversation[iTurn-2].name!=professora) && (conversation[iTurn-2].name!=user)) {
				conversationCorrection[1].name = conversation[iTurn-2].name;
			}
		}
		if (state == 'haltingClass') {
			say(conversationCorrection[0]);
			state = 'repeatingPhrase';
		} else if (state == 'repeatingPhrase') {
			say(conversationCorrection[1]);
			state = 'listeningPhrase';
		} else if (state == 'listeningPhrase') {
			listen(conversationCorrection[2])
			trainPhrase = false;
			//iTurn = iTurn_old;
			//iTurn++;
			state = 'resuming';
		}
		
	} else if (iTurn < conversation.length) {
		//setTimeout(function(){
		if (conversation[iTurn].name == user) {
			listen(conversation[iTurn]);
		} else {
			if (conversation[iTurn].name == lady1) {				
				$('#cardLeft').addClass('playing');
			}
			if (conversation[iTurn].name == man1) {				
				$('#cardRight').addClass('playing');
			}
			say(conversation[iTurn]);
		}
		
		iTurn++;
		//}, 0000);
	} else {
		//end of conversation
	}
	
  }
}

rewindBtn.addEventListener('click', function(){
	//pauseChat();
	//playChat();
	//restartChat();
	rewindChat();
});

//testBtn.addEventListener('click', restartChat);
setTimeout(function(){
	restartChat();
},500);

//inputForm.onsubmit = function(event) {
//  event.preventDefault();

//  speak();

  //inputTxt.blur();
//  dialogBox.blur();
//}

//pitch.onchange = function() {
//  pitchValue.textContent = pitch.value;
//}

//rate.onchange = function() {
//  rateValue.textContent = rate.value;
//}

//voiceSelect.onchange = function(){
//  speak();
//}

var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/Lecrae_-_Anomaly_(Lyric_Video).mp3');
audio.volume = 0.1;
//audio.play();

//$('#cardLeft').css('background-image', 'url(http://static1.squarespace.com/static/530b728de4b04fc9b23a5988/t/569880381a5203aa7d44c1a8/1452834873397/00.jpg?format=1000w)');
$('#cardLeft').removeClass('playing');
$('#cardRight').removeClass('playing');

/*
$('.trigger').click(function() {
  if (audio.paused == false) {
      audio.pause();
      $('.fa-play').show();
      $('.fa-pause').hide();
      $('.music-card').removeClass('playing');
  } else {
      audio.play();
      $('.fa-pause').show();
      $('.fa-play').hide();
      $('.music-card').addClass('playing');
  }
});
*/

//$('#scoreBox').addClass('scoring');

$(document).ready( function () {
  $('.button').on('click', function () {
    $(this).toggleClass('active');
	
	if (this.id == 'play') {
		if ($(this).hasClass('active')) {
			playChat();
		} else {
			pauseChat();
		}		
	}
  });
});

