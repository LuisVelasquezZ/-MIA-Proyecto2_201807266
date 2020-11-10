const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = Router();
const BD = require('../config/db');

//READ
router.get('/getCarrito/:idusuario', async (req, res) => {
    const {idusuario} = req.params;
    sql = "select carrito.idproducto, producto.nombreproducto, producto.precio, producto.idusuario, categoria.nombrecategoria,producto.fotoproducto \
    from carrito inner join producto on carrito.idproducto = producto.idproducto \
    inner join categoria on producto.idcategoria = categoria.idcategoria\
     where carrito.idusuario = :idusuario and carrito.estado = 'espera'";

    let result = await BD.Open(sql, [idusuario], false);
    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "idproducto": prod[0],
            "nombreproducto": prod[1],
            "precio": prod[2],
            "idusuario": prod[3],
            "nombrecategoria": prod[4],
            "fotoproducto": prod[5]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})

router.get('/getCarritototal/:idusuario', async (req, res) => {
    const {idusuario} = req.params;
    sql = "select  sum(producto.precio) as total \
    from carrito inner join producto on carrito.idproducto = producto.idproducto \
     where carrito.idusuario = :idusuario and carrito.estado = 'espera'";

    let result = await BD.Open(sql, [idusuario], false);
    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "total": prod[0]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})


//CREATE

router.post('/agregarcarrito', async (req, res) => {
    const { idusuario, idproducto} = req.body;
    sql = "insert into carrito(idusuario,idproducto)\
     values(:idusuario,:idproducto)";

    await BD.Open(sql, [ idusuario,idproducto], true);

    res.status(200).json({
            "idusuario": idusuario,
            "idproducto": idproducto
        })
})

//UPDATE
router.put("/confirmarcarrito", async (req, res) => {
    const { idusuario } = req.body;

    sql = "update carrito set estado='confirmado' where idusuario=:idusuario";
    await BD.Open(sql, [idusuario], true);

    res.status(200).json({
        "idusuario": idusuario
    })

})


//DELETE
router.delete("/limpiarcarrito/:idusuario", async (req, res) => {
    const { idusuario } = req.params;

    sql = "delete from carrito where idusuario=:idusuario and estado ='espera'";

    await BD.Open(sql, [idusuario], true);

    res.json({ "msg": "Usuario Eliminado" })
})



module.exports = router;