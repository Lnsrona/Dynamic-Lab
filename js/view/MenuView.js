var MenuView = function (container) {
    this.container = container;
    this.numPeopleInput = container.find("#numPeopleInput");
    this.menuPriceSum = container.find("#menuPriceSum");
    this.menuDishPreviewTemplate = container.find("#menuDishPreviewTemplate").text();
    this.pendingDishPrice = container.find("#pendingDishPrice");
    this.pendingRow = container.find("#pendingRow");
    this.menuListView = container.find("#menuListView");
    this.menuConfirmBtn = container.find("#MenuConfirmBtn");
}
 
