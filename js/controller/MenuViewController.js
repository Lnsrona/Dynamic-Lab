var MenuViewController = function (model,view) {
    var controller = this;
    this.menuCost = 0;
    this.pendingCost = 0;
//    $(view.container).hide(200);
    view.menuPriceSum.text("0.00");
    view.numPeopleInput.attr("value",model.getNumberOfGuests());
    
    view.numPeopleInput.change(function(){
        var newNg = parseInt(this.value);
        model.setNumberOfGuests(newNg);
        // --------
        g_dishController.reloadNumGuests();
        controller.refreshMenuSumPrice();
        view.pendingDishPrice.text((controller.pendingCost * newNg).toFixed(2));
        controller.refreshMenuListViewPrices();
    });
    
    this.refreshMenuSumPrice = function()
    {
        var sumCost = model.getNumberOfGuests() * (controller.menuCost + controller.pendingCost);
        view.menuPriceSum.text(sumCost.toFixed(2));
    };
    
    this.onMenuChanged = function(dish_id, is_add)
    {
        controller.menuCost = model.getTotalMenuPrice();
        controller.refreshMenuSumPrice();
        controller.refreshMenuListView(dish_id, is_add);
        // setPendingDish(15,1000)
    };
    
    this.setPendingDish = function(dish_id,price)
    {
        // assert(getDish(dish_id).price == price);
        if (dish_id > 0)
        {
            //var dish = model.getDish(dish_id);
            view.menuListView.find("#menu-dish-preview-"+dish_id).toggleClass("danger",true);
        } else{
            view.menuListView.find(".menuDishPriview").toggleClass("danger",false);
        }
        
        // pending price per person
        var ppp = parseFloat(price);
        
        controller.pendingCost = ppp;
        
        view.pendingDishPrice.text((model.getNumberOfGuests() * ppp).toFixed(2));
        var episilon = 0.01;

        view.pendingRow.toggleClass("success",ppp > episilon);
        view.pendingRow.toggleClass("danger",ppp < -episilon);

        controller.refreshMenuSumPrice();
    };
    
    this.refreshMenuListViewPrices = function()
    {
        var ng = model.getNumberOfGuests();
        view.menuListView.find(".dish-price").each(function (idx, elem){
            $(elem).text(($(elem).data("price") * ng).toFixed(2));
        });
    }
    
    this.refreshMenuListView = function (dish_id, is_add) {
        if (dish_id && parseInt(dish_id) > 0)
        {
            if (is_add)
            {
                //$("li:not(:first-child)")
                model.getDishAsync(dish_id).done(function(dish){
                    var dpHtml = instantiate(view.menuDishPreviewTemplate, dish);
                    view.pendingRow.before(dpHtml);
                    var item = view.menuListView.find("#menu-dish-preview-"+dish_id);
                    item.find(".dish-delete-btn").click(function () {
                        var did = $(this).data("id");
                        var is_add = !model.isDishInMenu(did);
                        if (!is_add)
                        {
                            model.removeDishFromMenu(did);
                            g_dishController.onDishRemovedFromMenu(did);
                            controller.onMenuChanged(did,is_add);
                        }
                    });
                    controller.refreshMenuListViewPrices();
                });
                                       
            } else{
                view.menuListView.find("#menu-dish-preview-"+dish_id).remove();
            }
        }
        controller.refreshMenuListViewPrices();
    };
    
    this.nextPage = function () {
        g_resultController.show();
    };
    
    view.menuConfirmBtn.click(this.nextPage);
 
    
    // var refreshNumberOfGuests = function()
    // {
    //     view.numberOfGuests.html(model.getNumberOfGuests());  
    // };
    // this.addGuest = function () {
    //     // view.numberOfGuests.html("World is bad");
    //     model.setNumberOfGuests(model.getNumberOfGuests() + 1);
    //     
    //     refreshNumberOfGuests();
    //     
    //     view.guestList.append("<li>Guest</li>");
    // };
    // this.removeGuest = function ()
    // {
    //     var ng = model.getNumberOfGuests();
    //     if (ng >= 1)
    //     {
    //         model.setNumberOfGuests(ng - 1);
    //         refreshNumberOfGuests();
    //         view.guestList.find("li:last-child").remove();
    //     } else
    //     {
    //         alert("No more guest to minus");
    //     }
    // };
    // view.plusButton.click(this.addGuest);
    // view.minusButton.click(this.removeGuest);
    
}