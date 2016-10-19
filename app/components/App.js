var React = require('react');
var RecipieBox = require('./RecipieBox.js');



var defaultRecipies = [
	{
      "name":"Blueberry Banana Muffins",
      "ingredients": [
        ["Bananas","2"],
        ["Blueberries","1 1/2 cups"],
        ["Eggs","2"],
        ["Baking powder","2 1/2 tsp"],
        ["Cinnamon","1/2 tsp"],
        ["Flour","2 1/3 cups"],
        ["Nutmeg, ground","1/2 tsp"],["Salt","1/2 tsp"],
        ["Sugar","3/4 cup"],
        ["Butter","1/2 cup"],
        ["Milk","3/4 cup"]
      ],
      "instructions":"Preheat oven to 350. Combine butter, sugar, eggs and bananas. Mix together dry ingredients. Add flour mixture to egg mixture. Mix in milk. Fold in blueberries. Put in muffin tins and cook 20-25 minutes."
    },
    {
      "name":"Peanut Butter & Jelly",
      "ingredients": [
        ["peanut butter","2 tbsp"],
        ["jelly","2 tbsp"],
        ["bread","2 slices"]
      ],
      "instructions":"Spread peanut butter on one slice of bread, and the jelly on the other slice. Put the two pieces of bread together and enjoy."
    }
]

if (!localStorage.recipies) {
	localStorage.recipies = JSON.stringify(defaultRecipies);
}

var App = React.createClass({
	getInitialState: function() {
		return {
			recipies: JSON.parse(localStorage.recipies)
		}
	},
	render: function() {
		return (
			<div>
				<RecipieBox />
	    </div>
		)

	}
})




module.exports = App;