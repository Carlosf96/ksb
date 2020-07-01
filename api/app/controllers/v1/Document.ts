import { Request, Response, Router, NextFunction } from "express";
import * as path from "path";
import { Controller } from "./../../libraries/Controller";
import { Document } from "./../../models/Document";
import { validateJWT } from "./../../policies/General";
import { upload } from "../../server";

export class DocumentController extends Controller {
  constructor() {
    super();
    this.name = "document";
    this.model = Document;
  }

  routes(): Router {
   this.router.all('*', validateJWT("access"))

    this.router.route("/")
      .get(
        (req, res) => this.find(req, res)
      )
      .post(
        upload.single("file"),
        (req, res, next) => this.validateFields(req, res, next),
        (req, res) => this.create(req, res)
      )

    this.router.route("/:id")
      .get(
        (req, res) => this.findOne(req, res)
      )
      .put(
        upload.single("file"),
        (req, res, next) => this.validateFields(req, res, next),
        (req, res) => this.update(req, res)
      )
      .delete(
        (req, res) => this.destroy(req, res)
      );

    this.router.get(
      "/file/:id",
      (req, res) => this.getFile(req, res)
      );

    return this.router;
  }
  
  getFile(req: Request, res: Response) {
    const { id } = req.params;
    this.model.findOne({ where: { id } })
    .then(data => {
      const file = path.join(
        __dirname,
        "../../../public/uploads",
        data.path
      );
      res.sendFile(file);
    })
    .catch(err => Controller.serverError(err));
  }
    
  validateFields(req: Request, res: Response, next: NextFunction) {
    const { name, description, type, candidateId } = req.body;
    const { file } = req;
    req.body.path = file.filename;
    if (
      name === undefined ||
      description === undefined ||
      type === undefined ||
      candidateId === undefined ||
      file === undefined
    ) {
      Controller.badRequest(res);
    } else {
      next();
    }
  }
}

const document = new DocumentController();
export default document;
