const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = Router();
const BD = require('../config/db');

//READ
router.get('/getusuarios', async (req, res) => {
    sql = "select * from usuario";

    let result = await BD.Open(sql, [], false);
    //console.log(result);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "idusuario": user[0],
            "tipo": user[1],
            "confirmacion": user[2],
            "nombre": user[3],
            "apellido": user[4],
            "correo": user[5],
            "pais": user[6],
            "foto": user[7]

        }

        Users.push(userSchema);
    })

    res.json(Users);
})


router.post('/auth', async (req, res) => {
    const { correo, pass } = req.body;
    sql = "select * from usuario where correo = :correo and pass = :pass";
    let result = await BD.Open(sql, [correo, pass], false);
    Users = [];
    result.rows.map(user => {
        let userSchema = {
            "idusuario": user[0],
            "tipo": user[1],
            "confirmacion": user[2],
            "nombre": user[3],
            "apellido": user[4],
            "correo": user[5],
            "pass":user[6],
            "pais": user[7],
            "foto": user[8]
        }

        Users.push(userSchema);
    })
    res.json(Users);
})

router.post('/recuperar', async (req, res) => {
    const { correo } = req.body;
    sql = "select * from usuario where correo = :correo ";
    let result = await BD.Open(sql, [correo], false);
    Users = [];
    result.rows.map(user => {
        let userSchema = {
            "idusuario": user[0],
            "tipo": user[1],
            "confirmacion": user[2],
            "nombre": user[3],
            "apellido": user[4],
            "correo": user[5],
            "pais": user[6],
            "foto": user[7]
        }

        Users.push(userSchema);
    })
    res.json(Users);
})


router.get('/getusuario/:idusuario', async (req, res) => {
    const { idusuario } = req.params;
    sql = "select * from usuario where idusuario =:idusuario";

    let result = await BD.Open(sql, [idusuario], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "idusuario": user[0],
            "tipo": user[1],
            "confirmacion": user[2],
            "nombre": user[3],
            "apellido": user[4],
            "correo": user[5],
            "pass": user[6],
            "pais": user[7],
            "foto": user[8]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})
//CREATE

router.post('/agregarusuario', async (req, res) => {
    const { nombre, apellido, correo, pass, pais,foto } = req.body;
    sql = "insert into usuario(nombre,apellido,correo,pass,pais,foto) values(:nombre,:apellido,:correo,:pass,:pais,:foto)";

    await BD.Open(sql, [nombre, apellido, correo, pass, pais,foto], true);

    res.status(200).json({
        "nombre": nombre,
        "apellido": apellido,
        "correo": correo,
        "pass": pass,
        "pais": pais,
        "foto": foto
    })
})

//UPDATE
router.put("/actualizarusuario", async (req, res) => {
    const { nombre, apellido, correo, pass, pais, foto,idusuario } = req.body;

    sql = "update usuario set nombre=:nombre, apellido=:apellido, correo=:correo, pass=:pass, pais=:pais, foto=:foto where idusuario=:idusuario";
    await BD.Open(sql, [nombre, apellido, correo, pass, pais,foto, idusuario], true);

    res.status(200).json({
        "idusuario": idusuario,
        "nombre": nombre,
        "apellido": apellido,
        "correo": correo,
        "pass": pass,
        "pais": pais,
        "foto": foto
    })

})

//UPDATE
router.put("/confirmarusuario", async (req, res) => {
    const { idusuario } = req.body;

    sql = "update usuario set confirmacion='si' where idusuario=:idusuario";
    await BD.Open(sql, [ idusuario], true);

    res.status(200).json({
        "idusuario": idusuario
    })

})

router.put("/passusuario", async (req, res) => {
    const { pass, idusuario } = req.body;

    sql = "update usuario set pass=:pass where idusuario=:idusuario";
    await BD.Open(sql, [pass, idusuario], true);

    res.status(200).json({
        "pass": pass,
        "idusuario": idusuario
    })

})


//DELETE
router.delete("/eliminarusuario/:idusuario", async (req, res) => {
    const { idusuario } = req.params;

    sql = "delete from usuario where idusuario=:idusuario";

    await BD.Open(sql, [idusuario], true);

    res.json({ "msg": "Usuario Eliminado" })
})

// Subir imagen

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });
router.post('/foto', upload.single('photo'), function (req, res) {
    res.end("File uploaded.");
});

module.exports = router;