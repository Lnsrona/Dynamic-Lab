var IndexView = function (container) {
    this.container = container;
	this.heading = container.find(".panel-heading");
    this.searchKeyworldInput = container.find("#searchKeywordInput");
    this.searchTypeDropdown = container.find("#searchTypeDropdown");
    this.searchTypePreview = container.find("#searchTypePreview");
    this.searchButton = container.find("#searchButton");
    this.dishesListView = container.find("#dishesListView");
    this.searchTypeOptions = $(".dish-type");
    this.dishPreviewTemplate = container.find("#dishPreviewTemplate").text();
}
 
