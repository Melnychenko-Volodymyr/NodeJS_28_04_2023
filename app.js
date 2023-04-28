const express = require('express');
const server = express();

server.set('view engine','ejs');
server.set('views', __dirname + '/views');

server.use(express.static(__dirname +  '/public'));

server.get('/', (req, res) => {
   res.render('page');
});

const prod = [
    { id: 1, type: 'laptop', vendor: 'Lenovo', model: 'V15 G2 ALC',  cpu: 'AMD Ryzen 5 5600H',   display: '15', memory: '16', ssd: '512'},
    { id: 2, type: 'laptop', vendor: 'Asus',   model: 'P1512CEA',    cpu: 'AMD Ryzen 5 5500U',   display: '14', memory: '8',  ssd: '512'},
    { id: 3, type: 'laptop', vendor: 'HP',     model: '255 G8 Dark', cpu: 'Intel Core i5-1235U', display: '15', memory: '8',  ssd: '256'},
    { id: 4, type: 'laptop', vendor: 'Lenovo', model: 'IdeaPad 3',   cpu: 'AMD Ryzen 5 5500U',   display: '15', memory: '8',  ssd: '256'},
    { id: 5, type: 'laptop', vendor: 'Acer',   model: 'Aspire 5',    cpu: 'AMD Ryzen 5 5625U',   display: '15', memory: '16', ssd: '512'},
    { id: 6, type: 'laptop', vendor: 'Lenovo', model: 'V14 G3 ABA',  cpu: 'Intel Core i5-1235U', display: '14', memory: '8',  ssd: '256'},

];


server.get('/prod', (req,res) => {
   product = prod.slice();		
   let q = req.query;
   
   if (q.vendor) { 
      product = product.filter(item => item.vendor === q.vendor);
   };

   if (q.cpu) { 
      product = product.filter(item => item.cpu.includes(q.cpu));
   };
   
   if (q.display) { 
      product = product.filter(item => item.display === q.display);
   };

   if (q.memory) { 
      product = product.filter(item => item.memory === q.memory);
   };

   if (q.ssd) { 
      product = product.filter(item => item.ssd === q.ssd);
   };


   res.send(product);	    

});

server.listen(3000);