import { Controller } from "./../../libraries/Controller";
import { User } from "./../../models/User";
import { Request, Response, Router } from "express";
import { validateJWT, isSelfUser, filterRoles } from "./../../policies/General";

export class UserController extends Controller {
  constructor() {
    super();
    this.name = "user";
    this.model = User;
  }

  // The second argument (isSelfUser, filterRoles, etc)
  // authorizes the request, and is currently broken
  // due to my changes in the structure of the Role table.
  routes(): Router {
    this.router.get("/:id", validateJWT("access"), isSelfUser(), (req, res) =>
      this.findOne(req, res)
    );
    this.router.put("/:id", validateJWT("access"), filterRoles([1]), (req, res) =>
      this.update(req, res)
    ); // only admin can edit user
    this.router.delete("/:id", validateJWT("access"), filterRoles([1]), (req, res) =>
      this.destroy(req, res)
    ); // only admin can delete user

    return this.router;
  }
}

const controller = new UserController();
export default controller;
