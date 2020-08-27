# adopets
API criada para a realização do teste de conhecimento da ADOPETS.

Este projeto foi criado utilizando NODEJS e MySQL.

Abaixo segue a descrição e forma de uso dos serviços criados nesta API.

http://SERVIDOR/ -> acessa informações básicas do projeto e a versão.

http://SERVIDOR/user/login -> acessa a parte do login, tendo que ser enviada uma requisição do tipo POST juntamente com os dados no formato JSON => {email: "seu email", password: "sua senha"}.

http://SERVIDOR/user/logoff -> realiza o logout no sistema apagando o token de autenticação, é realizada uma requisição do tipo GET.

http://SERVIDOR/user/ -> realiza o cadastro de um novo usuario, sendo necessaria uma requisição do tipo POST juntamente com o JSON com os dados do novo usuário no formato: 
    {
        "name": "Nome do usuário",
        "email": "Email do usuário",
        "password": "Senha do usuário"
    }

http://SERVIDOR/products/ -> lista todos os produtos cadastrados no banco de dados, necessita de uma requisição do tipo GET.

http://SERVIDOR/products/:page -> lista os produtos com paginação, o parametro :page é a pagina de resgitros a ser mostrada, por padrão serão mostrados 5 registros por página. Necessita de uma requisição do tipo GET. Exemplo: 
    http://SERVIDOR/products/2 -> serão mostrados os registros de 11 até 20.

http://SERVIDOR/products/name/:name -> lista os produtos baseados no parametro :name, necessita de uma requisição do tipo GET. O parametro name é o nome do produto a ser pesquisado conforme o exemplo abaixo:
    http://SERVIDOR/products/name/camisa -> serão retornados todos os produtos que tem "camisa" no nome.

http://SERVIDOR/products/name/:name/:page -> lista os produtos baseados no parametro :name com paginação, semelhante ao anterior com o acrescimo da paginação, o parametro :page é a pagina de resgitros a ser mostrada, por padrão serão mostrados 5 registros por página. Necessita de uma requisição do tipo GET. Exemplo: 
    http://SERVIDOR/products/name/camisa/2 -> serão mostrados os registros, que contem "camisa" no nome, de 6 até 10.

http://SERVIDOR/products/description/:description -> lista os produtos baseados no parametro :description, necessita de uma requisição do tipo GET. O parametro description é a descrição do produto a ser pesquisado conforme o exemplo abaixo:
    http://SERVIDOR/products/description/infantil -> serão retornados todos os produtos que tem "infantil" na descrição.

http://SERVIDOR/products/description/:description/:page -> lista os produtos baseados no parametro :description com paginação, semelhante ao anterior com o acrescimo da paginação, o parametro :page é a pagina de resgitros a ser mostrada, por padrão serão mostrados 5 registros por página. Necessita de uma requisição do tipo GET. Exemplo: 
    http://SERVIDOR/products/description/infantil/2 -> serão mostrados os registros, que contem "infantil" no nome, de 6 até 10.

http://SERVIDOR/products/category/:category -> lista os produtos baseados no parametro :category, necessita de uma requisição do tipo GET. O parametro category é a categoria do produto a ser pesquisado conforme o exemplo abaixo:
    http://SERVIDOR/products/category/acessorios -> serão retornados todos os produtos da categoria "acessorios".

http://SERVIDOR/products/category/:category/:page -> lista os produtos baseados no parametro :category com paginação, semelhante ao anterior com o acrescimo da paginação, o parametro :page é a pagina de resgitros a ser mostrada, por padrão serão mostrados 5 registros por página. Necessita de uma requisição do tipo GET. Exemplo: 
    http://SERVIDOR/products/category/acessorios/2 -> serão mostrados os registros, da categoria "acessorios", de 6 até 10.

http://SERVIDOR/products/ -> realiza o cadastro de um novo produto, sendo necessaria uma requisição do tipo POST juntamente com o JSON com os dados do novo produto no formato: 
    {
        "name": "Nome do Produto",
        "description": "Descrição do Produto",
        "category": "Categoria do Produto",
        "price": "Preço do Produto",
        "stock": "QTD do Produto em Estoque"
    }

http://SERVIDOR/products/:id -> realiza a atualização de um produto, o parametro :id é o id do produto a ser atualizado, sendo necessaria uma requisição do tipo PUT juntamente com o JSON com os dados do produto a ser atualizado no formato: 
    {
        "name": "Nome do Produto",
        "description": "Descrição do Produto",
        "category": "Categoria do Produto",
        "price": "Preço do Produto",
        "stock": "QTD do Produto em Estoque"
    }

http://SERVIDOR/products/:id -> realiza a exclusão de um produto, o parametro :id é o id do produto a ser excluído, sendo necessaria uma requisição do tipo PUT.

A API também tem um registro dos logs de Ação e de Erros de execução, estão localizados na pasta logs na raiz do projeto.




