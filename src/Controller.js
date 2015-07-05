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