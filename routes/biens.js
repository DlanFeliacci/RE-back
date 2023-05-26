const app = require('../app');
const multer = require('multer');
const express = require('express');
const Biens = require('../schemas/biens');

const biensRouter = express.Router();
const storage = multer.diskStorage(
    {
        destination: './public/images/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);

const upload = multer({storage: storage});

biensRouter.post('/', upload.array('pictures'), async (req, res) => {
    //Handle mimetype 
    const filenames = req.files.map((file) => `/images/${file.filename}`);
    
    const newBien = new Biens({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        tel: req.body.tel,
        country: req.body.country,
        wilaya: req.body.wilaya,
        ville: req.body.ville,
        address: req.body.address,
        transaction: req.body.transaction,
        type: req.body.type,
        surface: req.body.surface,
        chambre: req.body.chambre,
        pictures: filenames,
        prix: req.body.prix,
        date: Date()
    });

    await newBien.save();
    res.status(201).send('Rahi frat');
});

biensRouter.get('/', async (req, res) => {
    const biens = await Biens.find().lean();
    res.status(200).send(biens);
});





biensRouter.use('/rent', (req, res) => {
    const rent = biens.filter((e) => {
        return e.type == 'location';
    });

    res.status(200).send(rent);
});

biensRouter.use('/buy', (req, res) => {
    const vente = biens.filter((e) => {
        return e.type == 'vente';
    });

    res.status(200).send(vente);
});

module.exports = biensRouter;
