import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
const app=express();

app.use(bodyParser.json());
 
const db=mysql.createConnection({
  host:"us-cdbr-east-03.cleardb.com",
  user:"b45501885fe09f",
  password:"15645a6c",
  database:"heroku_b5557678aae1bf1"
})
 
db.connect((err)=>{
  if(err)throw err;
  console.log("db connected");
})

// post-> login (user )
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


  // post-> register(user )
app.post('/user',(req,res)=>{
 
  const {username,userid}=req.body;
  res.json(userid);
  console.log("lol");
});

app.listen(3000,()=>{
  console.log("heyllo");
})