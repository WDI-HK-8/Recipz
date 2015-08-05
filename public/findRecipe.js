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
})