function setPosition(a){$(".d-spacer").css("height",(30*(a-1)).toString()+"px"),$(".d-slider").css("top","-"+(30*a).toString()+"px")}function buttonClick(a,b,c){$("."+a).on("mousedown",function(){b(c)})}function slide(a){}function checkLastDay(a){return dayVal=parseInt($(".current-day").text()),dayMax=a.days,dayVal>dayMax&&(dayVal=dayMax),dayVal}function changeDate(a,b,c){var d=[],e=_.template($("#show-previous-month").text()),f=_.template($("#show-previous-day").text()),g=_.template($("#show-next-month").text()),h=_.template($("#show-next-day").text()),i=b-1,j=b,k=b+1;""===a.previousMonth.month&&b<=parseInt(moment().format("D"))&&(i="",j=parseInt(moment().format("D")),k=j+1),1===j&&""!==a.previousMonth.month&&(i=a.previousMonth.days),j===a.days&&(k=""!==a.nextMonth.month?1:"");var l={previousMonth:a.previousMonth.month,currentMonth:a.month,nextMonth:a.nextMonth.month,previousDay:i,currentDay:j,nextDay:k};c>0&&(j!=$(".current-day").text()&&d.push({klass:"d",template:h,dummy:{dayToHide:$(".previous-day").text()},spacerChange:$(".days .previous-dummy").length>0?0:30,sliderChange:-30}),a.month!==$(".current-month").text()&&d.push({klass:"m",template:g,dummy:{monthToHide:$(".previous-month").text()},spacerChange:$(".months .previous-dummy").length>0?0:30,sliderChange:-30})),0>c&&(j!=$(".current-day").text()&&d.push({klass:"d",template:f,dummy:{dayToShow:$(".next-day").text()},spacerChange:$(".days .next-dummy").length>0?0:-30,sliderChange:30}),a.month!==$(".current-month").text()&&d.push({klass:"m",template:e,dummy:{monthToShow:$(".next-month").text()},spacerChange:$(".months .next-dummy").length>0?0:-30,sliderChange:30})),d.forEach(function(a){var b="."+a.klass+"-spacer",c=parseInt($(b).css("height").slice(0,-2)),d="."+a.klass+"-slider",e=parseInt($(d).css("top").slice(0,-2));$("."+a.klass+"-slider").html(a.template({month:$.extend(l,a.dummy)})),$(b).css("height",(c+a.spacerChange).toString()+"px"),$(d).css("top",(e+a.sliderChange).toString()+"px")}),$(".next-day").text(k),$(".previous-day").text(i),$(".current-year").text(a.year)}function appendNextMonth(a){return function(b){var c=$(".current-month").text(),d=_.find(a,function(a){return a.month===c}),e=a.indexOf(d);if(existy(a[e+b])){var f=a[e+b];return changeDate(f,checkLastDay(f),b)}}}function appendNextNumber(a){return function(b){var c=$(".current-month").text(),d=parseInt($(".current-day").text()),e=_.find(a,function(a){return a.month===c}),f=a.indexOf(e);return 0===f&&0>b&&d===parseInt(moment().format("D"))?void 0:1>d+b?f>0?changeDate(a[f-1],a[f-1].days,b):void 0:d+b>e.days?f<a.length-1?changeDate(a[f+1],1,b):void 0:changeDate(e,d+b,b)}}function monthSetter(a){return function(b){return a.slice(a.indexOf(b)).concat(a.slice(0,a.indexOf(b)))}}function daysAndYears(a){var b=determineYear(moment().get("years")),a=a.slice(),c=[{month:"January",days:31},{month:"February",days:28},{month:"March",days:31},{month:"April",days:30},{month:"May",days:31},{month:"June",days:30},{month:"July",days:31},{month:"August",days:31},{month:"September",days:30},{month:"October",days:31},{month:"November",days:30},{month:"December",days:31}],d=[];a.forEach(function(a){d.push(_.find(c,function(b){return b.month===a})),d[d.length-1].year=b(a)});var e=_.find(d,function(a){return"February"===a.month});return e.days=moment([e.year]).isLeapYear()?29:28,console.log(associateMonths(d)),associateMonths(d)}function associateMonths(a){return a.forEach(function(b,c){b.previousMonth=c>0?a[c-1]:{month:""},b.nextMonth=c<a.length-1?a[c+1]:{month:""}}),a}function determineYear(a){return function(b){return"December"===b?(a=moment().add("years",1).format("YYYY"),moment().get("years")):parseInt(a)}}function existy(a){return a&&!0}Parse.initialize("nBtaWx3Z6qemHuUwn5x1aMalAyTGwopll122Ojvy","XWSe7WOWNFUTJnpzKNywK1ONDysUwjbvS9MNZUfW"),$(document).ready(function(){var a=monthSetter(["January","February","March","April","May","June","July","August","September","October","November","December"]);changeDate(daysAndYears(a(moment().format("MMMM")))[0],parseInt(moment().format("D")),1),setPosition(365),setTimeout(function(){$(".slider").css("-webkit-transition","all .15s ease")},100);var b=appendNextMonth(daysAndYears(a(moment().format("MMMM")))),c=appendNextNumber(daysAndYears(a(moment().format("MMMM"))));buttonClick("month-up",b,1),buttonClick("month-down",b,-1),buttonClick("days-up",c,1),buttonClick("days-down",c,-1)});var app={};app.collections={},app.models={},app.models.Company=Parse.Object.extend("Company",{initialize:function(a){a&&this.set("name",a.name)},defaults:{users:[],events:[],rooms:[]}}),app.models.Event=Parse.Object.extend("Event");var newEvent={room:"Small",fullDate:"Nov 24 2013",day:"24",month:"Nov",year:"2013",time:"13",duration:".5"},company,query=new Parse.Query(app.models.Company);query.equalTo("name","TIY"),query.find({success:function(a){company=a,console.log("company: ",a[0].get("name"));var b=new Parse.Query(app.models.Event);b.equalTo("fullDate","Nov 24 2013"),b.find({success:function(a){console.log("event(s): ",a)}})}});