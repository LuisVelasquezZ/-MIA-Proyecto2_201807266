const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = Router();
const BD = require('../config/db');

//READ
router.get('/getComentarios/:idproducto', async (req, res) => {
    const {idproducto} = req.params;
    sql = "select usuario.correo, fecha, contenido \
    from comentario inner join usuario on comentario.idusuario = usuario.idusuario \
     where idproducto = :idproducto";

    let result = await BD.Open(sql, [idproducto], false);

    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "correo": prod[0],
            "fecha": prod[1],
            "contenido": prod[2]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})

//CREATE

router.post('/agregarComentario', async (req, res) => {
    const { contenido,idusuario, idproducto} = req.body;
    sql = "insert into comentario(contenido,idusuario,idproducto)\
     values(:contenido,:idusuario,:idproducto)";

    await BD.Open(sql, [ contenido,idusuario,idproducto], true);

    res.status(200).json({
            "contenido":contenido,
            "idusuario": idusuario,
            "idproducto": idproducto
        })
})



module.exports = router;