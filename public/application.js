$(document).ready(function(){
	$('#addRecipes').on('click', function(){
		window.location.href="addRecipe"
	});

	$('#ingredientMatcher').on('click', function(){
		window.location.href="ingredientMatcher"
	});

	$('#findRecipes').on('click', function(){
		window.location.href="findRecipe"
	})

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