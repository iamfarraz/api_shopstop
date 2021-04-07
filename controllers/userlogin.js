export const handlelogin=(req,res,db,bcrypt)=>{

const {mail,password}=req.body;

if(!mail || !password){
    return res.status(400).json("mail or password not inserted")
}

db.select('*')
.from('user')
.where('mail','=',mail)
.then(user=>{
  console.log(user[0])
  console.log(passwordgit gi)
  const isvalid=bcrypt.compareSync(password,user[0].password);

  console.log(isvalid)
  db.select('*').from('user')
            .where('mail','=',mail)
            .then(data=>{ 
               res.json(data[0])
                })



})



   


}