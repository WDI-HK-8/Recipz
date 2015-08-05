$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/recipes/search/'+window.location.search,
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
		urlDestination="findRecipe?search="+search;
		window.location.href=urlDestination;
	})
})