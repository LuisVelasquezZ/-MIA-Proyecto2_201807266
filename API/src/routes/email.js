const { Router } = require('express');
const email = require('emailjs');
const router = Router();


// the routes are defined here
router.post('/email', async (req, res) => {
    const cliente = new email.SMTPClient({
        user: "fervzacarias@gmail.com",
        password: "1906luisv",
        host: "smtp.gmail.com",
        ssl: true
    });
    cliente.send({
        text: req.body.texto,
        from: "fervzacarias@gmail.com",
        to: req.body.para,
        subject: "GT Sales"
    },
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'error' });
            } else {
                res.status(200).json(results);
            }
        });
});



module.exports = router;