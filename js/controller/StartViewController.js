var StartViewController = function (model,view){
//    var controller = this;
    
    $("#MainPage").hide();
    $("#ResultBar").hide();
    
    this.refresh = function () {
        $(view.container).hide(200);
        $("#MainPage").show(200);
    }
    
    view.createDinnerBtn.click(this.refresh);
//    $("#MainPage").show(200);
}