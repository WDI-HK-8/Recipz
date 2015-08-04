$(document).ready(function(){
	console.log(window.location);

	var ingredientCounter = 1;
	var ingredientClass = "ingredient"+ingredientCounter;

	$('#addIngredient').click(function(){
		ingredientCounter++;
		ingredientClass = "ingredient"+ingredientCounter;
		html = '<div class="col-xs-12 input-group" id="'+ingredientClass+'">';
		html +=	'<span class="input-group-addon" id="basic-addon1">Ingredient</span>';
		html +=	'<input type="text" class="form-control" placeholder="Type in your ingredient" aria-describedby="basic-addon1">';
		html +=	'</div>';
		$('#ingredients').append(html);
	})

	$('#removeIngredient').click(function(){
		if (ingredientCounter > 1){
			$('#'+ingredientClass).remove();
			ingredientCounter--;
			ingredientClass = "ingredient"+ingredientCounter;
		}
	})

	$('#submitIngredients').click(function(){
		var ingredients = [];
		for (var i = 1; i <= ingredientCounter; i++){
			var ingredient = $("#ingredient"+i+" input").val();
			ingredients.push(ingredient);
		}
		$.ajax({
			type: 'GET',
			url: '/recipes',
			success: function(response){
				console.log(response)
			},
			error: function(response){
				console.log("There was an error inputting the ingredients.");
			}
		})
	})
})