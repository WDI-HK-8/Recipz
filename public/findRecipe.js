$(document).ready(function(){

	$('#logout').on('click', function(){
		$.ajax({
			type: "DELETE",
			url: "/sessions",
			success: function(response){
				console.log(response);
			}
		})
	})

	$('#submitTerms').click(function(){
		var search = $('#searchterms').val()
		urlDestination="findTerms?search="+search;
		window.location.href=urlDestination;
	})
})