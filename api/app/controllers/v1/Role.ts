import { Controller } from "./../../libraries/Controller";
import { Role } from "./../../models/Role";
import { Request, Response, Router } from "express";
import { validateJWT, isSelfUser, filterRoles } from "./../../policies/General";

export class RoleController extends Controller {
  constructor() {
    super();
    this.name = "role";
    this.model = Role;
  }
  routes(): Router {
    this.router.get("/:id", (req, res) => this.getRoles(req, res))
    return this.router;
  }

  public getRoles = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.model.findOne({ where: { id } });
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  };
}

const controller = new RoleController();
export default controller;
