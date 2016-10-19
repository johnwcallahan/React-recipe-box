var React = require('react');
var DynamicRow = require('./DynamicRow');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var EditRecipieModal = React.createClass({
  getInitialState: function() {
		return {
      name: '',
      tempQuanity: '',
      tempIngredient: '',
			ingredients: [],
      instructions: '',
		}
	},
  componentWillReceiveProps: function(nextProps) {
    document.getElementById('recipieNameEDIT').value = nextProps.recipie.name;
    document.getElementById('recipieInstructionsEDIT').value = nextProps.recipie.instructions;
    this.setState({ 
      name: nextProps.recipie.name, 
      ingredients: nextProps.recipie.ingredients, 
      instructions: nextProps.recipie.instructions });
  },
  handlNameChange: function(e) {
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
    
    document.getElementById('addQuanityFieldEDIT').value = '';
    document.getElementById('addIngredientFieldEDIT').value = '';
  },  
  handlinstructionsChange: function(e) {
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

    //finally, refresh list of recipies
    this.props.updateRecipieList();
  },
  handleDelete: function() {
    this.props.handleDelete();
    // document.getElementById('recipieNameEDIT').value = '';
    // document.getElementById('recipieInstructionsEDIT').value = '';
    // document.getElementById('addQuanityFieldEDIT').value = '';
    // document.getElementById('addIngredientFieldEDIT').value = '';
  },
  handleUpdate: function() {
    var updatedRecipie = {};
    updatedRecipie.name = this.state.name;
    updatedRecipie.ingredients = this.state.ingredients;
    updatedRecipie.instructions = this.state.instructions;
    this.props.handleUpdate(updatedRecipie);
    document.getElementById('recipieNameEDIT').value = '';
    document.getElementById('addQuanityFieldEDIT').value = '';
    document.getElementById('addIngredientFieldEDIT').value = '';
    document.getElementById('recipieInstructionsEDIT').value = '';
  },
	render: function() {
    var ingredientId = -1;
    if (this.props.recipie.ingredients) {
      var ingredients = this.state.ingredients.map(function(e) {
        ingredientId++;
        return <DynamicRow quanity={e[1]}
                           ingredient={e[0]}
                           handleRemove={this.handleRemove.bind(null, ingredientId)}
                           ingredientId={ingredientId}
                           key={getRandomInt(1, 10000)} />
      }.bind(this));		
    }
		return (
    	<div id="editRecipieModal" className="modal">
      	<div className="modal-content">
          <div className="row">
          	<div className="input-field col s12"> 
            	<input id="recipieNameEDIT" type="text" placeholder="" onChange={this.handlNameChange} />
              <label htmlFor="recipieNameEDIT">Recipie Name</label>
            </div>
          </div>
          <div className="row">  
          	<div className="input-field col s4">
            	<input id="addQuanityFieldEDIT" type="text" defaultValue={this.state.tempQuanity} onChange={this.handleQuanityChange} />
              <label htmlFor="addQuanityFieldEDIT">Quanity</label>
            </div>              
            <div className="input-field col s4">
              <input id="addIngredientFieldEDIT" type="text" defaultValue={this.state.tempIngredient} onChange={this.handleIngredientChange} />
              <label htmlFor="addIngredientFieldEDIT">Ingredient</label>
            </div>
            <div className="col s4">
            	<a id="addIngredientButtonEDIT" 
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
            	<textarea id="recipieInstructionsEDIT" 
                        className="materialize-textarea" 
                        placeholder=""
                        onChange={this.handlinstructionsChange}></textarea>
              <label htmlFor="recipieInstructionsEDIT">Instructions</label>
            </div>
          </div>
          <div className="row">
             <div className="col s4">
                <button onClick={this.handleDelete}
                        className="btn waves-effect waves-light amber lighten-1 modal-close" 
                        name="action" type="submit" >Delete Recipie</button>   
              </div>                 
              <div className="right-align col s4 offset-s4">
                <button onClick={this.handleUpdate} 
                        className="btn waves-effect waves-light red lighten-1 modal-close" 
                        name="action" type="submit">Update Recipie</button>   
              </div> 
          </div>
        </div>
      </div>  
		)
	}
});

module.exports = EditRecipieModal;