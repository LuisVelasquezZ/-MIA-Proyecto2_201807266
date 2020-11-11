const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = Router();
const BD = require('../config/db');

//READ
router.get('/getrep1', async (req, res) => {
    sql = "select carrito.idproducto,count(*) as cant, producto.nombreproducto, usuario.nombre from carrito\
        inner join producto on carrito.idproducto = producto.idproducto\
        inner join usuario on producto.idusuario = usuario.idusuario \
        group by carrito.idproducto, nombreproducto, nombre \
        order by cant desc FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);

    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "idproducto": prod[0],
            "cant": prod[1],
            "nombreproducto": prod[2],
            "nombre": prod[3]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})


router.get('/getrep4a', async (req, res) => {
    sql = "select nombre,correo, creditos from usuario order by creditos desc FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);

    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "nombre": prod[0],
            "correo": prod[1],
            "creditos": prod[2]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})

router.get('/getrep4b', async (req, res) => {
    sql = "select nombre,correo, creditos from usuario order by creditos asc FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);

    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "nombre": prod[0],
            "correo": prod[1],
            "creditos": prod[2]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})


router.get('/getrep5', async (req, res) => {
    sql = "select usuario.idusuario, usuario.nombre, usuario.correo, count(*) as cant\
    from denuncia inner join usuario on denuncia.idusuario = usuario.idusuario\
    group by usuario.idusuario, usuario.nombre,usuario.correo order by cant desc\
    FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);

    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "idusuario":prod[0],
            "nombre": prod[1],
            "correo": prod[2],
            "cant": prod[3]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})


router.get('/getrep6', async (req, res) => {
    sql = "select usuario.idusuario, usuario.nombre, usuario.correo, count(*) as cant\
    from producto inner join usuario on producto.idusuario = usuario.idusuario\
    group by usuario.idusuario, usuario.nombre,usuario.correo order by cant desc\
    FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);

    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "idusuario":prod[0],
            "nombre": prod[1],
            "correo": prod[2],
            "cant": prod[3]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})


router.get('/getrep7', async (req, res) => {
    sql = "select  q1.pais, q1.cred, q1.us, q2.cant from\
    (select pais, sum(creditos) as cred, count(idusuario) as us from usuario group by pais) q1 \
    left join\
    (select pais, count(*) as cant from producto\
    inner join usuario on producto.idusuario = usuario.idusuario\
    group by pais) q2 \
    on q1.pais = q2.pais FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);

    //console.log(result);
    Prods = [];

    result.rows.map(prod => {
        let prodSchema = {
            "pais":prod[0],
            "creditos": prod[1],
            "usuarios": prod[2],
            "productos": prod[3]
        }

        Prods.push(prodSchema);
    })

    res.json(Prods);
})


module.exports = router;