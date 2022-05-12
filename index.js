const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./Config/config'),
    validaUsuario = require('./Config/Conexion'),
    cors = require('cors');
    app = express();

// Indicamos la configuración de nuestra clave ultra secreta
app.set('key', config.key);

// activamos el CORS
app.use(cors());

// Seteamos la configuracion para convertir las peticiones del cliente a JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Desplegamos el servidor
app.listen(3001, () => {
    console.log('Servidor iniciado: http://localhost:3001')
});


// Definimos la ruta inicial '/' de tipo GET
app.get('/', (req, res) => {
    res.send('Servidor Node.js desplegando servicio de Auth con JWT...');
});


// Definimos la ruta de auth con jwt de tipo POST
app.post('/auth', (req, res) => {

    validaUsuario(req.body.usuario, req.body.clave, (rows) => {
        if (rows) {
            // Datos que aportaran valor al token, para este caso solo la propiedad "validado" y los datos del usuario autenticado
            const payload = {
                validado: true,
                usuario: rows.usuario,
                nombre: rows.nombre
            };

            // Creamos el token de seguridad
            const token = jwt.sign(payload, app.get('key'), {
                expiresIn: 1440 // tiempo de vida del token generado en milisegundo...
            });

            res.status(200).json({
                messaje: 'Login correcto',
                token
            });
        } else {
            res.status(401).json({
                messaje: 'Usuario o clave incorrectos!'
            });
        }
    });
});

