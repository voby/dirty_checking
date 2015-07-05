var assert = require("chai").assert;
var Controller = require("../src/Controller.js");
var Model = require("../src/Model.js");
var jsdom = require("jsdom").jsdom;

var document = jsdom('<div id="student-container"></div>').defaultView.document;

function getStudentController() {
	var Student = new Model({
		name: 'Piotr',
		age: 22,
		year: 5,
		examsTaken: 2,
		takeExam: function(){
			this.examsTaken++;
			this.changed = true;
		}
	});

	var StudentController = new Controller({
		model: Student,
		elementId: 'student-container',
		render: function(){
			return '<span>' + this.model.name + '</span><button id="student-exams-button">Increase exams taken</button>';
		},
		clickHandlers: {
		    '#student-exams-button': 'updateExams'
		},
		updateExams: function(){
		    this.model.takeExam();
		}
	}, document);

	return StudentController;
}

describe("Controller test", function() {
	var StudentController = getStudentController();

	it("addContent creates new elements", function() {
		var target = document.getElementById('student-container');
		assert.isTrue(!!target.firstChild);
	})

	it("Button increments examsTaken", function() {
		var button = document.getElementById("student-exams-button");
		button.click();
		var three = StudentController.model.examsTaken;
		assert.equal(three, 3);
		button.click();
		var four = StudentController.model.examsTaken;
		assert.equal(four, 4);
	})
});