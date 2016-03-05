$(function() {
	//We instantiate our model
   var api_key = "r02x0R09O76JMCMc4nuM0PJXawUHpBUL";//
   var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&api_key=" + api_key;
    
//   var id = 530115;
//   var url = "http://api.bigoven.com/recipe?pg=1&rpp=25&api_key=" + id + "?api_key=" + api_key;
   $.get(url,function(data){},"json").done(function (data) {
        alert("done ! " + JSON.stringify(data));
    }).fail(function () {
        alert("failed");
    });
    
	g_dataModel = new DinnerModel();
	g_dataModel.caculateAllDishPrice();    

    // g_dataModel.getDishAsync(id).done(function (data) {
    //     alert("done ! " + JSON.stringify(data));
    // }).fail(function () {
    //     alert("failed");
    // });
    
	//And create the needed controllers and views
	g_startView = new StartView($("#StartView"));
    
    g_startController = new StartViewController(g_dataModel, g_startView);
        
    g_indexView = new IndexView($("#IndexView"));
    
    g_indexController = new IndexViewController(g_dataModel, g_indexView);
    
    g_dishView = new DishView($("#dishView"));
    
    g_dishController = new DishViewController(g_dataModel, g_dishView);
    
    g_menuView = new MenuView($("#menuPreviewPanel"));
    
    g_menuController = new MenuViewController(g_dataModel, g_menuView);
    
    g_resultController = new ResultViewController(g_dataModel);
});