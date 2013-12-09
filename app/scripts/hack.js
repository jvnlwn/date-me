$(document).ready(function() {
	var setMonths = monthSetter(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

	// var appendStuff = appendToDom(daysAndYears(setMonths(moment().format('MMMM'))))

	changeDate({
		month: moment().format('MMMM'),
		year: moment().format('YYYY')
	}, moment().format('D'))


	var changeMonth = appendNextMonth(daysAndYears(setMonths(moment().format('MMMM'))))
	var changeDay = appendNextNumber(daysAndYears(setMonths(moment().format('MMMM'))))


	// $('.month-up').on('mousedown', function() {
	// 	changeMonth('month',+1)
	// 	// $('.months').css('top', (parseInt($('.months').css('top').slice(0, -2)) - 35).toString() + 'px')

	// 	var handler = setInterval(function() {
	// 		changeMonth('month',+1)
	// 		// $('.months').css('top', (parseInt($('.months').css('top').slice(0, -2)) - 35).toString() + 'px')

	// 	}, 125)

	// 	$('.month-up').one('mouseup', function() {
	// 		clearInterval(handler)
	// 	})

	// })	

	buttonClick('month-up',   changeMonth, +1)
	buttonClick('month-down', changeMonth, -1)
	buttonClick('days-up',    changeDay,   +1)
	buttonClick('days-down',  changeDay,   -1)


	// $('.month-up').click(function() {
	// 	changeMonth('month',+1)	
	// })	

	// $('.month-down').click(function() {
	// 	changeMonth('month',-1)	
	// })

	// $('.days-up').click(function() {
	// 	changeDay(+1)	
	// })

	// $('.days-down').click(function() {
	// 	changeDay(-1)	
	// })

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

				}, 125)

				$('.' + target).one('mouseup', function() {
					clearInterval(handler)
				})		

	})
}

// function buttonClick(target, fun, operator) {
// 	$('.' + target).on('mousedown', function(e) {
// 		fun(operator)

// 		setTimeout(function(){
// 			if (e.which === 1) {

// 				var handler = setInterval(function() {
// 					console.log(operator)
// 					fun(operator)

// 				}, 125)

// 				$('.' + target).one('mouseup', function() {
// 					clearInterval(handler)
// 				})		
// 			} else {
// 				clearInterval(handler)
// 			}
// 		},100)
// 	})
// }



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

// function changeDateNew(data, index, dayVal) {

// 	$('.month').html('<div>' + data[index - 1].month + '</div><div>' + data[index].month + '</div><div>' + data[index + 1].month + '</div>')
// 	$('.days').html('<div>' + (dayVal - 1) + '</div><div>' + dayVal + '</div><div>' + (dayVal + 1) + '</div>')
// 	$('.year').html('<div>' + data[index - 1].year + '</div><div>' + data[index].year + '</div><div>' + data[index + 1].year + '</div>')
// }


function appendNextMonth(data) {
	return function(direction) {
		var relative = $('.month').text();
		var month = _.find(data, function(month) {return month['month'] === relative})
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

		if (index === 0 && direction < 0 && relative === parseInt(moment().format('D'))) {
			return
		}

		if ((relative + direction) < 1) {
			if (index > 0) {
				return changeDate(data[index - 1], data[index - 1].days, data, index - 1)
				// return changeDateNew(data, index - 1, data[index - 1].days)
			} else {
				return
			}
		}

		if ((relative + direction) > month.days) {
			if (index < (data.length - 1)) {
				return changeDate(data[index + 1], 1, data, index + 1)
			} else {
				return
			}
		}
		// return changeDateNew(data, index, relative + direction)
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
