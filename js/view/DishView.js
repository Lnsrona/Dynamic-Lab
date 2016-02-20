var DishView = function (container) {
    this.container = container;
	this.dishName = container.find("#dishName");
    this.dishDescription = container.find("#dishDescription");
    this.dishNumGeustCount = container.find("#dishNumGeustCount");
    this.dishConfirmBtn = container.find("#dishConfirmBtn");
    this.dishBackBtn = container.find("#dishBackBtn");
    this.dishPriceSum = container.find("#dishPriceSum");
    this.dishImage = container.find("#dishImg");
    this.ingrediantsListView = container.find("#ingrediantsListView");
    this.ingrediantTrTemplate = container.find("#ingrediantTrTemplate").text();
}