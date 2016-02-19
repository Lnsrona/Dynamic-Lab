var IndexViewController = function (model,view) {
    this.dishType = "all";
    this.keyword = "";
    
    var controller = this;
    
    view.searchTypeOptions.click(function () {
        controller.dishType = $(this).text();
        view.searchTypePreview.text(controller.dishType);
        controller.refreshView();
    });
    
    view.searchKeyworldInput.change(function(){
       controller.keyword = this.value.trim(); 
       controller.refreshView();
    });
        
    this.reload = function (dishes) {
        view.dishesListView.empty();
        dishes.each(function (idx, dish) {
            var dishhtml = instantiate(view.dishPreviewTemplate,dish);
            view.dishesListView.append(dishhtml);
        });
    };
    
    this.refreshView = function () {
        var dishes = model.getAllDishes(controller.dishType,controller.keyword);
        controller.reload(dishes);        
    }
    view.searchButton.click(this.refreshView);
    
    
    this.reload(model.getAllDishes(this.dishType,this.keyword));
}