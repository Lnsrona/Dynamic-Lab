var StartViewController = function (model,view){
//    var controller = this;
    
    $("#MainPage").hide(200);
    $("#Page3").hide(200);
    
    this.refresh = function () {
        $(view.container).hide(200);
        $("#MainPage").show(200);
    }
    
    view.createDinnerBtn.click(this.refresh);
//    $("#MainPage").show(200);
}