/* global ExampleController */
/* global ExampleView */
/* global DinnerModel */
$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var indexView = new IndexView($("#IndexView"));
    
    var controller = new IndexViewController(model, indexView);
});