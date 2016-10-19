var React = require('react');

var DynamicRow = React.createClass({
	render: function() {
    	return (
     		<tr>
        		<td className="quanity">{this.props.quanity}</td>
        		<td className="ingredient">{this.props.ingredient}</td>
          	<td>
            	<a onClick={this.props.handleRemove}>
            			<i className="fa fa-times remove" aria-hidden="true"></i>
          		</a> 
            </td>       
      		</tr>
   		)
  	}
});

module.exports = DynamicRow;