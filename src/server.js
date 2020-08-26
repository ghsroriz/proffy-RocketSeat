const express = require('express');
const server = express();

const nunjucks = require('nunjucks');
//configurando nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

//recuperando funções
const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    successAdding
} = require("./pages");



server
    //configurar para recebimento pelo body
    .use(express.urlencoded({ extended: true }))
    //configurando arquivos estáticos
    .use(express.static("public"))
    //rotas
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    .listen(3333);
