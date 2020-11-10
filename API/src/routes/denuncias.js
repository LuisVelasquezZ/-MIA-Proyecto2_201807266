const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = Router();
const BD = require('../config/db');

//READ
router.get('/getDenuncias', async (req, res) => {
    sql = "select * from denuncia where estado = 'revisar";

    let result = await BD.Open(sql, [], false);

    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "iddenuncia": prod[0],
            "contenido": prod[1],
            "estado": prod[2],
            "idusuario": prod[3],
            "idproducto": prod[4],
            "fecha": prod[5]            
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})

//CREATE

router.post('/agregarDenuncia', async (req, res) => {
    const { contenido,idusuario, idproducto} = req.body;
    sql = "insert into denuncia(contenido,idusuario,idproducto)\
     values(:contenido,:idusuario,:idproducto)";

    await BD.Open(sql, [ contenido,idusuario,idproducto], true);

    res.status(200).json({
            "contenido":contenido,
            "idusuario": idusuario,
            "idproducto": idproducto
        })
})

router.put("/editardenuncia", async (req, res) => {
    const { iddenuncia } = req.body;

    sql = "update denuncia set estado='revisada' where iddenuncia=:iddenuncia";
    await BD.Open(sql, [iddenuncia], true);

    res.status(200).json({
        "iddenuncia": iddenuncia
    })

})

module.exports = router;