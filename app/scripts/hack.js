var days = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

var hours = ['8', '9', '10', '11', '12', '1', '2', '3', '4', '5']
var increments = ['00', '15', '30', '45']

var dayTemplate = _.template($('#days').text())
var incrementTemplate = _.template($('#slots').text())


$(document).ready(function() {

	days.forEach(function(day) {
		$('.schedule').append(dayTemplate({day: day}))
	})

	hours.forEach(function(hour) {
		increments.forEach(function(increment) {
			$('.slots').append(incrementTemplate({options: {
				hour: hour,
				increment: increment
			}}))
		})
	})
	
})