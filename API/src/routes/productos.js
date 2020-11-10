const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = Router();
const BD = require('../config/db');

//READ
router.get('/getProductos/:idusuario', async (req, res) => {
    const {idusuario} = req.params;
    sql = "select idproducto, nombreproducto, detalle, palabras, precio, idusuario, nombrecategoria,fotoproducto \
    from producto inner join categoria on producto.idcategoria = categoria.idcategoria\
     where idusuario != :idusuario and estado = 'publicada'";

    let result = await BD.Open(sql, [idusuario], false);
    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "idproducto": prod[0],
            "nombreproducto": prod[1],
            "detalle": prod[2],
            "palabras": prod[3],
            "precio": prod[4],
            "idusuario": prod[5],
            "nombrecategoria": prod[6],
            "fotoproducto":prod[7]

        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})


router.get('/getProducto/:idproducto', async (req, res) => {
    const {idproducto} = req.params;
    sql = "select idproducto, nombreproducto, detalle, palabras, precio, idusuario, nombrecategoria,fotoproducto \
    from producto inner join categoria on producto.idcategoria = categoria.idcategoria\
     where  idproducto = :idproducto";

    let result = await BD.Open(sql, [idproducto], false);
    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "idproducto": prod[0],
            "nombreproducto": prod[1],
            "detalle": prod[2],
            "palabras": prod[3],
            "precio": prod[4],
            "idusuario": prod[5],
            "nombrecategoria": prod[6],
            "fotoproducto":prod[7]

        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})




router.post('/getProductoscat', async (req, res) => {
    const {idusuario, idcategoria} = req.body;
    sql = "select idproducto, nombreproducto, detalle, palabras, precio, idusuario, nombrecategoria,fotoproducto \
    from producto inner join categoria on producto.idcategoria = categoria.idcategoria\
     where idusuario != :idusuario and estado = 'publicada' and producto.idcategoria=:idcategoria";

    let result = await BD.Open(sql, [idusuario, idcategoria], false);
    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "idproducto": prod[0],
            "nombreproducto": prod[1],
            "detalle": prod[2],
            "palabras": prod[3],
            "precio": prod[4],
            "idusuario": prod[5],
            "nombrecategoria": prod[6],
            "fotoproducto":prod[7]

        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})

router.post('/getProductospre', async (req, res) => {
    const {idusuario, orden} = req.body;
    if(orden =="asc"){
        sql = "select idproducto, nombreproducto, detalle, palabras, precio, idusuario, nombrecategoria,fotoproducto \
    from producto inner join categoria on producto.idcategoria = categoria.idcategoria\
     where idusuario != :idusuario and estado = 'publicada' order by precio asc";
    } else {
        sql = "select idproducto, nombreproducto, detalle, palabras, precio, idusuario, nombrecategoria,fotoproducto \
    from producto inner join categoria on producto.idcategoria = categoria.idcategoria\
     where idusuario != :idusuario and estado = 'publicada' order by precio desc";
    }
    
    let result = await BD.Open(sql, [idusuario], false);
    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "idproducto": prod[0],
            "nombreproducto": prod[1],
            "detalle": prod[2],
            "palabras": prod[3],
            "precio": prod[4],
            "idusuario": prod[5],
            "nombrecategoria": prod[6],
            "fotoproducto":prod[7]

        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})

router.get('/getmisProductos/:idusuario', async (req, res) => {
    const {idusuario} = req.params;
    sql = "select idproducto, nombreproducto, detalle, palabras, precio, idusuario, nombrecategoria,estado,fotoproducto \
    from producto inner join categoria on producto.idcategoria = categoria.idcategoria\
     where idusuario = :idusuario ";

    let result = await BD.Open(sql, [idusuario], false);
    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "idproducto": prod[0],
            "nombreproducto": prod[1],
            "detalle": prod[2],
            "palabras": prod[3],
            "precio": prod[4],
            "idusuario": prod[5],
            "nombrecategoria": prod[6],
            "estado": prod[7],
            "fotoproducto":prod[8]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})


//CREATE

router.post('/agregarproducto', async (req, res) => {
    const { nombreproducto, detalle, palabras, precio, idusuario,idcategoria,fotoproducto } = req.body;
    sql = "insert into producto(nombreproducto,detalle,palabras,precio,idusuario,idcategoria, fotoproducto)\
     values(:nombreproducto,:detalle,:palabras,:precio,:idusuario,:idcategoria,:fotoproducto)";

    await BD.Open(sql, [nombreproducto, detalle, palabras, precio, idusuario,idcategoria,fotoproducto], true);

    res.status(200).json({
            "nombreproducto": nombreproducto,
            "detalle": detalle,
            "palabras": palabras,
            "precio": precio,
            "idusuario": idusuario,
            "fotoproducto":fotoproducto
        })
})

//UPDATE
router.put("/bloquearproducto", async (req, res) => {
    const { idproducto } = req.body;

    sql = "update producto set estado='bloqueada' where idproducto=:idproducto";
    await BD.Open(sql, [idproducto], true);

    res.status(200).json({
        "idproducto": idproducto
    })

})



module.exports = router;