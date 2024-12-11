app.controller("produtosController", function ($scope, $http, authService) {
    $scope.produtos = [];
    const token = authService.getToken();

    // Buscar todos os produtos
    $scope.getProdutos = function () {
        $http.get("/api/produtos", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                $scope.produtos = response.data;
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error);
            });
    };

    // Adicionar produto (Apenas admin)
    $scope.addProduto = function () {
        const novoProduto = {
            nomeProduto: $scope.nomeProduto,
            preco: $scope.preco,
            categoria: $scope.categoria,
            stock: $scope.stock,
            descricao: $scope.descricao
        };

        $http.post("/api/produtos", novoProduto, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                $scope.produtos.push(response.data);
                $scope.nomeProduto = $scope.preco = $scope.categoria = $scope.stock = $scope.descricao = "";
            })
            .catch((error) => {
                console.error("Erro ao adicionar produto:", error);
            });
    };

    // Deletar produto (Apenas admin)
    $scope.deleteProduto = function (id) {
        $http.delete(`/api/produtos/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                $scope.produtos = $scope.produtos.filter((produto) => produto._id !== id);
            })
            .catch((error) => {
                console.error("Erro ao deletar produto:", error);
            });
    };

    // Carregar produtos ao inicializar
    $scope.getProdutos();
});
