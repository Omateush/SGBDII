const app = angular.module("app", ["ngRoute"]); // Define o módulo principal


app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "authController"
        })
        .when("/admin", {
            templateUrl: "views/admin.html",
            controller: "adminController"
        })
        .when("/produtos", {
            templateUrl: "views/produtos.html",
            controller: "produtosController"
        })
        .otherwise({
            redirectTo: "/login"
        });
});
