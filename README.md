# adopets
API criada para a realização do teste de conhecimento da ADOPETS.

Este projeto foi criado utilizando NODEJS e MySQL.

Abaixo segue a descrição e forma de uso dos serviços criados nesta API.

http://<SERVER>:3000/ -> acessa informações básicas do projeto e a versão.

http://<SERVER>:3000/user/login -> acessa a parte do login, tendo que ser enviada uma requisição do tipo POST juntamente com os dados no formato JSON => {email: "seu email", password: "sua senha"}.

http://<SERVER>:3000/user/logoff -> realiza o logout no sistema apagando o token de autenticação, é realizada uma requisição do tipo GET.

http://<SERVER>:3000/user/ -> realiza o cadastro de um novo usuario, sendo necessaria uma requisição do tipo POST juntamente com o JSON com os dados do novo usuário no formato: 
    {
        "name": "Nome do usuário",
        "email": "Email do usuário",
        "password": "Senha do usuário"
    }



