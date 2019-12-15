const express = require('express');
const router = express.Router();

const Tarea = require('../models/Tarea');

router.get('/tareas/add', (red,res)=> {
    res.render('tareas/agregar-tarea');
});

router.post('/tareas/agregar-tarea', async (req,res)=>{
    const { title, description}=req.body;
    const errors=[];
    if(!title){
        errors.push({text: 'Por Favor coloque el Titulo'});
    }
    if(!description){
        errors.push({text: 'Por favor coloque la descripcion'});
    }
    if(errors.length>0){
        res.render('tareas/agregar-tarea',{
            errors,
            title,
            description
        });
    }else{
     const newTarea = new Tarea({title, description });
      await newTarea.save();
      req.flash('success_msg','Tarea Creada Satisfactoriamente!');
      res.redirect('/tareas');
    }
});

router.get('/tareas',async(req,res) => {
    const tareas = await Tarea.find().sort({date:'desc'});
    res.render('tareas/alltareas', {tareas})
});

router.get('/tareas/edit/:id',async(req,res)=> {
    const tarea = await Tarea.findById(req.params.id)
    res.render('tareas/edit-tarea',{tarea})
})

router.put('/tareas/edit-tarea/:id',async(req,res) =>{
const { title,description}= req.body;
await Tarea.findByIdAndUpdate(req.params.id, {title,description});
req.flash('success_msg','Nota modificada Satisfactoriamente');
res.redirect('/tareas');
});

router.delete('/tareas/delete/:id',async(req,res) =>{
await Tarea.findByIdAndDelete(req.params.id);
req.flash('success_msg', 'Nota borrada Satisfactoriamente')
res.redirect('/tareas');
})



module.exports= router;