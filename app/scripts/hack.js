$(document).ready(function() {
	var setMonths = monthSetter(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

	// var appendStuff = appendToDom(daysAndYears(setMonths(moment().format('MMMM'))))

	changeDate(daysAndYears(setMonths(moment().format('MMMM')))[0], parseInt(moment().format('D')))

	var changeMonth = appendNextMonth(daysAndYears(setMonths(moment().format('MMMM'))))
	var changeDay = appendNextNumber(daysAndYears(setMonths(moment().format('MMMM'))))	

	buttonClick('month-up',   changeMonth, +1)
	buttonClick('month-down', changeMonth, -1)
	buttonClick('days-up',    changeDay,   +1)
	buttonClick('days-down',  changeDay,   -1)

	// appendStuff('month')
	// appendStuff('days')
	// appendStuff('year')
})

function buttonClick(target, fun, operator) {
	$('.' + target).on('mousedown', function(e) {
		fun(operator)

		var handler = setInterval(function() {
			console.log(operator)
			fun(operator)

		}, 175)

		$('.' + target).one('mouseup', function() {
			clearInterval(handler)
		})		

	})
}

// function appendToDom(data) {
// 	console.log('data ', data)
// 	return function(el) {
// 		return _.each(data, function(month) {
// 			$('.' + el).append('<div>' + month[el] + '</div>')
// 		})
// 	}
// }

function checkLastDay(month) {
	dayVal = parseInt($('.current-day').text());
	dayMax = month.days

	if (dayVal > dayMax) {
		dayVal = dayMax;
	}

	return dayVal
}

function changeDate(month, dayVal) {

	var previousDayVal = dayVal - 1;
	var currentDayVal = dayVal;
	var nextDayVal = dayVal + 1;

	if (month.previousMonth.month === '' && dayVal <= parseInt(moment().format('D'))) {
		previousDayVal = '';
		currentDayVal = parseInt(moment().format('D'));
		nextDayVal = currentDayVal + 1;
	}

	if (currentDayVal === 1 && month.previousMonth.month !== '') {
		previousDayVal = month.previousMonth.days;
	}

	if (currentDayVal === month.days) {

		if (month.nextMonth.month !== '') {
			nextDayVal = 1;	
		} else {
			nextDayVal = '';	
		}
	}

	// set previous month and day
	$('.previous-month').text(month.previousMonth.month)
	$('.previous-day').text(previousDayVal)

	// set current month and day
	$('.current-month').text(month.month)
	$('.current-day').text(currentDayVal)

	// set next month and day
	$('.next-month').text(month.nextMonth.month)
	$('.next-day').text(nextDayVal)

	// set year
	$('.current-year').text(month.year)
}

function appendNextMonth(data) {
	return function(direction) {
		var relative = $('.current-month').text();
		var month = _.find(data, function(month) {return month.month === relative})
		var index = data.indexOf(month)

		if (existy(data[index + direction])) {
			var newMonth = data[index + direction]
			return changeDate(newMonth, checkLastDay(newMonth))
		}

		return
	}
}

function appendNextNumber(data) {
	return function(direction) {
		var monthName = $('.current-month').text();
		var relative = parseInt($('.current-day').text());
		var month = _.find(data, function(month) {return month.month === monthName})
		var index = data.indexOf(month)

		if (index === 0 && direction < 0 && relative === parseInt(moment().format('D'))) {
			return
		}

		if ((relative + direction) < 1) {
			if (index > 0) {
				return changeDate(data[index - 1], data[index - 1].days)
			} else {
				return
			}
		}

		if ((relative + direction) > month.days) {
			if (index < (data.length - 1)) {
				return changeDate(data[index + 1], 1)
			} else {
				return
			}
		}

		return changeDate(month, relative + direction)
	}
}

function monthSetter(months) {
	return function(startingMonth) {
		return months.slice(months.indexOf(startingMonth)).concat(months.slice(0, months.indexOf(startingMonth)))	
	}
}

function daysAndYears(months) {
	var year = determineYear(moment().get('years'))

	var months = months.slice()
	var daysInMonth = [
		{
			month: 'January',
			days: 31,
		},
		{
			month: 'February',
			days: 28,
		},
		{
			month: 'March',
			days: 31,
		},
		{
			month: 'April',
			days: 30,
		},
		{
			month: 'May',
			days: 31,
		},
		{
			month: 'June',
			days: 30,
		},
		{
			month: 'July',
			days: 31,
		},
		{
			month: 'August',
			days: 31,
		},
		{
			month: 'September',
			days: 30,
		},
		{
			month: 'October',
			days: 31,
		},
		{
			month: 'November',
			days: 30,
		},
		{
			month: 'December',
			days: 31,
		}
	]

	var newDays = []

	months.forEach(function(month) {
		newDays.push(_.find(daysInMonth, function(day) {
			return day.month === month
		}))

		newDays[newDays.length - 1].year = year(month)
	})

	// check leap year
	var feb = _.find(newDays, function(month) {
		return month.month === 'February'
	})

	feb.days = moment([feb.year]).isLeapYear() ? 29 : 28;

	console.log(associateMonths(newDays))

	return associateMonths(newDays)
}

function associateMonths(data) {
	data.forEach(function(month, index) {
		if (index > 0) {
			month.previousMonth = data[index - 1]
		} else {
			month.previousMonth = {month: ''};
		}
		if (index < (data.length - 1)) {
			month.nextMonth = data[index + 1]
		} else {
			month.nextMonth = {month: ''};
		}
	})

	return data;
}

function determineYear(year) {

	return function(month) {

		if (month === 'December') {
			year = moment().add('years', 1).format('YYYY');
			return moment().get('years')
		}
		return parseInt(year)
	}
}

function existy(item) {
	return item && true
}
