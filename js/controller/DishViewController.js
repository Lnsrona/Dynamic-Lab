var DishViewController = function (model, view) {
    
    var controller = this;
    this.dish = null;
    
    this.reloadIngredients = function()
    {
        var ingredients = this.dish.ingredients;
        var numGuests = model.getNumberOfGuests();
        
        view.ingrediantsListView.empty();
        ingredients.forEach(function (ingr) {
            var ingrHtml = instantiate(view.ingrediantTrTemplate,ingr);
            view.ingrediantsListView.append(ingrHtml);
        });
        
        var totalPrice = 0;
        $(".ingr-price").each(function(idx,elem){
            var price = parseFloat($(elem).text()) * numGuests;
            $(elem).text(price);
            totalPrice += price;
        });
        
        view.dishPriceSum.text(totalPrice);
    };
    
    this.reloadNumGuests = function () {
        var ng = model.getNumberOfGuests();
        view.dishNumGeustCount.text(ng);
        controller.reloadIngredients();
    }
    
    this.loadDish = function (dish_id) {
        this.dish = model.getDish(dish_id);

        view.dishName.text(this.dish.name);
        view.dishDescription.text(this.dish.description);
        view.dishImage.attr("src", "images/" + this.dish.image);
        
        view.dishConfirmBtn.prop("disabled",model.isDishInMenu(dish_id));

        this.reloadNumGuests();
    };
    
    this.showDish = function (dish_id) {
        $(view.container).show();
        this.loadDish(dish_id);
    }
    
    this.hide = function () {
        $(view.container).hide(200);
    };
    
    this.goBack = function()
    {
        controller.hide();
        g_indexController.show();
    };
    
    this.confirmDish = function () {
        model.addDishToMenu(controller.dish.id);
        controller.goBack();
    }
    
    view.dishBackBtn.click(this.goBack);
    view.dishConfirmBtn.click(this.confirmDish);
}