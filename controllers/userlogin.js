export const handlelogin=(req,res,db,bcrypt)=>{

const {mail,password}=req.body;

if(!mail || !password){
    return res.status(400).json("mail or password not inserted")
}
const sql=`SELECT * FROM user where mail='${mail}'`;

db.query(sql,  (err, user) =>{
  if (err) {res.json(err)}
  else {
    const isvalid=bcrypt.compareSync(password,user[0].password);
      if(isvalid){
       res.json("sucess")
      }
      else {
        res.json("failed")
      }
    
  }
 
});


 
  






   


}