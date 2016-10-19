var React = require('react');
var Recipie = require('./Recipie.js');
var AddRecipieModal = require('./AddRecipieModal');
var EditRecipieModal = require('./EditRecipieModal');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isRecipieEquivalent(r1, r2) {
	var r1Props = Object.getOwnPropertyNames(r1);
	var r2Props = Object.getOwnPropertyNames(r2);
	for (var i = 0; i < r1Props.length; i++) {
		var prop = r1Props[i]; 
		if (r1[prop] !== r2[prop]) {
			return false;
		}
	}
	return true;
}

var RecipieBox = React.createClass({
	getInitialState: function() {
		return {
			recipies: JSON.parse(localStorage.recipies),
			recipieToEdit: ''
		}
	},	
	updateRecipieList: function() {
		this.setState({ recipies: JSON.parse(localStorage.recipies) })
	},
	handleClick: function(e) {
		this.setState({ recipieToEdit: e });
		this.forceUpdate();
		$(document).ready(function(){
			$('.modal-trigger').leanModal();
			$('#editRecipieModal').openModal();
		});
	},
	handleDelete: function() {
		var matchRecipieIndex;
		for (var i = 0; i < this.state.recipies.length; i++) {
			if (isRecipieEquivalent(this.state.recipies[i], this.state.recipieToEdit)) {
				matchRecipieIndex = i;
			} 
		}
		var temp = this.state.recipies;
		temp.splice(matchRecipieIndex, 1); 
		localStorage.recipies = JSON.stringify(temp);
		this.setState({ recipies: JSON.parse(localStorage.recipies) });
	},
	handleUpdate: function(updatedRecipie) {
		var matchRecipieIndex;
		for (var i = 0; i < this.state.recipies.length; i++) {
			if (isRecipieEquivalent(this.state.recipies[i], this.state.recipieToEdit)) {
				matchRecipieIndex = i;
			} 
		}
		var temp = this.state.recipies;
		temp.splice(matchRecipieIndex, 1, updatedRecipie);
		localStorage.recipies = JSON.stringify(temp);
		this.setState({ recipies: JSON.parse(localStorage.recipies) });

	},
	render: function() {
		var handleClick = this.handleClick;
		var recipies = this.state.recipies.map(function(e) {
			return <Recipie recipie={e} handleClick={handleClick.bind(null, e)} key={getRandomInt(1, 10000)} />
		})
		return (
	    	<div className="container">
	        	<div className="row">
	          		<div className="col s12">
	            		<ul className="collapsible" data-collapsible="accordion">
	              			{recipies}
	            		</ul>
	          		</div>
	        	</div>
	        	<a className="btn-floating btn-large waves-effect waves-light red lighten-1 modal-trigger" 
	           	   href="#AddRecipieModal">
	          		<i className="material-icons">add</i>
	          	</a>
	          	<AddRecipieModal updateRecipieList={this.updateRecipieList} />
	          	<EditRecipieModal recipie={this.state.recipieToEdit} 
	          					  handleDelete={this.handleDelete} 
	          					  handleUpdate={this.handleUpdate} />
	      </div>  
		)
	}
});




module.exports = RecipieBox;