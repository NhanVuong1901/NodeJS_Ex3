import { ok } from "../../utils/http.js";
export class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    list = async (req, res) => {
        const data = await this.productService.list({
            ...req.query,
            page: Number(req.query.page ?? 1),
            limit: Number(req.query.limit ?? 10),
        });
        res.json(ok(data));
    };
    create = async (req, res) => {
        const data = await this.productService.create(req.body);
        res.json(ok(data));
    };
    findById = async (req, res) => {
        const data = await this.productService.findById(req.params.id);
        res.json(ok(data));
    };
    updateById = async (req, res) => {
        const data = await this.productService.updateById(req.params.id, req.body);
        res.json(ok(data));
    };
    deleteById = async (req, res) => {
        const data = await this.productService.deleteById(req.params.id);
        res.json(ok(data));
    };
}
//# sourceMappingURL=product.controller.js.map