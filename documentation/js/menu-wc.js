'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">drinkly documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' : 'data-target="#xs-components-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' :
                                            'id="xs-components-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' }>
                                            <li class="link">
                                                <a href="components/AddAdComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddAdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddDrinkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddDrinkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddGameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddGameComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddIngredientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddIngredientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddZoneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddZoneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DrinklyTeamComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DrinklyTeamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DrinksFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DrinksFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DrinksListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DrinksListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditAdComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditAdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditDrinkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditDrinkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditGameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditGameComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditIngredientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditIngredientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditZoneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditZoneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterChildComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterChildComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterParentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterParentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JuegosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JuegosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListAdComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListAdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListDrinkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListDrinkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListGameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListGameComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListIngredientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListIngredientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListZoneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListZoneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostBusinessComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PostBusinessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostDrinkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PostDrinkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecipeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequiredFieldComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequiredFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShowFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TestBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadingLoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadingLoaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' : 'data-target="#xs-directives-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' :
                                        'id="xs-directives-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' }>
                                        <li class="link">
                                            <a href="directives/AgeValidatorDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgeValidatorDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ExternalUrlDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExternalUrlDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/clickedOutDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">clickedOutDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/passwordValidator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">passwordValidator</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' : 'data-target="#xs-injectables-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' :
                                        'id="xs-injectables-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' : 'data-target="#xs-pipes-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' :
                                            'id="xs-pipes-links-module-AppModule-ea9189d88d440c4687c551ec749ee0c9"' }>
                                            <li class="link">
                                                <a href="pipes/FilterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/advertisement.html" data-type="entity-link">advertisement</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppSettings.html" data-type="entity-link">AppSettings</a>
                            </li>
                            <li class="link">
                                <a href="classes/Bar.html" data-type="entity-link">Bar</a>
                            </li>
                            <li class="link">
                                <a href="classes/drink.html" data-type="entity-link">drink</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ficha.html" data-type="entity-link">Ficha</a>
                            </li>
                            <li class="link">
                                <a href="classes/game.html" data-type="entity-link">game</a>
                            </li>
                            <li class="link">
                                <a href="classes/ingredient.html" data-type="entity-link">ingredient</a>
                            </li>
                            <li class="link">
                                <a href="classes/item.html" data-type="entity-link">item</a>
                            </li>
                            <li class="link">
                                <a href="classes/user.html" data-type="entity-link">user</a>
                            </li>
                            <li class="link">
                                <a href="classes/userP.html" data-type="entity-link">userP</a>
                            </li>
                            <li class="link">
                                <a href="classes/zone.html" data-type="entity-link">zone</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdvertisementService.html" data-type="entity-link">AdvertisementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BarService.html" data-type="entity-link">BarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link">CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DrinkService.html" data-type="entity-link">DrinkService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GameService.html" data-type="entity-link">GameService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngredientService.html" data-type="entity-link">IngredientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SendMailService.html" data-type="entity-link">SendMailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link">SharedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZoneService.html" data-type="entity-link">ZoneService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminAuthGuard.html" data-type="entity-link">AdminAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});