const sql = require('../mssql/sql');

class Common {
    constructor() {}

    //insert
    ExcelDataInsert(name,img,price) {
        return new Promise((resolve, reject) => {
            sql.sqlserver.sqlExcelDataInsert(name,img,price)
                .then(data => { 
                    sql.sqlserver.sqlClose(); //close server                   
                    resolve('insert success');
                }).catch(err => {
                    reject('insert err ' + err);
                })
        })
    }


    //save speakers test to database
    async saveExcelDataToDatabase(arr){
        for (let i=0;i<arr.length;i++){
            let name = arr[i].name,
                img = arr[i].img,
                price = arr[i].price;
            
            await this.ExcelDataInsert(name,img,price)
                .then(data => {
                    console.log(data);
                }).catch(err => {
                    console.log('insert method err:' + err);
                })  
        }
    }

}
var common = new Common();
exports.common = common;