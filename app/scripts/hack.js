var dayTemplate = _.template($('#days').text())

var weekTracker = 0;

$(document).ready(function() {

	displayWeeks(0)

	upDown('up');
	upDown('down');
	
})

function upDown(direction) {
	$('.' + direction).click(function() {

		if (direction === 'up') {

			var firstDay = $('.schedule').children().first().children().first().children().last().text();
			var today = moment().format('MMM') + ' ' + moment().format('D');

			if (firstDay !== today) {
				
				weekTracker -= 1;

				$('.schedule').html('');

				displayWeeks(Math.abs(weekTracker * 14))

			}

		} else {
				weekTracker += 1;

				$('.schedule').html('');

				displayWeeks(Math.abs(weekTracker * 14))

		}
			$('.wrapper').append('<div class="cf"></div>')
	})
}


function displayWeeks(start) {

	for (i = start; i < (start + 14); i++) {

		var options = {
			day:   moment().day(moment().day() + i).format('dd'),
			month: moment().day(moment().day() + i).format('MMM'),
			date:  moment().day(moment().day() + i).format('D')
		}

		$('.schedule').append(dayTemplate({options: options}))

		if (($('.weekday').length === 7 || $('.weekday').length === 14) && i !== 0) {
			$('.schedule').children().last().css('margin-right', '0')
		}

		$('.wrapper').append('<div class="cf"></div>')

	}
}




