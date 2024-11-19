import connection from './properties.js'

class Crud
{

    inserirUsuario(aluno, callback)
    {
        let sql =  "insert into usuarios set ?"

        connection.query(sql, aluno, function(error,results,fields)
        {
            if(error) throw error;

            callback(`Aluno ${aluno.email} cadastrado com sucesso`);
        });
    }

    inserirNota(nota, callback)
    {
        let sql =  "insert into notas set ?"

        connection.query(sql, nota, function(error,results,fields)
        {
            if(error) throw error;

            callback(`Nota ${nota} cadastrada com sucesso`);
        });
    }

    //Pega todos os registros
    listarUsuarios(callback){
        let sql = "select * from usuarios"
        connection.query(sql, function(error,results,fields){
            if(error) throw error
            callback(results)
        })
            connection.end()
    }

    listarMaioresNotas(callback) {
      let sql = `
          SELECT n.nota, u.email
          FROM notas n
          JOIN usuarios u ON n.email_usuario = u.email
          ORDER BY n.nota DESC
          LIMIT 5
      `;

      connection.query(sql, function(error, results, fields) {
          if (error) throw error;

          callback(results);
      });
  }
}

export default Crud 

//module.exports = Crud