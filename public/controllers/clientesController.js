app.controller("clientesController", function ($scope, $http) {
    $scope.clientes = [];
    $scope.novoCliente = {};

    // Obter todos os clientes
    $http.get("/api/clientes")
        .then(function (response) {
            $scope.clientes = response.data;
        })
        .catch(function (error) {
            console.error("Erro ao buscar clientes:", error);
        });

    // Criar cliente (já funcionando)
    $scope.adicionarCliente = function () {
        $http.post("/api/clientes", $scope.novoCliente)
            .then(function (response) {
                $scope.clientes.push(response.data);
                $scope.novoCliente = {};
            })
            .catch(function (error) {
                console.error("Erro ao adicionar cliente:", error);
            });
    };

    // Deletar cliente
    $scope.removerCliente = function (id) {
        if (confirm("Tem certeza que deseja deletar este cliente?")) {
            $http.delete("/api/clientes/" + id)
                .then(function () {
                    $scope.clientes = $scope.clientes.filter(cliente => cliente._id !== id);
                })
                .catch(function (error) {
                    console.error("Erro ao deletar cliente:", error);
                });
        }
    };
});