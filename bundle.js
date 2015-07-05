(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Model = require("./Model.js");
var Controller = require("./Controller.js");

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
        return '<span>' + this.model.name + ': ' + this.model.examsTaken + ' </span><button id="student-exams-button">Increase exams taken</button>';
    },
    clickHandlers: {
        '#student-exams-button': 'updateExams'
    },
    updateExams: function(){
        this.model.takeExam();
    }
});
},{"./Controller.js":2,"./Model.js":3}],2:[function(require,module,exports){
module.exports = function(attributes, testDOM) {
	var document;
	testDOM ? document = testDOM : document = window.document; // for test purposes

	var Controller = Object.create(attributes, {
		checkState: {
			value: function() {
				if (this.model.changed) {
					this.model.checked();
					this.addContent();
				}
			}
		},
		addContent: {
			value: function() {
				var target = document.getElementById(this.elementId);
				var element = this.render();
				target.innerHTML = element;
			}
		},
		addListeners: {
			value: function() {
				var target = document.getElementById(this.elementId);
				Object.keys(this.clickHandlers).map(function(key) {
					var handlerName = this.clickHandlers[key]
					var handler = this[handlerName];	
					target.addEventListener('click', function(e) {
						if (e.target.id == key.slice(1)) {
							handler.call(this);
						}
					}.bind(this));
				}.bind(this));
			}
		}
	});
	
	Controller.addContent();
	Controller.addListeners();
	
	setInterval(function() {
		Controller.checkState();
	}, 100);

	return Controller; 
};
},{}],3:[function(require,module,exports){
module.exports = function(attributes) {
	return Object.create(attributes, {
		changed: {
			value: false,
			writable: true
		},
		checked: {
			value: function() {
				this.changed = false;
			}
		}
	});
};
},{}]},{},[1]);
