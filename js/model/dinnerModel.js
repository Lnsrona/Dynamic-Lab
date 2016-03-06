//DinnerModel Object constructor
function caculateDishPrice(dish)
{
    dish.price = dish.Ingredients.reduce(function(previousValue, ingr, currentIndex, array){
        return previousValue + ingr.Quantity * 1; 
    }, 0);
    
    dish.Price = dish.price; 
    return dish;
};
var DinnerModel = function() {
 
	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu
	this.numberGuests = 1;
    this.menuDishes = [];
    this.api_key = "r02x0R09O76JMCMc4nuM0PJXawUHpBUL";
    var _this = this;
    // this.caculateAllDishPrice = function()
    // {
    //     dishes.forEach(function (dish,idx,array) {
    //         dish.price = dish.ingredients.reduce(function(previousValue, ingr, currentIndex, array){
    //             return previousValue + ingr.price.toFixed(2); 
    //         }, 0);
    //     })
    // };
	
	this.setNumberOfGuests = function(num) {
		_this.numberGuests = num;
	};

	// should return 
	this.getNumberOfGuests = function() {
		return _this.numberGuests;
	};

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		_this.menuDishes.filter(function(index,dish) {
	  	return dish.type == type;
	  });
	};

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
       return _this.menuDishes;
	};

	// Returns all ingredients for all the dishes on the menu.
    // NOTE, This methods returns the ingredients PER PERSON
	this.getAllIngredients = function() {
		var ingreds = [];
        var nonDup = [];
        this.menuDishes.forEach(function (dish,index,array) {
            Array.prototype.push.apply(ingreds, dish.ingredients);
        });
        ingreds.sort(function(a, b){return a.id - b.id});
        
        // merge ingredients
        ingreds.forEach(function (value,index,array) {
           if (index == 0 || value.id > array[index-1].id)
           {
               nonDup.push(JSON.parse(JSON.stringify(value))); // .clone()
               // nonDup[nonDup.length-1].quantity *= this.numberGuests;
           } else
           {
               var nid = nonDup.findIndex(function(ind){return ind.id == value.id;});
               nonDup[nid].quantity += value.quantity; // *this.numberGuests
               nonDup[nid].price += value.price;
           }
        });
        return nonDup;
	};

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
        var sumPrice = 0;
        sumPrice = _this.menuDishes.reduce(function(prevalue,dish,idx,arr){
            return prevalue + dish.price;
        },0);
        return sumPrice;
	}
    
    this.isDishInMenu = function (id) {
	  for(var index in _this.menuDishes){
			if(_this.menuDishes[index].RecipeID == id) {
				return true;
			}
		}
        return false;
    }

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(dish) {
        if (_this.isDishInMenu(dish.RecipeID))
            return false;
        _this.menuDishes.push(dish);
        _this.menuDishes.sort(function(a, b){return a.id - b.id});
 	};

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
        _this.menuDishes.find(function (element, index, array){
            if (element.RecipeID == id)
            {
                array.splice(index,1);
                return true;
            }
            return false;
        });
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	// this.getAllDishes = function (type,filter) {
    //     return $(dishes).filter(function(index,dish) {
	// 	var found = true;
	// 	if(filter && filter.length > 0){
	// 		found = false;
	// 		$.each(dish.ingredients,function(index,ingredient) {
	// 			if(ingredient.name.indexOf(filter)!=-1) {
	// 				found = true;
	// 			}
	// 		});
	// 		if(dish.name.indexOf(filter) != -1)
	// 		{
	// 			found = true;
	// 		}
	// 	}
	//   	return (type=="all" || dish.type == type) && found;
	//   });	
	// }
    
    this.getAllDishesAsync = function (category,keyword) {
        if (keyword == null || keyword == "")
            keyword = "honey";
        var url = "http://api.bigoven.com/recipes?pg=1&rpp=24&title_kw="
                + keyword 
                + "&api_key=" + _this.api_key;

        return $.get(url,function(data){},"json").then(function donefilter(data) {
           var count = data.ResultCount;
           return $(data.Results).filter(function(index,dish) {
                
                return (category=="all" ||  dish.Category == category) && dish.ImageURL120.indexOf("recipe-no-image") < 0;
		   });
        });
    }

	//function that returns a dish of specific ID
// 	this.getDish = function (id) {

// //         //We instantiate our model
// //         var get_dish_base = "http://api.bigoven.com/recipe/{id}?api_key=" + this.api_key;
// //         var url = "http://api.bigoven.com/recipe/" + id + "?api_key=" + this.api_key;
// // 
// //         return $.get(url,null,"json");
        
//           for(var index in dishes){
//         		if(dishes[index].id == id) {
//         			return dishes[index];
//         		}
//         	}
// 	}

	this.getDishAsync = function (id) {
        //We instantiate our model
        //var get_dish_base = "http://api.bigoven.com/recipe/{id}?api_key=" + this.api_key;
        var url = "http://api.bigoven.com/recipe/" + id + "?api_key=" + _this.api_key;

        return $.get(url,function(data){},"json").then(function filter(dish) {
            return caculateDishPrice(dish);
        });
    }

	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

 }
