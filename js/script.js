$(document).ready(function() {
		var leftUIEl = $('.carousel-arrow-left');
		var rightUIEl = $('.carousel-arrow-right');
		var elementsList = $('.carousel-list');
 
		var pixelsOffset = 300;
		var currentLeftValue = 0;
		var elementsCount = elementsList.find('li').length;
		var minimumOffset = - ((elementsCount - 5) * pixelsOffset);
		var maximumOffset = 0;
 
		leftUIEl.click(function() {        
				if (currentLeftValue != maximumOffset) {
						currentLeftValue += 300;
						elementsList.animate({ left : currentLeftValue + "px"}, 500);
				}
		});
 
		rightUIEl.click(function() {        
				if (currentLeftValue != minimumOffset) {
						currentLeftValue -= 300;
						elementsList.animate({ left : currentLeftValue + "px"}, 500);
				}
		});
});



// see:
// http://ejohn.org/blog/javascript-micro-templating/

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
	var cache = {};

	this.tmpl = function tmpl(str, data){
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] ||
				tmpl(document.getElementById(str).innerHTML) :

			// Generate a reusable function that will serve as a template
			// generator (and which will be cached).
			new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +

				// Introduce the data as local variables using with(){}
				"with(obj){p.push('" +

				// Convert the template into pure JavaScript
				str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'")
			+ "');}return p.join('');");

		// Provide some basic currying to the user
		return data ? fn( data ) : fn;
	};
})();


// Demo data.
$(function(){

	var dataObject = {
		members:[{
			name: 'Рыжиков Сергей Валерьевич',
			imgUrl: 'img/my-foto.jpg',
			status: 'Студент транспортного университета',
			aboutPerson: 'Хочу учить фронтенд, потому что:',
			phone: '+380663546947',
			vkLink: 'https://vk.com/id9664829',
			feedback: 'Если нужно, могу запроектировать вам дорогу'
		}],
		aboutPerson:[
			{about:'Для проетировщиков роботы мало'},
			{about:'Приходится подрабатывать'},
			{about:'Платят мало'}
		]

	}; // -> End of dataObject

	var results = document.getElementById("results");
	results.innerHTML = tmpl("item_tmpl", dataObject);

});
