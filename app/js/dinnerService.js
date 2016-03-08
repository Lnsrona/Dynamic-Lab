// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.

dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  this.numberGuests = 1;
  this.menuDishes = [];
  this.YOUR_API_KEY = "r02x0R09O76JMCMc4nuM0PJXawUHpBUL";
  var _this = this;


  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }
  
  this.caculateDishPrice = function(dish) {
      dish.price = dish.Ingredients.reduce(function(previousValue, ingr, currentIndex, array){
        return previousValue + ingr.Quantity * 1; 
    }, 0);
    
    dish.Price = dish.price; 
    return dish;
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

    
    
	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
       return _this.menuDishes;
	};

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
	};
    
    this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:24,api_key:'YOUR_API_KEY'});
    this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'YOUR_API_KEY'}); 
    
    // this.getAllDishes = function (keyword) {
    //     if (keyword == null || keyword == "")
    //         keyword = "honey";
    //     var url = "http://api.bigoven.com/recipes?pg=1&rpp=24&title_kw="
    //             + keyword 
    //             + "&api_key=" + _this.api_key;
    //     return $resource('url');        
    // }     
    
    // this.getDish = function (id) {    
    //     var url = "http://api.bigoven.com/recipe/" + id + "?api_key=" + _this.api_key;  
    //     _this.Dish = $resource('url');
    //     caculateDishPrice(_this.dish);
    //     return _this.Dish;
    // }
    

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});