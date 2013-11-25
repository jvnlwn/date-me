var app = {};


app.collections = {};
app.models = {};

// company model
app.models.Company = Parse.Object.extend('Company', {

	initialize: function(options) {

		if (options) {
			this.set('name', options.name)	
		}
	},

	defaults: {
		users:  [],
		events: [],
		rooms:  []
	}
})

app.models.Event = Parse.Object.extend('Event')

// app.collections.EventsCollection = Parse.Collection.extend({

// 	initialize: function(options) {
// 		this.options = options;
// 	},

// 	// query: (new Parse.Query(app.models.Event)).equalTo(, "hot")

// 	model: app.models.Event
// })


var newEvent = {
	room: 'Small',
	fullDate: 'Nov 24 2013',
	day: '24',
	month: 'Nov',
	year: '2013',
	time: '13',
	duration: '.5'
}

// to add new event to the company's events array, just do company.get('events').push(newEvent), then company.save()

var company;
var query = new Parse.Query(app.models.Company);
query.equalTo("name", "TIY");
query.find({
  success: function(result) {
  	company = result
    console.log('company: ', result[0].get('name'))

    // probably don't need to query here since we already have the company model with the array of events.
    // unless there's a way to query for the company and it's events at the same time. Who Knows
    var query = new Parse.Query(app.models.Event);
	query.equalTo("fullDate", "Nov 24 2013");
	query.find({
	  success: function(result) {
	    console.log('event(s): ', result)
	  }
	});
  }
});



