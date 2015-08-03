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
})