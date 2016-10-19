var React = require('react');
var DynamicRow = require('./DynamicRow');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var AddRecipieModal = React.createClass({
	getInitialState: function() {
		return {
      name: '',
      tempQuanity: '',
      tempIngredient: '',
			ingredients: [],
      instructions: ''
		}
	},
  handleNameChange: function(e) {
    this.setState({ name: e.target.value });
  },
  handleQuanityChange: function(e) {
    this.setState({ tempQuanity: e.target.value });
  },
  handleIngredientChange: function(e) {
    this.setState({ tempIngredient: e.target.value });
  },
  handleAddIngredient: function() {
    //create ingredient array, then add it to list of ingredients
    //stored in this.state.ingredients
    var singleIngredientArr = [];
    singleIngredientArr.push(this.state.tempIngredient);
    singleIngredientArr.push(this.state.tempQuanity);
    
    var allCurrentIngredients = this.state.ingredients;
    allCurrentIngredients.push(singleIngredientArr);
    this.setState({ ingredients: allCurrentIngredients }); 
    
    document.getElementById('addQuanityField').value = '';
    document.getElementById('addIngredientField').value = '';
  },  
  handleInstructionsChange: function(e) {
    this.setState({ instructions: e.target.value });
  },
  handleRemove: function(ingredientId) { 
    var temp = this.state.ingredients;
    temp.splice(ingredientId, 1);
    this.setState({ ingredients: temp });
  },
  handleSubmit: function() {
    //build recipie object...
    var recipieForStorage = {};
    recipieForStorage.name = this.state.name;
    recipieForStorage.ingredients = this.state.ingredients;
    recipieForStorage.instructions = this.state.instructions;

    //...then add it to localStorage.recipies
    var temp = JSON.parse(localStorage.recipies);
    temp.push(recipieForStorage);
    localStorage.recipies = JSON.stringify(temp);

    //finally, refresh list of recipies and clear fields
    this.props.updateRecipieList();
    document.getElementById('recipieName').value = '';
    document.getElementById('addQuanityField').value = '';
    document.getElementById('addIngredientField').value = '';
    document.getElementById('recipieInstructions').value = '';
  },
	render: function() {
    var ingredientId = -1;
    var ingredients = this.state.ingredients.map(function(e) {
      ingredientId++;
      return <DynamicRow quanity={e[1]}
                         ingredient={e[0]}
                         handleRemove={this.handleRemove.bind(null, ingredientId)}
                         ingredientId={ingredientId}
                         key={getRandomInt(1, 10000)} />
    }.bind(this));
		return (
    	<div id="AddRecipieModal" className="modal">
      	<div className="modal-content">
          <div className="row">
          	<div className="input-field col s12"> 
            	<input id="recipieName" type="text" onChange={this.handleNameChange}/>
              <label htmlFor="recipieName">Recipie Name</label>
            </div>
          </div>
          <div className="row">  
          	<div className="input-field col s4">
            	<input id="addQuanityField" type="text" defaultValue={this.state.tempQuanity} onChange={this.handleQuanityChange}/>
              <label htmlFor="addQuanityField">Quanity</label>
            </div>              
            <div className="input-field col s4">
              <input id="addIngredientField" type="text" defaultValue={this.state.tempIngredient} onChange={this.handleIngredientChange}/>
              <label htmlFor="addIngredientField">Ingredient</label>
            </div>
            <div className="col s4">
            	<a id="addIngredientButton" 
            		 className="waves-effect waves-light btn" 
                 onClick={this.handleAddIngredient}>add ingredient
              </a>
            </div>
          </div>
          <div className="row">
          	<div className="col s12">
              <table className="striped">
                <tbody>
                	{ingredients}
                </tbody>
              </table>
            </div>
          </div>              
          <div className="row">
          	<div className="input-field col s12">
            	<textarea id="recipieInstructions" 
                        className="materialize-textarea" 
                        onChange={this.handleInstructionsChange}></textarea>
              <label htmlFor="recipieInstructions">Instructions</label>
            </div>
          </div>
          <div className="row">
          	<div className="col s4 offset-s8">
              <button onClick={this.handleSubmit} 
                 			className="btn waves-effect waves-light red lighten-1 modal-close" 
                      type="submit">Add recipie
              	<i className="material-icons right">add</i>
              </button>   
            </div> 
          </div>
        </div>
      </div>  
		)
	}
})

module.exports = AddRecipieModal;