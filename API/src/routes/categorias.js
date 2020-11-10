const { Router } = require('express');

const router = Router();
const BD = require('../config/db');

//READ
router.get('/getcategorias', async (req, res) => {
    sql = "select * from categoria";

    let result = await BD.Open(sql, [], false);
    //console.log(result);
    Categorias = [];

    result.rows.map(categoria => {
        let catSchema = {
            "idcategoria": categoria[0],
            "nombrecategoria": categoria[1]
        }

        Categorias.push(catSchema);
    })

    res.json(Categorias);
})




router.get('/getcategoria/:idcategoria', async (req, res) => {
    const { idcategoria } = req.params;
    sql = "select * from categoria where idcategoria =:idcategoria";

    let result = await BD.Open(sql, [idcategoria], false);
    Categorias = [];

    result.rows.map(categoria => {
        let catSchema = {
            "idcategoria": categoria[0],
            "nombrecategoria": categoria[1]
        }

        Users.push(catSchema);
    })

    res.json(Categorias);
})

//CREATE

router.post('/agregarcategoria', async (req, res) => {
    const { nombrecategoria } = req.body;
    sql = "insert into categoria(nombrecategoria) values(:nombrecategoria)";

    await BD.Open(sql, [nombrecategoria], true);

    res.status(200).json({
        "nombrecategoria": nombrecategoria
    })
})


module.exports = router;