var ResultViewController = function (model) {
    var controller = this;
    var container = $("#ResultBar");
    var goBackButton = container.find("#GoBack");
    var receiptButton = container.find("#ReceiptConfirmBtn");
    this.GeustCountTextBlock = container.find("#GeustCount");
    this.totalPriceTextBlock = container.find("#totalPrice");
    this.show = function()
    {
        $("#MainPage").hide();
        $("#ResultBar").show();
        $("#ConfirmPage").show();
        $("#FinalPage").hide();
        var ng = model.getNumberOfGuests();
        var pr = model.getTotalMenuPrice();
        var tp = ng * pr;
        controller.GeustCountTextBlock.text(ng);
        controller.totalPriceTextBlock.text(tp);
        controller.reload();
    };
    
    this.back = function () {
        $("#MainPage").show();
        $("#ResultBar").hide();
    }
    
    var dishesListView0 = container.find("#dishesListView0");
    var dishPreview0Template = container.find("#dishPreview0Template").text();
    var finalView = container.find("#FinalPage");
    var finalTemplate = container.find("#finalTemplate").text();
    this.reload = function () {
        var dishes = model.getFullMenu();
        dishesListView0.empty();
        finalView.empty();
        dishes.forEach(function (dish) {
            var dishhtml0 = instantiate(dishPreview0Template,dish);
            dishesListView0.append(dishhtml0);
            var dishhtml1 = instantiate(finalTemplate,dish);
            finalView.append(dishhtml1);
        });
    };
     
    this.final = function () {
        $("#ConfirmPage").hide();
        $("#FinalPage").show();
    }
    
    goBackButton.click(this.back);
    receiptButton.click(this.final);
}