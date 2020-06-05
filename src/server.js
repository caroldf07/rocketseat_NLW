//Esse arquivo serve para criarmos o servidor, ele deve ser mapeado no package.json.
//Primeiramente, refatoramos o projeto, depois criamos esse arquivo server.js
//Iniciamos o npm init
//Arrumamos o package.json > "main": "src/index.js",
//Adicionamos o Express

const express = require("express");
const server = express();

// ligando o banco de dados
const db = require("./database/db")

// configura pasta pública para que o html acesse o styles, scripts e assets. Porém, sem um complemento para o JS, o html não roda as funções
server.use(express.static("public"));

// configurar a utilização do req.body
server.use(express.urlencoded({ extended : true }));

// para "corrigir " o problema acima, utilizamos o nunjucks (que é uma template engine) para que as funções ocorram no HTML
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server, // colocamos o nome do servidor que estamos usando
    noCache: true

})


// configurando caminhos no servidor
server.get("/",(req,res) => {
    res.render("index.html") // como resposta ele vai mandar um arquivo que está na pasta no caminho especificado. Com o nunjucks, ele já sabe que terá que acessar a pasta views
});

server.get("/create-point",(req,res) => {
    // req.query o método query puxa as query strings informações da URL (como por exemplo, as que são submetidas num form)
    
    res.render("create-point.html") // como resposta ele vai mandar um arquivo que está na pasta no caminho especificado
})

server.post("/savepoint",(req,res) => {

    //req.body esse método puxa as informações do corpo da página 
    // console.log(req.body)


    // inserir dados
    const query = `INSERT INTO places(
        name,
        image,
        cep,
        address,
        address2,
        state,
        city,
        items
    ) VALUES(?,?,?,?,?,?,?,?);` 
    // as interrogações em VALUES reservam um espaço de forma dinâmica que pode ser alterado mais tarde
    // para não poluir o código futuramente, colocou-se a função insert numa variável

    // registrando os dados de forma dinâmica após a submissão do form
    const values = [
        req.body.name,
        req.body.image,
        req.body.cep,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.send("create-point.html", { saved : true }) // vai acontecer somente depois que o registro for finalizado
    }

    db.run(query,values, afterInsertData);

    
});

server.get("/search",(req,res) => {
    const search = req.query.search; // caso no navegador a pesquisa retorne fazia, execute essa função

    if(search == ""){
        res.render("results.html", { total: 0 })
    }
        // consultando o banco de dados quando entrar nessa rota e mostrar o resultado da busca
        db.all(`SELECT * FROM places WHERE city LIKE '%${ search }%'`, function (err,rows){ //utilizamos LIKE para que fique menos sensitive case e o % serve para indicar que a palavra pode ter qualquer coisa antes e/ou depois
            if(err){
                return console.log(err)
            }

            const totalPlaces = rows.length; // calcula a quantidade de Entidades cadastrados no BD

            //mostrar a página html com os resultados
            res.render("results.html", { places: rows, total:totalPlaces }) // como resposta ele vai mandar um arquivo que está na pasta no caminho especificado
        })

})

//Ligando o servidor
server.listen(3000)