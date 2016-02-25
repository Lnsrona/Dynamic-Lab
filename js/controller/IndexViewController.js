var IndexViewController = function (model,view) {
    this.dishType = "all";
    this.keyword = "";
    var controller = this;
//    $(view.container).hide(200);
    
    this.show = function () {
        $(view.container).show(200);
    }
    
    this.hide = function () {
        $(view.container).hide(200);
    }

    this.showDishDetail = function (dish) {
        this.hide();
        g_dishController.showDish(dish);
    };
    
    // helper functions for refresh dish-list-view
    this.reload = function (dishes) {
        view.dishesListView.empty();
        dishes.each(function (idx, dish) {
            var dishhtml = instantiate(view.dishPreviewTemplate,dish);
            view.dishesListView.append(dishhtml);
        });
        $(".dish-preview").click(function(){
            controller.showDishDetail($(this).data("id"));
        });
    };
    
    this.refreshView = function () {
        var dishes = model.getAllDishes(controller.dishType,controller.keyword);
        controller.reload(dishes);        
    }

    // startup and refresh
    this.refreshView();

    // register search button click event 
    view.searchButton.click(this.refreshView);
    
    // register dish-type-filter's option's click event 
    view.searchTypeOptions.click(function () {
        controller.dishType = $(this).text();
        view.searchTypePreview.text(controller.dishType);
        controller.refreshView();
    });
    
    // register keyword-input text box changed event
    view.searchKeyworldInput.change(function(){
       controller.keyword = this.value.trim(); 
       controller.refreshView();
    });
}