//import Crud from '../Crud'
import Crud from '../Crud.js'
import express from 'express'
import cookieParser from 'cookie-parser'
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import nunjucks from "nunjucks"

// Necessário para obter __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const router = express.Router()

//Instância da classe - funciona como prototype
const crud = new Crud()

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../../pages/public')))

   // Configurar o body-parser para dados JSON
    app.use(bodyParser.json());
    app.use(cookieParser()); // Adicione esta linha

    // Config da template engine.
    app.set("view engine", "njk")
    nunjucks.configure('views', {
        express: app,
        autoescape: false,
        noCache: true,
    });
    

    app.get("/", (request , response) => {
        return response.render("login");
    })

    app.post("/cadastro", (request , response) => {
        const {email, password} = request.body;

        const usuario = {
            email : email,
            senha : password
        }



        crud.inserirUsuario(usuario, function(result){
            console.log(result);
            response.clearCookie('usuarioEmail');
            response.cookie('usuarioEmail', email, { maxAge: 900000, httpOnly: true }); // 15 minutos
            response.redirect("/form");
        });
    })

    app.get('/form', (req, res) => {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'perguntas.json')));
        res.render('form.njk', { perguntas: data });
    });

    app.post('/submit', (req, res) => {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'perguntas.json')));
    let nota = 0;
    const totalPerguntas = Object.keys(data).length;

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const respostaCorreta = data[key].correta;
            const respostaUsuario = req.body[`q${key}`];

            if (respostaUsuario === respostaCorreta) {
                nota++;
            }
        }
    }

    const objetoNota = {
        email_usuario : req.cookies.usuarioEmail,
        nota : nota
    }

    crud.inserirNota(objetoNota, function(result){
        console.log(result);
    });

    const notaFinal = (nota / totalPerguntas) * 100; // Nota em porcentagem
    res.render('resultado', {
        nota: nota,
        totalPerguntas: totalPerguntas,
        notaFinal: notaFinal.toFixed(2) // Formata para duas casas decimais
    });
    
    });

    // Endpoint para listar as 5 maiores notas
app.get('/maiores-notas', (req, res) => {
    crud.listarMaioresNotas((notas) => {
        res.render('maiores-notas.njk', { notas });
    });
});

    let server = app.listen(3017, function(){
    let host = server.address().address
    let port = server.address().port
    console.log(`Servidor iniciado em ${host}:${port}`)
})






