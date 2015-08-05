$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/recipes/search/ingredients'+window.location.search,
		success: function(response){
			response.forEach(function(elem,i) {
				html = '<div class="container selector col-xs-12 text-center">';
				html += '	<div id="namePic" class="col-xs-12">';
				html += '		<h1>'+elem.name+'</h1>';
				html += '		<div id="recipePic" class="col-xs-12">'
				html += '			<img class="img-responsive center-block" src="'+elem.picture+'">';
				html += '		</div>';
			  html += '	</div>';
		   	html += '	<div class="col-xs-12">';
				html += '		<h4>Time</h4>';
				html += '		<div id="prepTime">';
				html += '  		<p>Prep Time: '   + elem.preptime    + '</p>';
				html += '			<p>Cooking Time: '+ elem.cookingtime + '</p>';
				html += '		</div>'
				html += '		<div id="ingredients">';
				html += '			<h4>Ingredients</h4>';

				elem.ingredients.forEach(function(ingredient, j) {
					html += '		<p>'+ingredient+'<p>';
				});

				html += '		</div>';
				html += '		<div id="dir">';
				html += '			<h4>Cooking Directions</h4>';

				elem.directions.forEach(function(direction, k){
					html += '		<p>' + [k + 1] + '. ' + direction + '<p>';
				})

				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				$('#recipes').append(html);
				
			})
		},
		error: function(response){
			console.log("There was an error inputting the ingredients.");
		}
	})

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
		var ing = "";
		for (i=1; i <= ingredientCounter; i++){
			ing += $('#ingredient'+i+" input").val();
			if(i<ingredientCounter){
				ing += ","
			}
		}
		urlDestination="ingredientMatcher?ingredients="+ing;
		window.location.href=urlDestination;
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