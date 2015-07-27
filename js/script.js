$(document).one('pageinit', function() {

	showRuns(); 

	$('#submit-x').on('tap', addRun);

	$('.delete-run').on('tap', deleteRun); 

	$('.edit-run').on('tap', editRun);

    function showRuns() {

    	var runs = getRuns(); 

         var len = runs.length;
    	for (var i = 0; i < runs.length; i++) {
    		$('#stats').append(
    				'<li class="ui-body-inhereit ui-li-static"' + 'data-index="' + i + '"' + ' >' + 
    			    	'<strong>Date: </strong>' + runs[i]["date"] + '<br>' +
    					'<strong>Distance: </strong>' + runs[i]["mile"] + ' mile(s)' + 
    					'<div class="controls">' + 
    					'<a href="#add" class="edit-run">Edit</a> | <a class="delete-run" href="#">Delete</a>' + 
    					'</div>' + 
    				'</li>');
    	}

    	$('#home').bind('pageinit', function () {
    		$('#stats').listview('refresh');
    	});
    }

    function editRun() {
    	var parent = $(this).parent(); 
    	var grandParent = parent.parent(); 
		var i = $(this).parent().parent().data("index"); 
    	var runs = getRuns(); 
    	 $('#add-mile').val(runs[i]["mile"]);
    	 $('#add-date').val(runs[i]["date"]);
		 // $("#submit-x").data("edit-index", i);
		 $("#submit-x").attr("data-index", i.toString());
    }

	// Add Run Data
	function addRun() {

		var op = $(this).data("op");

		// Get user inputs
		var miles = $('#add-mile').val(); 
		var date = $('#add-date').val();

		// Turn the user input into the run object
		var run = {
			date: date, 
			mile: parseFloat(miles)
		};

        // If this call comes from edit then delete the old one 
        // before adding the current run to the existing runs in the local storage
		var runs = getRuns(); 
		var index = $(this).data("index"); 
		if (index != null) {
			runs.splice(index, 1); 			
		} 


        // add the current run to the existing runs in the local storage
		runs.push(run);			
		localStorage.setItem('runs', JSON.stringify(runs));

		// Give confirmation to the user
		alert('Run added');

		window.location.href="index.html";
		return false;
	};


    function deleteRun() {	

    	var parent = $(this).parent(); 
    	var grandParent = parent.parent(); 
		var i = $(this).parent().parent().data("index"); 
		var runs = getRuns(); 
		runs.splice(i, 1); 
		localStorage.setItem('runs', JSON.stringify(runs));
		window.location.href="index.html";
	}

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

