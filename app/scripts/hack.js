$(document).ready(function() {
	var setMonths = monthSetter(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

	changeDate(daysAndYears(setMonths(moment().format('MMMM')))[0], parseInt(moment().format('D')), +1);

	setPosition(365)

	setTimeout(function() {
		$('.slider').css('-webkit-transition', 'all .15s ease')
	}, 100)

	var changeMonth = appendNextMonth(daysAndYears(setMonths(moment().format('MMMM'))))
	var changeDay = appendNextNumber(daysAndYears(setMonths(moment().format('MMMM'))))	

	buttonClick('month-up',   changeMonth, +1)
	buttonClick('month-down', changeMonth, -1)
	buttonClick('days-up',    changeDay,   +1)
	buttonClick('days-down',  changeDay,   -1)
})

function setPosition(num) {
	$('.d-spacer').css('height',    ((num - 1) *30).toString() + 'px')
	$('.d-slider').css('top', '-' + ((num) *30).toString() + 'px')
}

function buttonClick(target, fun, operator) {
	$('.' + target).on('mousedown', function() {
		fun(operator)
	})
}

function slide(target) {
	if (target ) {}
}

function checkLastDay(month) {
	dayVal = parseInt($('.current-day').text());
	dayMax = month.days

	if (dayVal > dayMax) {
		dayVal = dayMax;
	}

	return dayVal
}

function changeDate(month, dayVal, direction) {

	var showTemplates = [];

	var showPreviousMonth = _.template($('#show-previous-month').text())
	var showPreviousDay = _.template($('#show-previous-day').text())

	var showNextMonth = _.template($('#show-next-month').text())
	var showNextDay = _.template($('#show-next-day').text())

	var previousDayVal = dayVal - 1;
	var currentDayVal = dayVal;
	var nextDayVal = dayVal + 1;

	// resets dayVals if current month is selected and dayVal is less than current day val
	if (month.previousMonth.month === '' && dayVal <= parseInt(moment().format('D'))) {
		previousDayVal = '';
		currentDayVal = parseInt(moment().format('D'));
		nextDayVal = currentDayVal + 1;
	}

	// show previous months last day if there is a previous month
	if (currentDayVal === 1 && month.previousMonth.month !== '') {
		previousDayVal = month.previousMonth.days;
	}

	// show next month's first day if currently on last day of current month and there is a next month
	if (currentDayVal === month.days) {

		if (month.nextMonth.month !== '') {
			nextDayVal = 1;	
		} else {
			nextDayVal = '';	
		}
	}

	var monthData = {
		previousMonth: month.previousMonth.month,
		currentMonth:  month.month,
		nextMonth:     month.nextMonth.month,

		previousDay:   previousDayVal,
		currentDay:    currentDayVal,
		nextDay:       nextDayVal
	}

	if (direction > 0) {

		// days displayed will change
		if (currentDayVal != $('.current-day').text()) {
			showTemplates.push({
				klass:    'd',
				template: showNextDay,
				dummy: {
					dayToHide: $('.previous-day').text()
				},
				spacerChange: $('.days .previous-dummy').length > 0 ? 0 : 30,
				sliderChange: -30
			})
		}

		// months displayed will change
		if (month.month !== $('.current-month').text()) {
			showTemplates.push({
				klass:    'm',
				template: showNextMonth,
				dummy: {
					monthToHide: $('.previous-month').text()
				},
				spacerChange: $('.months .previous-dummy').length > 0 ? 0 : 30,
				sliderChange: -30
			})
		} 
	}

	if (direction < 0) {

		// days displayed will change
		if (currentDayVal != $('.current-day').text()) {
			showTemplates.push({
				klass:    'd',
				template: showPreviousDay,
				dummy: {
					dayToShow: $('.next-day').text()
				},
				spacerChange: $('.days .next-dummy').length > 0 ? 0 : -30,
				sliderChange: 30,
			})
		}

		// months displayed will change
		if (month.month !== $('.current-month').text()) {
			showTemplates.push({
				klass:    'm',
				template: showPreviousMonth,
				dummy: {
					monthToShow: $('.next-month').text()
				},
				spacerChange: $('.months .next-dummy').length > 0 ? 0 : -30,
				sliderChange: 30,
			})
		}
	}

	showTemplates.forEach(function(toShow) {

		var targetSpacer = '.' + toShow.klass + '-spacer';
		var spacerHeight = parseInt($(targetSpacer).css('height').slice(0, -2))

		var targetSlider = '.' + toShow.klass + '-slider';
		var sliderTop    = parseInt($(targetSlider).css('top').slice(0, -2))

		$('.' + toShow.klass + '-slider').html(toShow.template({month: $.extend(monthData, toShow.dummy)}));

		$(targetSpacer).css('height', (spacerHeight + toShow.spacerChange).toString() + 'px')
		$(targetSlider).css('top', (sliderTop + toShow.sliderChange).toString() + 'px');
		
	})

	// some times these must be done, so who cares to set the params
	$('.next-day').text(nextDayVal)
	$('.previous-day').text(previousDayVal)
	$('.current-year').text(month.year)
}


function appendNextMonth(data) {
	return function(direction) {
		var relative = $('.current-month').text();
		var month = _.find(data, function(month) {return month.month === relative})
		var index = data.indexOf(month)

		if (existy(data[index + direction])) {
			var newMonth = data[index + direction]
			return changeDate(newMonth, checkLastDay(newMonth), direction)
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
				return changeDate(data[index - 1], data[index - 1].days, direction)
			} else {
				return
			}
		}

		if ((relative + direction) > month.days) {
			if (index < (data.length - 1)) {
				return changeDate(data[index + 1], 1, direction)
			} else {
				return
			}
		}

		return changeDate(month, relative + direction, direction)
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
