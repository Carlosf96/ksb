import { Controller } from "./../../libraries/Controller";
import { Job } from "./../../models/Job";
import { Request, Response, Router, NextFunction } from "express";
import { validateJWT } from "./../../policies/General";

export class JobController extends Controller {
  constructor() {
    super();
    this.name = "job";
    this.model = Job;
  }

  routes(): Router {
    this.router.all("*", validateJWT("access"))

    this.router.route('/')
    .get(
      (req, res) => this.find(req, res)
    )
    .post(
      (req, res, next) => this.validateFields(req, res, next),
      (req, res) => this.create(req, res)
    )


    this.router.route('/:id')
    .get(
      (req, res) => this.findOne(req, res)
    )
    .put(
      (req, res, next) => this.validateFields(req, res, next),
      (req, res) => this.update(req, res)
    )
    .delete(
      (req, res) => this.destroy(req, res)
    );

    return this.router;
  }

  validateFields(req: Request, res: Response, next: NextFunction) {
    const { name, description, salary } = req.body;
    if (
      name === undefined ||
      description === undefined ||
      salary === undefined
    ) {
      Controller.badRequest(res);
    }
    next();
  }
}

const job = new JobController();
export default job;
