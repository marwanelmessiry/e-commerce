const mongose = require('mongoose')

const dbConnection = () => {
    mongose.connect(process.env.DB_URI).then((conn) => {
        console.log(`Database Connected : ${conn.connection.host}`);
    })
    // .catch((err) => {
    //     console.error(`database error : ${err}`);
    //     process.exit(1);
    // })
}
module.exports = dbConnection