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
const app=express();

app.use(bodyParser.json());
app.use(cors());


const db = mysql.createConnection({
  host : 'us-cdbr-east-03.cleardb.com',
  user : 'b45501885fe09f',
  password : '15645a6c',
  database : 'heroku_b5557678aae1bf1'
  });
  
 db.connect((err)=>{
   if(err)throw err;
     console.log("db connected");
 });


// get-> +/- (cart)
// get->order summary(cart)
// get-> +/- order_summary(cart)
// get-> buy(cart to order)

// get -> order (order)


// post-> register(shop )
// post-> login (shop )
// get-> add(available_at and product)
// get-> myshop(available_at and prodct)
// get-> myacc(shop)



// post-> userreg
app.post('/userreg',(req,res)=>handlereg(req,res,db,bcrypt));

// post-> login (user )
app.post('/userlogin',(req,res)=>handlelogin(req,res,db,bcrypt))

// post ->shopreg
app.post('/shopreg',(req,res)=>handleshopreg(req,res,db,bcrypt));

// post ->shoplogin
app.post('/shoplogin',(req,res)=>handleshoplogin(req,res,db,bcrypt));


// get-> account(user)
app.get('/myaccount',(req,res)=>handleMyAcc(req,res,db))

// get-> locality( locality and shop )

// get -> available_product(available_at and product)

app.get('/check',(req,res)=>{
  const sql="SELECT * FROM user";
  db.query(sql, function (err, result) {
      res.json(result);
  });

})

app.get('/checkshop',(req,res)=>{
  const sql="SELECT * FROM shop";
  db.query(sql, function (err, result) {
      res.json(result);
  });
  // res.send("hemloo")

})


app.listen(3000,()=>{
  console.log("heyllo");
})