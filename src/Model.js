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