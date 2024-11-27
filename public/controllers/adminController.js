app.controller("adminController", function ($scope, authService, $location) {
    $scope.logout = function () {
        authService.logout();
        $location.path("/login");
    };

    $scope.products = [
        // Produtos exemplo para teste inicial
        { nomeProduto: "Teclado", preco: 100, categoria: "Periféricos" },
        { nomeProduto: "Mouse", preco: 50, categoria: "Periféricos" }
    ];

    $scope.addProduct = function () {
        const newProduct = {
            nomeProduto: $scope.newProduct.nomeProduto,
            preco: $scope.newProduct.preco,
            categoria: $scope.newProduct.categoria
        };

        $scope.products.push(newProduct);
        $scope.newProduct = {};
    };

    $scope.deleteProduct = function (index) {
        $scope.products.splice(index, 1);
    };
});
