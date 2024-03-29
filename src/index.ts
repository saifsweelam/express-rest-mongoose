import { RequestHandler, Router } from 'express';
import { Model } from 'mongoose';

class Restify {
    public static default = Restify;
    constructor(private model: Model<any>) {}

    public crud(): Router {
        const router = Router();

        router.get('/', this.getAll);
        router.get('/:id', this.getOne);
        router.post('/', this.create);
        router.put('/:id', this.update);
        router.delete('/:id', this.delete);

        return router;
    }

    private getAll: RequestHandler = async (req, res) => {
        const data = await this.model.find();
        res.json(data);
    }

    private getOne: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const data = await this.model.findById(id);
        res.json(data);
    }

    private create: RequestHandler = async (req, res) => {
        const data = await this.model.create(req.body);
        res.json(data);
    }

    private update: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        const data = await this.model.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(data);
    }

    private delete: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const data = await this.model.findByIdAndDelete(id);
        res.json(data);
    }
}

export = Restify;