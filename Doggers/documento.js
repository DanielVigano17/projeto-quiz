import mysql from 'mysql2'

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"quiz"
})

connection.connect();


class CrudAluno
{

    inserirAluno(aluno, callback)
    {
        let sql =  "insert into alunos set ?"

        connection.query(sql, aluno, function(error,results,fields)
        {
            if(error) throw error;

            callback(`Aluno ${aluno.nome} cadastrado com sucesso`);
        });
    }

    //Pega todos os registros
    listarAlunos(callback){
        let sql = "select * from alunos"
        connection.query(sql, function(error,results,fields){
            if(error) throw error
            callback(results)
        })
            connection.end()
    }
}

export default CrudAluno;
