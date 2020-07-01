import { Request, Response, Router, NextFunction } from "express";
import { Controller } from "./../../libraries/Controller";
import { Candidate } from "./../../models/Candidate";
import { validateJWT } from "./../../policies/General";
const { fn, col, cast } = require("sequelize");

export class CandidateController extends Controller {
  constructor() {
    super();
    this.name = "candidate";
    this.model = Candidate;
  }

  routes(): Router {
    this.router.all("*", validateJWT("access"));
    this.router
      .route("/")
      .get((req, res) => this.getAllCandidates(req, res))
      .post((req, res) => this.createCandidate(req, res, this.validateFields));

    this.router
      .route("/recruiter")
      .get((req, res) => this.findCandidateByRecruiter(req, res));

    this.router
      .route("/:id")
      .get((req, res) => this.findCandidateById(req, res))
      .put((req, res) => this.updateCandidate(req, res))
      .delete((req, res) => this.deleteCandidate(req, res));

    return this.router;
  }

  public getAllCandidates = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const candidates = await this.model.findAll();
      if (candidates.length === 0) {
        Controller.badRequest(res, "No candidates found");
      } else {
        res.send(candidates).status(200);
      }
    } catch (e) {
      console.error(e);
    }
  };

  public createCandidate = (req: Request, res: Response, validate): void => {
    const required = ["email", "phone", "name", "position"];
    const errs = validate(req, res, required);
    if (Object.keys(errs).length) {
      Controller.badRequest(res, errs);
    } else {
      this.create(req, res);
    }
  };

  public updateCandidate = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const candidate = await this.model.findOne({ where: { id } });
      const update = await candidate.update(req.body);
      res.send(update).status(200);
    } catch (e) {
      Controller.badRequest(res, "Could not update specific candidate");
    }
  };

  public findCandidateById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const candidate = await this.model.findOne({ where: { id } });
    if (candidate === null) {
      Controller.badRequest(res, "Could not find Candidate for id: " + id);
    } else {
      res.send(candidate).status(200);
    }
  };

  public findCandidateByRecruiter = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { recruiter } = req.query;
    const candidates = await this.model.findAll({
      where: fn(
        "JSON_CONTAINS",
        col("currentRecruiters"),
        cast(`{"name": "${recruiter}"}`, "CHAR CHARACTER SET utf8")
      )
    });
    if (candidates.length === 0) {
      Controller.badRequest(res, `No Candidates found for ${recruiter}`);
    } else {
      res.send(candidates).status(200);
    }
  };

  public deleteCandidate = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const candidate = await this.model.findOne({ where: { id } });
      candidate.destroy();
      res.send(candidate).status(200);
    } catch (e) {
      Controller.badRequest(res, "Candidate does not exist");
    }
  };

  public validateFields(
    req: Request,
    res: Response,
    requiredFields: string[]
  ): object {
    const { body } = req;
    const errors = {};
    for (const key of requiredFields) {
      if (body[key] === undefined) {
        errors[key] = key + " is required!";
      }
    }
    if (Object.keys(errors).length) {
      return errors;
    }
    return {};
  }
}

const candidate = new CandidateController();
export default candidate;
