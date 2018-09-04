

const connection = require('../config/dbconnection')

let userModel = {};

userModel.getStores = (callback) => {
    if (connection) {//Devuelve con callback con error o filas
        connection.query(
            'SELECT * FROM stores ORDER BY id', 
            (err, rows) => {
                if (err) {
                    callback(null, err);
                } else {//Envía null como error y las filas
                    callback(null, rows);
                }
            }
        )
    }
};

userModel.getArticles = (callback) => {
    if (connection) {//Devuelve con callback con error o filas
        connection.query(
            'SELECT * FROM articles ORDER BY id', 
            (err, rows) => {
                if (err) {
                    callback(null, err);
                } else {//Envía null como error y las filas
                    callback(null, rows)
                }
            }
        )
    }
};

userModel.getArticlesOfStore = (id, callback) => {//userData es datos a ingresar
    
    if (connection) {
        let sql = `
            SELECT * FROM articles INNER JOIN stores ON articles.store_name = stores.name
            WHERE stores.id = ${connection.escape(id)} 
        `;
        
        connection.query(sql, (err, row) => { 
                if (err){ 
                    callback(null, err);
                } else {  
                    if (row.length > 0) { 
                        callback(null, {//Envía null como error y el resultado de la transacción en la bd
                            "msg": "found",
                            "row": row
                        })
                    } else { console.log(sql); 
                        callback(null, {//Envía null como error y el resultado de la transacción en la bd
                            "msg": "not exists"
                        });
                    }
                }
            }
        )
    }
}

module.exports = userModel;