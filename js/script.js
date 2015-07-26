$(document).one('pageinit', function() {
	$('#submit').on('tap', addRun);

	// Add Run Data
	function addRun() {

		// Get user inputs
		var miles = $('#addMile').val(); 
		var date = $('#addDate').val();

		// Turn the user input into the run object
		var run = {
			date: date, 
			mile: parseFloat(miles)
		};

        // add the current run to the existing runs in the local storage
		var runs = getRuns(); 
		runs.push(run);			
		localStorage.setItem('runs', JSON.stringify(runs));

		// Give confirmation to the user
		alert('Run added');

		window.location.href="index.html";
		return false;
	};


     // Get runs from local storage
	function getRuns() {

		var runs = new Array(); 
		var currentRuns = localStorage.getItem('runs');

		if (currentRuns != null) {
			runs = JSON.parse(currentRuns);
		}

        
        // Sort by date 
		return(runs.sort(function(a,b){return new Date(b.date) - new Date(a.date)}));

		// Sort by miles  
		// return(runs.sort(function(a,b){return b.mile - a.mile}));
	}
});

