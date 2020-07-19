var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"bars","component":"BarsListComponent","canActivate":["AuthGuard"]},{"path":"drinks","component":"DrinksListComponent","canActivate":["AuthGuard"]},{"path":"bar/:id","component":"DetailBarComponent","canActivate":["AuthGuard"]},{"path":"drinks/filter","component":"FilterParentComponent","canActivate":["AuthGuard"]},{"path":"drinks/filtered_drinks/:filter","component":"ShowFilterComponent","canActivate":["AuthGuard"]},{"path":"post-drink","component":"PostDrinkComponent","canActivate":["AuthGuard"]},{"path":"post-your-business","component":"PostBusinessComponent","canActivate":["AuthGuard"]},{"path":"drinkly-team","component":"DrinklyTeamComponent","canActivate":["AuthGuard"]},{"path":"drink/:id","component":"RecipeComponent","canActivate":["AuthGuard"]},{"path":"register","component":"RegisterComponent"},{"path":"login","component":"LoginComponent"},{"path":"profile","component":"ProfileComponent","canActivate":["AuthGuard"]},{"path":"edit-user/:id","component":"EditUserComponent","canActivate":["AuthGuard"]},{"path":"externalRedirect","canActivate":["externalUrlProvider"],"component":"NotFoundComponent"},{"path":"","component":"HomeComponent"},{"path":"games","component":"JuegosComponent","canActivate":["AuthGuard"]},{"path":"admin","component":"AdminHomeComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/ingredient/add","component":"AddIngredientComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/ingredient","component":"ListIngredientComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/ingredient/edit/:id","component":"EditIngredientComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/bar/add","component":"AddBarComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/bar","component":"ListBarComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/bar/edit/:id","component":"EditBarComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/drink","component":"ListDrinkComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/drink/add","component":"AddDrinkComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/drink/edit/:id","component":"EditDrinkComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/zone","component":"ListZoneComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/zone/add","component":"AddZoneComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/zone/edit/:id","component":"EditZoneComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/game","component":"ListGameComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/game/edit/:id","component":"EditGameComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/ad","component":"ListAdComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/ad/add","component":"AddAdComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/ad/edit/:id","component":"EditAdComponent","canActivate":["AdminAuthGuard"]},{"path":"admin/user","component":"ListUserComponent","canActivate":["AdminAuthGuard"]},{"path":"prueba/barra","component":"TestBarComponent"},{"path":"**","component":"NotFoundComponent"}],"kind":"module"}]}
