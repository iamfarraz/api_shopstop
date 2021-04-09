export const handlelogin=(req,res,db,bcrypt)=>{

const {mail,password}=req.body;

if(!mail || !password){
    return res.status(400).json("mail or password not inserted")
}
const sql=`SELECT * FROM user where mail='${mail}'`;

db.query(sql,  (err, user) =>{
  if (err) { throw err;}
    if(user.length>0){
      const isvalid=bcrypt.compareSync(password,user[0].password);
      if(isvalid){
       res.json(user[0])
      }
      else {
        res.status(400).json("wrong credential")
      }
    }
    else { res.json("no such user exist"); }
    
});

// res.json("no such user exist"); return;
 
  



 
   


}