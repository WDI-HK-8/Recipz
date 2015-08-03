$(document).ready(function(){
	var ingredientCounter = 1;
	var directionCounter = 1;
	var ingredientClass = "ingredient"+ingredientCounter;
	var directionClass = "direction"+directionClass;

	$('#recipePic .btn').click(function(){
		$('#finalPic').remove();
		picURL = $('#recipePic input').val();
		html = "<img class='img-responsive center-block' id='finalPic' src='"+picURL+"'>"
		$('#pic').append(html);
	})

	$('#addIngredient').click(function(){
		if (ingredientCounter === 1){
			html = "<button type='button' id='removeIngredient' class='btn btn-danger'>Remove Ingredient</button>";
			$('#timeIng').append(html);
		}
		ingredientCounter++;
		ingredientClass = "ingredient"+ingredientCounter;
		html = '<div class="input-group id="'+ingredientClass+'>';
		html +=	' <span class="input-group-addon" id="basic-addon1">Ingredient</span>';
		html +=	' <input type="text" class="form-control" placeholder="Type in the name and amount of the ingredient" aria-describedby="basic-addon1">';
		html +=	'</div>';
		$('#ingredients').append(html);
	})

	$('#removeIngredient').click(function(){
		if (ingredientCounter === 2){
			$('#timeIng').children('#removeIngredient').remove();
		}
		$('#ingredients').children('#'+ingredientClass).remove();
		ingredientCounter--;
		ingredientClass = "ingredient"+ingredientCounter;
	})
})