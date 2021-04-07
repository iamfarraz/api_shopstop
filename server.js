import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import knex from 'knex';
import cors from 'cors';
import { handlereg } from './controllers/userreg.js';
import { handlelogin } from './controllers/userlogin.js';
const app=express();

app.use(bodyParser.json());
app.use(cors());
const db=knex({
  client: 'mysql',
  connection: {
    host : 'us-cdbr-east-03.cleardb.com',
    user : 'b45501885fe09f',
    password : '15645a6c',
    database : 'heroku_b5557678aae1bf1'
  }
});


// get-> locality( locality and shop  )
// get -> available_product(available_at and product)
// get-> +/- (cart)
// get->order summary(cart)
// get-> +/- order_summary(cart)
// get-> buy(cart to order)

// get -> order (order)
// get-> account(user)

// post-> register(shop )
// post-> login (shop )
// get-> add( available_at and product)
// get-> myshop(available_at and prodct)
// get-> myacc(shop)

app.get('/', (req, res) => {
    res.send('qkdnois')
  });



// post-> userreg
app.post('/userreg',(req,res)=>handlereg(req,res,db,bcrypt));

// post-> login (user )
app.post('/userlogin',(req,res)=>handlelogin(req,res,db,bcrypt))

app.get('/check',(req,res)=>{
  db.select('*').from('user')
  .then(data=>res.json(data))

})

app.listen(3000,()=>{
  console.log("heyllo");
})