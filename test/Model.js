var assert = require("chai").assert;
var Model = require("../src/Model.js");

function getStudent () {
	return new Model({
		name: 'Piotr',
		age: 22,
		year: 5,
		examsTaken: 2,
		takeExam: function(){
			this.examsTaken++;
			this.changed = true;
		}
	});
}

describe("Model test", function() {
	it("Instance has attributes", function() {
		var Student = getStudent();
		var name = Student.name;
		assert.equal(name, "Piotr");
	})

	it("Model is not cnahged by default", function() {
		var Student = getStudent();
		var changed = Student.changed;
		assert.isFalse(changed);
	})

	it("Methods can change attributes", function() {
		var Student = getStudent();
		var beforeExamsTaken = Student.examsTaken;	
		Student.takeExam();	
		var afterExamsTaken = Student.examsTaken;
		assert.notEqual(beforeExamsTaken, afterExamsTaken);
	})

	it("Method 'checked' does his job", function() {
		var Student = getStudent();
		Student.takeExam();	
		var changed = Student.changed;
		assert.isTrue(changed);
		Student.checked();
		var changed = Student.changed;
		assert.isFalse(changed);
	})
});