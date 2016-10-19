var React = require('react');
var IngredientList = require('./IngredientList.js');


var Recipie = React.createClass({
  render: function() {
    	return (
      		<li>
        		<div className="collapsible-header">
          			<div className="row valign-wrapper">
           				 <div className="col s10 m11">
            				 <p className="recipieName">{this.props.recipie.name}</p>
            			</div>
            			<div className="col s2 m1">
             				<a onClick={this.props.handleClick} className="modal-trigger edit" href="#editRecipieModal">
                				<i className="material-icons right-align edit">mode_edit</i>
              			</a>
            			</div>
          			</div>
        		</div>
        		<div className="collapsible-body white">
          			<div className="row">
           				<div className="col s12 m6 ingredient-list">
              				<IngredientList ingredients={this.props.recipie.ingredients} />
            			</div> 
            			<div className="col s12 m6 description">
              				<p>{this.props.recipie.instructions}</p>
            			</div> 
          			</div>
        		</div>
        	</li>
    	)
 	}
});

  $(document).ready(function(){
    $('.modal-trigger').leanModal();
  });

module.exports = Recipie;