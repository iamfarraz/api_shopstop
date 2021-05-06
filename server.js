import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { handlereg } from './controllers/userreg.js';
import { handlelogin } from './controllers/userlogin.js';
import { handleMyAcc } from "./controllers/user_account.js";
import { handleshoplogin} from './controllers/shoplogin.js';
import { handleshopreg} from './controllers/shopreg.js';
import { handleAddProduct } from './controllers/addProduct.js';
import { handleMyShopAcc } from "./controllers/shopaccount.js";
import { handleMyShop } from "./controllers/myshop.js";
import { handleLocality } from "./controllers/locality.js";
import {handleCart} from "./controllers/addCart.js";
import { handleRemoveProductCart } from './controllers/removeProductCart.js';
import {handleBuy} from './controllers/buy.js';

const app=express();

app.use(bodyParser.json());
app.use(cors());



const db = mysql.createPool({
  host : 'b5hwsqmnquboua15lqeb-mysql.services.clever-cloud.com',
  user : 'uksinxof2hbl29tl',
  password : '4xJCG3mNXGQmw7ISInws',
  database : 'b5hwsqmnquboua15lqeb'
  });
  
//  db.connect((err)=>{
//    if(err)throw err;
//      console.log("db connected");
//  });

 app.get('/',(req,res)=>{res.send("I am alive boiii")})


// get->order summary(cart)
// get-> +/- order_summary(cart)


// get -> order (order)

//post->addCart(adding to cart)
app.post('/addCart',(req,res)=>handleCart(req,res,db));
// post-> - product from (cart)
app.post('/removeProductCart',(req,res)=>handleRemoveProductCart(req,res,db));
// post-> buy(cart to order)
app.post('/buy',(req,res)=>handleBuy(req,res,db));

// post-> userreg
app.post('/userreg',(req,res)=>handlereg(req,res,db,bcrypt));

// post-> login (user )
app.post('/userlogin',(req,res)=>handlelogin(req,res,db,bcrypt))

// post ->shopreg
app.post('/shopreg',(req,res)=>handleshopreg(req,res,db,bcrypt));

// post ->shoplogin
app.post('/shoplogin',(req,res)=>handleshoplogin(req,res,db,bcrypt));


// get-> account(user)
// users personal info
app.post('/myaccount',(req,res)=>handleMyAcc(req,res,db))

// post-> add(available_at and product)
// to add product to a shop
app.post('/addProduct',(req,res)=>handleAddProduct(req,res,db))

// post-> myacc(shop)
// gives personal info of the shop
app.post('/myshopaccount',(req,res)=>handleMyShopAcc(req,res,db))

// post-> myshop(available_at and prodct)
// gives info about whats in my shop
app.post('/myshop',(req,res)=>handleMyShop(req,res,db))

// post-> locality( locality and shop )
// gives info about in this locality which shop are there
app.post('/locality',(req,res)=>handleLocality(req,res,db))

// post -> available_product(available_at and product)

app.get('/check',(req,res)=>{
  const sql="SELECT * FROM user";
  db.query(sql, function (err, result) {
    if(err)throw err;
      res.json(result);
  });

})

//shows all shops
app.get('/checkshop',(req,res)=>{
  const sql="SELECT * FROM shop";
  db.query(sql, function (err, result) {
    if(err)throw err;
      res.json(result);
  });
  // res.send("hemloo")

})

app.listen(process.env.PORT || 3001,()=>{
  console.log(`i am alivee at ${process.env.PORT}`)
})