//importar a dependência do SQLite3

const sqLite3 = require("sqlite3").verbose()

//criar o objeto de banco de dados que irá fazer operações dentro do banco

const db = new sqLite3.Database("./src/database/database.db") 

module.exports = db;

//rodando o comando node src/database/db.js ele já cria o arquivo
// utilizar o objeto de banco de dados para nossas funções

// db.serialize(() => {
//     // criar uma tabela com comandos SQL (a crase dá uma quebra de linha no código sem quebrar a aplicação)
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             cep INTEGER,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );

//     `)

//     // inserir dados
//     const query = `INSERT INTO places(
//         name,
//         image,
//         cep,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES(?,?,?,?,?,?,?,?);` 
//     // as interrogações em VALUES reservam um espaço de forma dinâmica que pode ser alterado mais tarde
//     // para não poluir o código futuramente, colocou-se a função insert numa variável

//     const values = [
//         "PaperSider",
//         "https://images.pexels.com/photos/1555199/pexels-photo-1555199.jpeg",
//         89160188,
//         "Guilherme Gembalia, Jardim América",
//         "nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e papelão"
//     ];

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query,values, afterInsertData);

//     // //consultar dados no db
//     // db.all(`SELECT * FROM places`, function (err,rows){
//     //     if(err){
//     //         return console.log(err)
//     //     }

//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })

//         // db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
//         //     if(err){
//         //         return console.log(err)
//         //     }
    
//         //     console.log("Registro deletado com sucesso")
//         // })

// })