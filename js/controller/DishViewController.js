var DishViewController = function (model, view) {
    
    var _this = this;
    this.dish = null;
    this.totalPrice = 0;
    this.isInMenu = false;
    $(view.container).hide(200);
    
    this.reloadIngredients = function()
    {
        var ingredients = this.dish.Ingredients;
        var numGuests = model.getNumberOfGuests();
        
        view.ingrediantsListView.empty();
        ingredients.forEach(function (ingr) {
            var ingrHtml = instantiate(view.ingrediantTrTemplate,ingr);
            view.ingrediantsListView.append(ingrHtml);
        });
        
        _this.totalPrice = 0;
        $(".ingr-price").each(function(idx,elem){
            //var price = parseFloat($(elem).text()) * numGuests;
            var price =  parseFloat($(elem).data("price")) * numGuests;
            $(elem).text(price);
            _this.totalPrice += price;
        });
        $(".ingr-quantity").each(function(idx,elem){
            //var price = parseFloat($(elem).text()) * numGuests;
            var quantity =  parseFloat($(elem).data("quantity")) * numGuests;
            $(elem).text(quantity);
        });      

        view.dishPriceSum.text(_this.totalPrice);
    };
    
    this.reloadNumGuests = function () {
        var ng = model.getNumberOfGuests();
        view.dishNumGeustCount.text(ng);
        _this.reloadIngredients();
    };
    
    this.onDishRemovedFromMenu = function(dish_id)
    {
        if (_this.dish.RecipeID == dish_id)
        {
            _this.isInMenu = model.isDishInMenu(dish_id);
            _this.reloadConfirmButtonState();
        }
    };
    
    this.reloadConfirmButtonState = function()
    {
        view.dishConfirmBtn.toggleClass("btn-danger",_this.isInMenu);
        view.dishConfirmBtn.toggleClass("btn-success",!_this.isInMenu)
        if (_this.isInMenu)
        {
            view.dishConfirmBtn.text("Remove Dish");
            g_menuController.setPendingDish(_this.dish.id,-_this.totalPrice);
        } else
        {
            view.dishConfirmBtn.text("Confirm Dish");
            g_menuController.setPendingDish(_this.dish.id,_this.totalPrice);
        }        
    };
    
//     this.loadDish = function (dish_id) {
//         this.dish = g_dataModel.getDishAsync(dish_id).done(function (data) {
//             alert("done ! " + JSON.stringify(data));
//             }).fail(function () {
//             alert("failed");
//             });
// //        this.dish = model.getDish(dish_id);

//         view.dishName.text(this.dish.name);
//         view.dishDescription.text(this.dish.description);
//         view.dishImage.attr("src", "images/" + this.dish.image);
        
//         _this.isInMenu = model.isDishInMenu(dish_id);
//         this.reloadNumGuests();
        
//         _this.reloadConfirmButtonState();
//     };

    this.showProgress = function()
    {
        //view.progressRing.show();
        view.dishName.text("loading...");
        view.dishDescription.text("");
        view.dishImage.hide();
        view.ingrediantsListView.hide();
    };
    
    this.showResult = function()
    {
        view.dishImage.show();
        view.ingrediantsListView.show();
    };
    
    this.showError = function()
    {
        
    };
    
    this.loadDish = function (dish_id) {
        model.getDishAsync(dish_id).done(function (dish) {
            _this.dish = dish;

            _this.showResult();

            view.dishName.text(dish.Title);
            view.dishDescription.text(dish.Description);
            view.dishImage.attr("src",dish.ImageURL);
        
            _this.isInMenu = model.isDishInMenu(dish_id);
            _this.reloadNumGuests();
        
            _this.reloadConfirmButtonState();
        }).fail(function () {
            _this.showError();
        });
        _this.showProgress();

    };
    
    this.showDish = function (dish_id) {
        $(view.container).show();
        _this.loadDish(dish_id);
    };
    
    this.hide = function () {
        g_menuController.setPendingDish(0,"0.00");
        $(view.container).hide(200);
    };
    
    this.goBack = function()
    {
        g_menuController.setPendingDish(0,"0.00");
        _this.hide();
        g_indexController.show();
    };
    
    this.confirmDish = function () {
        var did = _this.dish.RecipeID;
        var is_add = !model.isDishInMenu(did);
        
        if (!is_add)
            model.removeDishFromMenu(did);
        else
            model.addDishToMenu(_this.dish);

        _this.onDishRemovedFromMenu(did);

        g_menuController.onMenuChanged(did,is_add); 
        _this.goBack();
    };
    
    view.dishBackBtn.click(this.goBack);
    view.dishConfirmBtn.click(this.confirmDish);
}