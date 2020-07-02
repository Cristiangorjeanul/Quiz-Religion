document.addEventListener('DOMContentLoaded', function () {

	// Format question
	function FormatQuestion(text, options, answer) {
		this.text = text;
		this.options = options;
		this.answer = answer;
	}
	// If option is correct answer then return true
	FormatQuestion.prototype.correctAnswer = function (option) {
		return this.answer === option;
	};
	// Format questionnaire
	function Questionnaire(questions) {
		// Array of questions
		this.questions = questions;
		// Start quiz with the first question
		this.questionIndex = 0;
		this.score = 0;
	}
	Questionnaire.prototype.currentQuestion = function () {
		return this.questions[this.questionIndex];
	};
	Questionnaire.prototype.checkAnswer = function (answer) {
		if (this.currentQuestion().correctAnswer(answer)) {
			this.score++;
		}
		this.questionIndex++;
	};
	// Check if quiz end is reached
	Questionnaire.prototype.isOver = function () {
		// Return TRUE only after last question
		return this.questionIndex >= this.questions.length;
	};
	// Format questionnaire
	var QuestionnaireFormat = {
		displayNext: function () {
			if (quiz.isOver()) {
				this.showResults();
			} else {
				this.displayQuestion();
				this.displayOptions();
				this.displayState();
				this.displayScore();
			}
		},
		displayQuestion: function () {
			this.fillingWithText('table', quiz.currentQuestion().text);
		},
		displayOptions: function () {
			var options = quiz.currentQuestion().options;
			// Display all options
			for (var i = 0; i < options.length; i++) {
				var optionId = 'option' + i;
				var optionText = options[i];
				this.fillingWithText(optionId, optionText);
				this.checkAnswerOrganizer(optionId, optionText);
			}
		},
		checkAnswerOrganizer: function (id, guess) {
			var button = document.getElementById(id);
			button.onclick = function () {
				quiz.checkAnswer(guess);
				QuestionnaireFormat.displayNext();
			}
		},
		displayScore: function () {
			var scoreText = 'Score: ' + quiz.score;
			this.fillingWithText('score', scoreText);
		},
		displayState: function () {
			var questionNumber = quiz.questionIndex + 1;
			var totalQuestions = quiz.questions.length;
			var showState = 'Page ' + questionNumber + ' of ' + totalQuestions;
			this.fillingWithText('page', showState);
		},
		showResults: function () {
			var grade = quiz.score / quiz.questions.length;
			var results = '<h1>';

			results += '<h1>Final score: <br>' + quiz.score + ' points</h1>';
			if (grade >= 0.8) {
				results += '<h2>Congratulations!<br>The result shows that you know the important events related in the Bible!</h2>';
			} else if (grade < 0.8 && grade > 0.5) {
				results += '<h2>The result shows that you need to read more about the important events related in the Bible!</h2>';
			} else {
				results += '<h2>The result shows that you need to read more about the important events related in the Bible!</h2>';
			}
			results += '<button id="reset">Try Again?</button>';
			this.fillingWithText('questionnaire', results);
			this.resetQuestionnaire();
		},
		resetQuestionnaire: function () {
			var resetBtn = document.getElementById('reset');
			// Restart from the beginning
			resetBtn.onclick = function () {
				window.location.reload(false);
			}
		},
		fillingWithText: function (id, content) {
			var element = document.getElementById(id);
			element.innerHTML = content;
		}
	};
	// Create questions
	var questions = [
		new FormatQuestion('When do we celebrate the Nativity of Jesus Christ?', ['December 6', 'December 24', 'December 25', 'December 31'], 'December 25'),
		new FormatQuestion('Where was our Lord Jesus Christ born?', ['Jerusalem', 'Bethlehem', 'Capernaum', 'Nazareth'], 'Bethlehem'),
		new FormatQuestion('Who baptized our Savior Jesus Christ?', ['Saint John', 'Saint Matthew', 'Saint Simon', 'Saint Paul'], 'Saint John'),
		new FormatQuestion('How many vessels of water did Jesus turn into wine at a wedding?', ['Two vessels', 'Four vessels', 'Five vessels', 'Six vessels'], 'Six vessels'),
		new FormatQuestion('How many disciples did Jesus call to follow Him?', ['4 disciples', '9 disciples', '10 disciples', '12 disciples'], '12 disciples'),
		new FormatQuestion('How many lepers were miraculously healed by Jesus?', ['Two men', 'Four men', 'Ten men', 'Twelve men'], 'Ten men'),
		new FormatQuestion('How many people did Jesus feed after blessing five loaves?', ['Five hundred men', 'Five thousand men', 'Eight thousand men', 'Ten thousand men'], 'Five thousand men'),
		new FormatQuestion('Where did the Transfiguration of the Lord Jesus take place?', ['Sea of ​​Galilee', 'The Mount of Olives', 'Jordan River', 'Mount Tabor'], 'Mount Tabor'),
		new FormatQuestion('How many Gospels are found in the Bible?', ['Two Gospels', 'Four Gospels', 'Five Gospels', 'Twelve Gospels'], 'Four Gospels'),
		new FormatQuestion('Which is the most important religious holiday of Christianity?', ['The birth of Jesus', 'The Ascension of Jesus ', 'The Resurrection of Jesus', 'The Descent of the Holy Spirit'], 'The Resurrection of Jesus')
	];
	// Questionnaire initialization
	var quiz = new Questionnaire(questions);
	QuestionnaireFormat.displayNext();

});