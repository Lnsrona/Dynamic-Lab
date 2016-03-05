var DishViewController = function (model, view) {
    
    var controller = this;
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
        
        controller.totalPrice = 0;
        $(".ingr-price").each(function(idx,elem){
            //var price = parseFloat($(elem).text()) * numGuests;
            var price =  parseFloat($(elem).data("Quantity")) * numGuests;
            $(elem).text(price);
            controller.totalPrice += price;
        });
        $(".ingr-quantity").each(function(idx,elem){
            //var price = parseFloat($(elem).text()) * numGuests;
            var quantity =  parseFloat($(elem).data("Quantity")) * numGuests;
            $(elem).text(quantity);
        });      

        view.dishPriceSum.text(controller.totalPrice);
    };
    
    this.reloadNumGuests = function () {
        var ng = model.getNumberOfGuests();
        view.dishNumGeustCount.text(ng);
        controller.reloadIngredients();
    };
    
    this.onDishRemovedFromMenu = function(dish_id)
    {
        if (controller.dish.id == dish_id)
        {
            controller.isInMenu = model.isDishInMenu(dish_id);
            controller.reloadConfirmButtonState();
        }
    };
    
    this.reloadConfirmButtonState = function()
    {
        view.dishConfirmBtn.toggleClass("btn-danger",controller.isInMenu);
        view.dishConfirmBtn.toggleClass("btn-success",!controller.isInMenu)
        if (controller.isInMenu)
        {
            view.dishConfirmBtn.text("Remove Dish");
            g_menuController.setPendingDish(controller.dish.id,-controller.totalPrice);
        } else
        {
            view.dishConfirmBtn.text("Confirm Dish");
            g_menuController.setPendingDish(controller.dish.id,controller.totalPrice);
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
        
//         controller.isInMenu = model.isDishInMenu(dish_id);
//         this.reloadNumGuests();
        
//         controller.reloadConfirmButtonState();
//     };

    this.loadDish = function (dish_id) {
        model.getDishAsync(dish_id).done(function (dish) {
            controller.dish = dish;
            view.dishName.text(dish.Title);
            view.dishDescription.text(dish.Description);
            view.dishImage.attr("src",dish.ImageURL);
        
            controller.isInMenu = model.isDishInMenu(dish_id);
            controller.reloadNumGuests();
        
            controller.reloadConfirmButtonState();
            }).fail(function () {
                alert("failed");
            });
    };
    
    this.showDish = function (dish_id) {
        $(view.container).show();
        this.loadDish(dish_id);
    };
    
    this.hide = function () {
        g_menuController.setPendingDish(0,"0.00");
        $(view.container).hide(200);
    };
    
    this.goBack = function()
    {
        g_menuController.setPendingDish(0,"0.00");
        controller.hide();
        g_indexController.show();
    };
    
    this.confirmDish = function () {
        var did = controller.dish.id;
        var is_add = !model.isDishInMenu(did);
        
        if (!is_add)
            model.removeDishFromMenu(did);
        else
            model.addDishToMenu(did);

        controller.onDishRemovedFromMenu(did);

        g_menuController.onMenuChanged(did,is_add); 
        controller.goBack();
    };
    
    view.dishBackBtn.click(this.goBack);
    view.dishConfirmBtn.click(this.confirmDish);
}