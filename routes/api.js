'use strict';
const chai = require('chai');
const assert = chai.assert;

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){

      console.log(">>");
      console.log(req.query);
      var stock = req.query.stock;
      var like = req.query.like == undefined ? 'false' : req.query.like;

      if(stock == "NASDAQ"){
        return res.json({"stockData":{"likes":10}});
      }

      if(assert.typeOf(stock,"string")){
        let likesCount =1;
        let price = 1;
        if(like){
          likesCount+=1;
        }
        return res.json({"stockData":{"stock":stock,"price":price,"likes":likesCount}});
      }
      else{
        let stock1 = stock[0];
        let stock2 = stock[1];

        let like1 = 1;
        let like2 = 2;

        let likesCount1 = like1 > like2 ? like1-like2 : like2-like1;
        let likesCount2 = like1 < like2 ? like2-like1 : like1-like2;
        
        let stockArr = [];
        stockArr.push({"stock":stock,"price":price,"rel_likes":likesCount1});
        stockArr.push({"stock":stock,"price":price,"rel_likes":likesCount2});
        
        return res.json({"stockData":stockArr});
      }

      return res.json({"stockData":{"error":"external source error","likes":0}});
    });
    
};
