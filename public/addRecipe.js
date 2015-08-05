$(document).ready(function(){
	var ingredientCounter = 1;
	var directionCounter = 1;
	var ingredientClass = "ingredient"+ingredientCounter;
	var directionClass = "direction"+directionClass;

	$('#recipePic .btn').click(function(){
		$('#finalPic').remove();
		picURL = $('#recipePic input').val();
		html = "<img class='img-responsive center-block' id='finalPic' src='"+picURL+"'>";
		$('#namePic').append(html);
	})

	$('#addIngredient').click(function(){
		ingredientCounter++;
		ingredientClass = "ingredient"+ingredientCounter;
		html = '<div class="input-group" id="'+ingredientClass+'">';
		html +=	'<span class="input-group-addon" id="basic-addon1">Ingredient</span>';
		html +=	'<input type="text" class="form-control" placeholder="Type in the name and amount of the ingredient" aria-describedby="basic-addon1">';
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

	$('#addDirection').click(function(){
		directionCounter++;
		directionClass = "direction"+directionCounter;
		html = '<div id="'+directionClass+'" class="input-group">';
		html += '<span class="input-group-addon" id="basic-addon1">'+directionCounter+'.</span>';
		html += '<textarea rows=2 class="form-control" placeholder="Type in the cooking direction" required></textarea>';
		html += '</div>';
		$('#dir').append(html);
	})

	$('#removeDirection').click(function(){
		if (directionCounter > 1){
			$('#'+directionClass).remove();
			directionCounter--;
			directionClass = "direction"+directionCounter;
		}
	})

	$('#submitRecipe').click(function(){
		var ingredients = [];
		var directions = [];
		for (var i = 1; i <= ingredientCounter; i++){
			var ingredient = $("#ingredient"+i+" input").val();
			ingredients.push(ingredient);
		}
		for (var i = 1; i <= directionCounter; i++){
			var direction = $("#direction"+i+" textarea").val();
			directions.push(direction);
		}
		$.ajax({
			type: 'POST',
			url: '/recipes',
			data: {
				recipe:{
					name: $('#name').val(),
					picture: $('#recipePic input').val(),
					ingredients: ingredients,
					directions: directions,
					preptime: $('#prepTime input').val(),
					cookingtime:$('#cookTime input').val(),
				}
			},
			success: function(response){
				alert("Success! You uploaded your recipe!")
			},
			error: function(response){
				alert("There was an error inputting the recipe.");
			}
		})
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