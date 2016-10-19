var React = require('react');
var Row = require('./row.js')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var IngredientList = React.createClass({
	render: function() {
    	var ingredients = this.props.ingredients.map(function(elem) {
      	return <Row quanity={elem[1]} ingredient={elem[0]} key={getRandomInt(1, 10000)} />
    	});
    	return (
      		<table className="striped">
        		<tbody>
          			{ingredients}
        		</tbody>
      		</table>
   	 	)
  	}
});

module.exports = IngredientList;