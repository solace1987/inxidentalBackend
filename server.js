const express=require('express');
const app=express();
const bodyPaser=require('body-parser');
const cors=require('cors');
const PORT=4000;
const incidentRoutes= express.Router();
const mongoose=require ('mongoose');
let incidents= require('./inxidental.model')

app.use(cors());
app.use(bodyPaser.json());
mongoose.connect('mongodb+srv://sholaAdmin:Ashanti1987@inxidental-fo30v.mongodb.net/inxidental_db',{useNewUrlParser:true});
const connection=mongoose.connection;
connection.once('open',()=>console.log('MondoDb connection established successfully'))

incidentRoutes.route('/').get(function (req,res){
     incidents.find(function (err,incident){
    if(err){
        console.log(err);
    } else {
       res.json(incident)
    }

})});

incidentRoutes.route('/:id').get((req,res)=>{
    let id=req.params.id;
    incidents.findById(id,(err,incident)=> res.json(incident));
})
incidentRoutes.route('/add').post((req,res)=>{
    let incident=new incidents(req.body);
    incident.save()
        .then(incident=>{
            res.status(200).json({incident:'incident added sucessfully'})
        }) 
        .catch(err=>{
            res.status(400).send('adding new Incident failed')
        })

});
incidentRoutes.route('/update/:id').post(function(req,res){

    incidents.findById(req.params.id, function(err,incident){
        if(!incident)res.status(404).send('data is not found')
    else
    incident.date=req.body.date;
    incident.user=req.body.user;
    incident.dept=req.body.dept;
    incident.priority=req.body.priority 
    incident.descri=req.body.descri;
    incident.reso=req.body.reso;
    incident.status=req.body.status;
    incident.save().then(incident=>{
        res.json('Incident Updated')

    })
    
    })
        .catch(err=>{
            res.status(400).send('Update notpossible')
        })
})
app.use('/incidents', incidentRoutes)
app.listen(PORT, ()=>{
    return console.log(`server is runing on port: ${PORT}`)
});


