// Requiero los modulos
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// Indico al servidor web en que puerto escuchar (Lo que sea que este en la variable o 3000 si no hay nada alli)  
const PORT = process.env.PORT || '8080';

const app = express();

app.set("port", PORT);

//Usar archivos estaticos
app.use(express.static(path.join(__dirname, "public")));
//Configurar motor de vistas de aplicaciones
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: true
}));

mongoose.connect('mongodb+srv://admin-nicolas:<password>@cluster0.bzep7.mongodb.net/formulario', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    edad: Number,
    seccion: String,
    horario: String,
    sucursal: [String],
    info: String
});

const ProximoEmpleado = mongoose.model('ProximoEmpleado', userSchema);

app.get("/", function (req, res) {
    res.render("pages/index");
});

app.post("/", function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const edad = req.body.edad;
    const seccion = req.body.seccion;
    const horario = req.body.horario;
    const sucursal = req.body.sucursal;
    const info = req.body.info;

    const proximoEmpleado = new ProximoEmpleado({
        name: name,
        email: email,
        edad: edad,
        seccion: seccion,
        horario: horario,
        sucursal: sucursal,
        info: info
    })
    proximoEmpleado.save();
    res.render("pages/success");
})


app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
})
