var setMonths = monthSetter(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

daysInMonth(setMonths(moment().format('MMMM')))

function monthSetter(months) {
	return function(startingMonth) {
		return months.slice(months.indexOf(startingMonth)).concat(months.slice(0, months.indexOf(startingMonth)))	
	}
}

function daysInMonth(months) {
	var year = determineYear(moment().get('years'))

	var months = months.slice()
	var days = [
		{
			month: 'January',
			days: 31,
		},
		{
			month: 'February',
			days: isLeapYear(months),
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
		newDays.push(_.find(days, function(day) {
			return day.month === month
		}))

		newDays[newDays.length - 1].year = year(month)
	})

	console.log(newDays)
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

function isLeapYear(months) {

	if (months.indexOf('February') < months.indexOf('December')) {
		return moment().isLeapYear() ? 29 : 28;	
	} else {
		return moment().add('years', 1).isLeapYear() ? 29 : 28
	}
}

// get today's date
// moment().date()
