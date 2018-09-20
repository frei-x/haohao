const express = require('express');
const mysql = require('mysql');
var db = mysql.createConnection({host:'localhost',port:'3306',user:'root',password:'***',database:'***'});
var exp = express();
//
exp.post('/node/city',function(req,res){       
        let str = '';
        function select(Sdata){       
                const re  =/[*>()\+%&^@!=+_-\`\"!]|[0-9]|[a-z]|\s+/ig;
               let re_str=Sdata.replace(re,'');
               if(re_str!=''){//如果是空的 mysql也会 因为%%把所有东西查出来.  //limit 0,10 查询十条
                var xy = db.query("select province,city,county,x,y from city where county like ? or city like ? or province like ?  LIMIT 0,10",[`${'%'+re_str+'%'}`,`${'%'+re_str+'%'}`,`${'%'+re_str+'%'}`],(err,data)=>{
                        if(err){
                                res.send("mysql查询错误");      
                                console.log(err.code);
                        }else{
                                if(data==''){
                                        res.send("请输入正确名字哦");    
                                }
                                else{
                                        let strdata =JSON.stringify(data);
                                        console.log(strdata);
                                        res.send(strdata);
                                }
                              
                        }
                });
        }
        else{
                res.send("想找哪个城市呢?");
        }
}
       

        
         req.on('data',function(data){
                str+=data;
                
         });
         req.on('end',function(){                       
                 console.log(str);    
                 select(str);       
         });
        
});
exp.listen(8020);

 