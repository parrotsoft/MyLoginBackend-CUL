const mysql = require('mysql');

// Definimos las variables de conexion
const connection = mysql.createConnection({
    host: 'localhost',
    port: 33306,
    user: 'root',
    password: 'root',
    database: 'cul'
});

// Nos conectamos a la DB
connection.connect((err) => {
    if (err) {
        console.error(err.code);
        console.error(err.fatal);
        console.error('Error al intentar conectarnos a MySQL');
    } else {
        console.log('MySQL Ok')
    }
});

function validaUsuario (usuario, clave, callback) {
    return connection.query(`SELECT usuario, nombre FROM usuarios u WHERE usuario = '${usuario}' AND clave = '${clave}';`, (err, rows) => {
        if (err) {
            console.error('Error al realizar la consulta');
            throw err;
        }
        return callback(rows.shift());
    });
}

module.exports = validaUsuario;

