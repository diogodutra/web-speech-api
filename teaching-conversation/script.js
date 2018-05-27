var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

//var pitch = document.querySelector('#pitch');
//var pitchValue = document.querySelector('.pitch-value');
//var rate = document.querySelector('#rate');
//var rateValue = document.querySelector('.rate-value');

var voices = [];




var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var iTurn = 0;
var conversation = new Array();

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
conversation2.push({name: 'professora', phrase: 'Aula de conversação 2.'});
conversation2.push({name: 'professora', phrase: 'Escute essa conversa em inglês.'});
conversation2.push({name: 'man1', phrase: 'Excuse me miss. Do you understand Portuguese?'});
conversation2.push({name: 'lady1', phrase: 'No sir. I don\'t understand Portuguese.'});
conversation2.push({name: 'man1', phrase: 'I understand a little English.'});
conversation2.push({name: 'lady1', phrase: 'Are you Brazilian?'});
conversation2.push({name: 'man1', phrase: 'Yes miss.'});
conversation2.push({name: 'professora', phrase: 'Em alguns minutos você entenderá tudo e participará dessa conversa.'});
conversation2.push({name: 'professora', phrase: 'Imagine um brasileiro na Inglaterra sentado ao lado de uma jovem.'});
conversation2.push({name: 'professora', phrase: 'Ele tenta conversar com ela.'});
conversation2.push({name: 'professora', phrase: 'Então ele diz com licença.'});


var rightAnswer = 'I heard the correct phrase!';
var wrongAnswer =  'That didn\'t sound right.';

var phrasePara = document.querySelector('.phrase');
var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');

var testBtn = document.querySelector('#microphone');





function populateVoiceList() {
  voices = synth.getVoices();
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  selectedIndex = selectedIndex + 8;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function say(phrase) {
	inputTxt.value = phrase;
	speak();
}

function speak(){
	window.utterances = [];
	
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
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
	if (conversation[iTurn].name == 'professora') utterThis.voice = voices[19];
	if (conversation[iTurn].name == 'lady1') utterThis.voice = voices[0];
	if (conversation[iTurn].name == 'man1') utterThis.voice = voices[8];
	
    utterThis.pitch = 1.0;//pitch.value;
    utterThis.rate = 1.0;//rate.value;
	
	utterances.push(utterThis);//DD
    synth.speak(utterThis);
  }
}







function PrepareForComparison(str) {
  str = str.toLowerCase();
  str = str.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');
  str = str.replace(/\s{2,}/g," ");
  return str;
}

function listen(phrase) {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  phrasePara.textContent = phrase;
  resultPara.textContent = 'Right or wrong?';
  resultPara.style.background = 'rgba(0,0,0,0.2)';
  diagnosticPara.textContent = '...diagnostic messages';

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  var recognition = new SpeechRecognition();
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
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
    //if(speechResult === phrase) {
    if(PrepareForComparison(speechResult) == PrepareForComparison(phrase)) {
      resultPara.textContent = 'I heard the correct phrase!';
      resultPara.style.background = 'lime';
    } else {
      resultPara.textContent = 'That didn\'t sound right.';
      resultPara.style.background = 'red';
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
	
	resumeChat(); //DD
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
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


function restartChat() {  
  iTurn = 0;//nao deveria dar bug
  resumeChat();
}

function resumeChat() {
	
	conversation = conversation1;
	
	if (iTurn<conversation.length) {
		//setTimeout(function(){
		if (conversation[iTurn].name == 'student') {
			listen(conversation[iTurn].phrase);
		} else {
			say(conversation[iTurn].phrase);
		}
		
		iTurn++;
		//}, 0000);
	} else {
		//end of conversation
	}
	
}



testBtn.addEventListener('click', restartChat);

inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}

//pitch.onchange = function() {
//  pitchValue.textContent = pitch.value;
//}

//rate.onchange = function() {
//  rateValue.textContent = rate.value;
//}

//voiceSelect.onchange = function(){
//  speak();
//}






