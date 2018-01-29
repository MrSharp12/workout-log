$(document).ready(function(){
	$("#testAPI").on("click", function(){
		console.log("It's alive!");//checks to see if api button is working
    });
    
    var test = $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/test"
    })
    .done(function(data){
        console.log(data);
    })
.fail(function(){
        console.log("Snap!");
    });

});
