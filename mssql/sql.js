const sql = require('mssql/msnodesqlv8');

//select database config
const selectConfig = {
    server:'CIA-SH-11',
    database:'CIA_DW_DEV1',
    options: {
        trustedConnection:true //Use Windows Authentication (default: false).
    },
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

//insert and update database config
const update_InsertConfig={
    server:'CIA-SH-11',
    database:'CIA_DW_DEV1',
    options: {
        trustedConnection:true //Use Windows Authentication (default: false).
    },
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 30000
    }
}
class Mssql {
    constructor() {
    }
    //close
    sqlClose(){
        return new Promise((resolve,reject)=>{
            sql.close().then(()=>{
                console.log('close success');
            }).catch(err=>{
                console.log('close failed'+err);
                reject(err);
            })
        })
    }

    //插入到对应的数据库表中
    sqlExcelDataInsert(name,img,price){
        return new Promise((resolve,reject)=>{
            new sql.ConnectionPool(update_InsertConfig).connect().then((pool) => {
                return pool.query
                `insert into [dbo].[emily_test] (name,img,price) values (${name}, ${img}, ${price})`
            }).then(result => {
                //insert success
                sql.close()
                    .then(()=>{
                        console.log('close sql insert success');
                        resolve(result);
                    }).catch(err=>{
                        reject('close sql insert err:'+err);
                    })
                
            }).catch(err => {
                // insert faild
                reject('sql insert err:'+err);
            })
            sql.on('error', err => {
                // ... error handler
                reject('sql connect err:'+err);
            })
        })
    }

}
var sqlserver = new Mssql();
exports.sqlserver = sqlserver;