const express = require('express');
const router = express.Router();

router.get('/users/signin',(req,res) => {
    res.render('users/signin');
});

router.get('/users/signup',(req,res) => {
    res.render('users/signup');
});

router.post('/users/signup',(req,res) =>{
    
    const { name, email, password, confirm_password } = req.body;
    const errors=[];
    console.log(req.body);
    if(name.length<= 0){
        errors.push({text: 'Por Favor inserte su nombre'});
    }
    if(password != confirm_password){
        errors.push({text: 'Las Contrasenas no coinciden'});
    }
    if (password.length <= 4){
        errors.push({text: 'La contrasena debe tener minimo 4 caracteres'});
    }
    if(errors.length > 0){
        res.render ('users/signup',{errors,name,email});
    }else{
        res.send('hola')
    }
})
module.exports= router;