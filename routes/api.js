var express = require('express');
var router = express.Router();
const models = require('../models')
const { Op } = require("sequelize");

/* GET home page. */
router.get('/phonebooks', async function (req, res, next) {
    const { page = 1, limit = 10, keyword = '', sort = 'asc' } = req.query
    try {
        if (Number.isInteger(Number(keyword))) {
            const { count, rows } = await models.Phonebooks.findAndCountAll({
                where: {
                    phone: {[Op.like]: `%${keyword}%`}
                }
            })
            const pages = Math.ceil(count / limit)
            res.status(200).json({ phonebooks: rows, page, limit, pages, total: count })
        } else {
            const { count, rows } = await models.Phonebooks.findAndCountAll({
                where: {
                    name: {[Op.iLike]: `%${keyword}%`}
                },
                order: [['name', sort]]
            })
            const pages = Math.ceil(count / limit)
            res.status(200).json({ phonebooks: rows, page, limit, pages, total: count })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.post('/phonebooks', async function (req, res, next) {
    try {
        const { name, phone, avatar } = req.body
        const phonebooks = await models.Phonebooks.create({ name, phone, avatar }, {
            returning: true,
            plain: true
        });
        res.status(201).json(phonebooks)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/phonebooks/:id', async function (req, res, next) {
    const { name, phone } = req.body;
    try {
        const phonebooks = await models.Phonebooks.update({ name, phone }, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(201).json(phonebooks[1])
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/phonebooks/:id', async function (req, res, next) {
    try {
        const phonebooks = await models.Phonebooks.findOne({ where: { id: req.params.id } });
        const deletephone = await models.Phonebooks.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true
        });
        if (deletephone) {
            console.log(phonebooks)
            res.status(200).json(phonebooks)
        } else throw res.status(500).json(err)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/phonebooks/:id/avatar', async function (req, res, next) {
    const { avatar } = req.body
    try {
        const phonebooks = await models.Phonebooks.update({ avatar }, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(201).json(phonebooks[1])
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
