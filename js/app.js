$(function() {
	//We instantiate our model
	g_dataModel = new DinnerModel();
	
	//And create the needed controllers and views
	g_indexView = new IndexView($("#IndexView"));
    
    g_indexController = new IndexViewController(g_dataModel, g_indexView);
    
    g_dishView = new DishView($("#dishView"));
    
    g_dishController = new DishViewController(g_dataModel, g_dishView);
    
    g_menuView = new MenuView("#menuPreviewPanel");
    
    g_menuController = new MenuViewController(g_dataModel, g_menuView);
});