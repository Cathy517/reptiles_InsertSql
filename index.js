const cheerio = require('cheerio'),
    common = require('./public/common'),
    xlsx = require('node-xlsx'),
    c = common.common;

let run = async () => {
    //读取excel的数据
    let obj = xlsx.parse('test.xlsx'),
        excelObj = obj[0].data;
        //console.log(excelObj);

    //将excel的数据解析成一个新的数组
    let data = [];
    excelObj.map(item => {
        let arr = {};
        arr.name = item[0];
        arr.img = item[1];
        arr.price = item[2];
        data.push(arr);
    });
    console.log(data);

    //插入数据库
    await c.saveExcelDataToDatabase(data);
    console.log("well done~~~");
}

run();