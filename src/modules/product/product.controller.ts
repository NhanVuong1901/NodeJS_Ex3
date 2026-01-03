import type { Request, Response } from "express";
import type { ProductService } from "./product.service.js";
import { ok } from "../../utils/http.js";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  list = async (req: Request, res: Response) => {
    const data = await this.productService.list({
      ...req.query,
      page: Number(req.query.page ?? 1),
      limit: Number(req.query.limit ?? 10),
    } as any);

    res.json(ok(data));
  };

  create = async (req: Request, res: Response) => {
    const data = await this.productService.create(req.body);
    res.json(ok(data));
  };
  findById = async (req: Request<{ id: string }>, res: Response) => {
    const data = await this.productService.findById(req.params.id);
    res.json(ok(data));
  };

  updateById = async (req: Request<{ id: string }>, res: Response) => {
    const data = await this.productService.updateById(req.params.id, req.body);
    res.json(ok(data));
  };

  deleteById = async (req: Request<{ id: string }>, res: Response) => {
    const data = await this.productService.deleteById(req.params.id);
    res.json(ok(data));
  };
}
