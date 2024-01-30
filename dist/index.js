"use strict";
const express_1 = require("express");
class Restify {
    model;
    static default = Restify;
    constructor(model) {
        this.model = model;
    }
    crud() {
        const router = (0, express_1.Router)();
        router.get('/', this.getAll);
        router.get('/:id', this.getOne);
        router.post('/', this.create);
        router.put('/:id', this.update);
        router.delete('/:id', this.delete);
        return router;
    }
    getAll = async (req, res) => {
        const data = await this.model.find();
        res.json(data);
    };
    getOne = async (req, res) => {
        const { id } = req.params;
        const data = await this.model.findById(id);
        res.json(data);
    };
    create = async (req, res) => {
        const data = await this.model.create(req.body);
        res.json(data);
    };
    update = async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        const data = await this.model.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(data);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        const data = await this.model.findByIdAndDelete(id);
        res.json(data);
    };
}
module.exports = Restify;
