$(function() {
	//We instantiate our model
	g_dataModel = new DinnerModel();
	g_dataModel.caculateAllDishPrice();    
    
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