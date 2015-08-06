$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/recipe/search'+window.location.search,
		success: function(response){
			response.forEach(function(elem,i) {
				html = '<div class="container finalselector col-xs-12">';
				html += '	<div id="namePic" class="col-xs-12 text-center">';
				html += '		<h1>'+elem.name+'</h1>';
				html += '		<div id="recipePic" class="col-xs-12">'
				html += '			<img class="img-responsive center-block" src="'+elem.picture+'">';
				html += '		</div>';
			  html += '	</div>';
		   	html += '	<div class="col-xs-offset-2 col-xs-8 finalRecipe">';
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
			console.log(response);
		},
		error: function(response){
			alert("There was an error finding the recipe.");
		}
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