//framework de Node
const express = require('express');

//
const basicAuth = require('express-basic-auth');

//Para definir rutas del servidor
const router = express.Router()


//Para funcionamiento de la app con otro dominio o puerto
const cors = require('cors');


const bodyParser = require('body-parser');
//import * as bodyParser from 'body-parser';

//Ruta inicial de servidor que ejecuta manejador de peticiones
router.get('/', (req, res) => {
    res.json([])
})

module.exports = router;

const User = require('../models/queries');

//Se exporta módulo app previamente definido en express como app
module.exports = function (app) {

    //Autenticación
    app.use(basicAuth({
        users: { 'my_user': 'my_password' },
        unauthorizedResponse: getUnauthorizedResponse
    }))

    function getUnauthorizedResponse(req) {
        return req.auth
            ? '{"success":false,"error_code": 401, "error_msg":"Not authorized"}'
            : 'Success';
    }

    app.get('/', (req, res) => {
        res.status(400).json({ success: false, error_code: 400, error_msg: "Bad Request" });
    })

    //Ruta de método obtener stores
    app.get('/services/stores', (req, res) => {
        //res.json([])        
        User.getStores((err, data) => {
            if (data.errno) {
                res.status(500).json({ success: false, error_code: 500, error_msg: "Server Error" });
            } else {
                res.status(200).json({ success: true, stores: data, total_elements: Object.keys(data).length });
            }
        })
    })

    //Ruta de método obtener articles
    app.get('/services/articles', (req, res) => {
        //res.json([])        
        User.getArticles((err, data) => {
            if (data.errno) {
                res.status(400).json({ success: false, error_code: 400, error_msg: "Bad Request" });
            } else {
                res.status(200).json({ success: true, articles: data, total_elements: Object.keys(data).length });
            }
        })
    })

    //Ruta de método obtener todos los artículos de una tienda específica
    app.get('/services/articles/stores/:id', (req, res) => {
        if (isNaN( req.params.id )) {
            res.status(400).json({ success: false, error_code: 400, error_msg: "Bad Request" });
            //res.status(404).json({ success: false, error_code: 400, error_msg: "Record Not Found" });
        } else {
            User.getArticlesOfStore(req.params.id, (err, data) => {
                if (data && data.msg === 'found') {
                    if (Object.keys(data).length === 1) {
                        res.status(200).json({ success: true, article: data.row, total_elements: Object.keys(data.row).length });
                    } else {
                        res.status(200).json({ success: true, articles: data.row, total_elements: Object.keys(data.row).length });
                    }                    
                } else { 
                    res.status(404).json({ success: false, error_code: 400, error_msg: "Record Not Found" });
                }
            })
        }
    })

}

