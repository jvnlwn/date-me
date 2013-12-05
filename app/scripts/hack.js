$(document).ready(function() {
	var setMonths = monthSetter(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

	// var appendStuff = appendToDom(daysAndYears(setMonths(moment().format('MMMM'))))

	changeDate({
		month: moment().format('MMMM'),
		year: moment().format('YYYY')
	}, moment().format('D'))

	var changeMonth = appendNext(daysAndYears(setMonths(moment().format('MMMM'))))
	var changeDay = appendNextNumber(daysAndYears(setMonths(moment().format('MMMM'))))

	$('.month-up').click(function() {
		changeMonth('month',+1)	
	})	

	$('.month-down').click(function() {
		changeMonth('month',-1)	
	})

	$('.days-up').click(function() {
		changeDay(+1)	
	})

	$('.days-down').click(function() {
		changeDay(-1)	
	})
})


// appendStuff('month')
// appendStuff('days')
// appendStuff('year')


// function appendToDom(data) {
// 	console.log('data ', data)
// 	return function(el) {
// 		return _.each(data, function(month) {
// 			$('.' + el).append('<div>' + month[el] + '</div>')
// 		})
// 	}
// }

function checkLastDay(month) {
	dayVal = parseInt($('.days').text());
	dayMax = month.days

	if (dayVal > dayMax) {
		dayVal = dayMax;
	}

	return dayVal
}

function changeDate(month, dayVal) {
	$('.month').html('<div>' + month.month + '</div>')
	$('.days').html('<div>' + dayVal + '</div>')
	$('.year').html('<div>' + month.year + '</div>')
}

function appendNext(data) {
	return function(el, direction) {
		var relative = $('.' + el).text();
		var month = _.find(data, function(month) {return month[el] === relative})
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
		var monthName = $('.month').text();
		var relative = parseInt($('.days').text());
		var month = _.find(data, function(month) {return month['month'] === monthName})
		var index = data.indexOf(month)

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
		return $('.days').html('<div>' + (relative + direction) + '</div>')
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

	return newDays
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

// get today's date
// moment().date()
