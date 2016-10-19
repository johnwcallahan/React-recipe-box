var React = require('react');

var Row = React.createClass({
	render: function() {
    	return (
    		<tr>
        		<td className="quanity">{this.props.quanity}</td>
        		<td className="ingredient">{this.props.ingredient}</td>
      		</tr>
    	)
  	}
});

module.exports = Row;