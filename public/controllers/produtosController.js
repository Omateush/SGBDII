const jwt = require("jsonwebtoken");

// Middleware para verificar o token JWT
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, "chave_secreta"); // Substitua por sua chave secreta
        req.user = decoded; // Anexa os dados do usuário à solicitação
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token inválido" });
    }
}



app.controller("produtosController", function ($scope, $http) {
    $scope.produtos = [];

    // Buscar todos os produtos da API
    $scope.getProdutos = function () {
        $http.get("/api/produtos")
            .then(function (response) {
                $scope.produtos = response.data; // Atualizar a lista de produtos
            })
            .catch(function (error) {
                console.error("Erro ao buscar produtos:", error);
            });
    };

    // Chamar a função ao carregar a página
    $scope.getProdutos();

    // Função para adicionar um produto
    $scope.addProduto = function () {
        const novoProduto = {
            nomeProduto: $scope.nomeProduto,
            preco: $scope.preco,
            categoria: $scope.categoria,
            stock: $scope.stock,
            descricao: $scope.descricao
        };

        $http.post("/api/produtos", novoProduto)
            .then(function (response) {
                $scope.produtos.push(response.data); // Adicionar o produto criado à lista
                $scope.nomeProduto = $scope.preco = $scope.categoria = $scope.stock = $scope.descricao = ""; // Limpar os campos
            })
            .catch(function (error) {
                console.error("Erro ao adicionar produto:", error);
            });
    };

    // Função para deletar um produto
    $scope.deleteProduto = function (id) {
        $http.delete("/api/produtos/" + id)
            .then(function () {
                $scope.produtos = $scope.produtos.filter(p => p._id !== id); // Remover da lista local
            })
            .catch(function (error) {
                console.error("Erro ao deletar produto:", error);
            });
    };
});
