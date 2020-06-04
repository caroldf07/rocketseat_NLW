//Esse arquivo serve para criarmos o servidor, ele deve ser mapeado no package.json.
//Primeiramente, refatoramos o projeto, depois criamos esse arquivo server.js
//Iniciamos o npm init
//Arrumamos o package.json > "main": "src/index.js",
//Adicionamos o Express

const express = require("express");
const server = express();



// configura pasta pública para que o html acesse o styles, scripts e assets. Porém, sem um complemento para o JS, o html não roda as funções
server.use(express.static("public"));

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
    res.render("create-point.html") // como resposta ele vai mandar um arquivo que está na pasta no caminho especificado
})

server.get("/search",(req,res) => {
    res.render("results.html") // como resposta ele vai mandar um arquivo que está na pasta no caminho especificado
})

//Ligando o servidor
server.listen(3000)