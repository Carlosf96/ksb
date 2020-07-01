import { Request, Response, Router, NextFunction } from "express";
import { Controller } from "./../../libraries/Controller";
import { Feedback } from "./../../models/Feedback";
import { validateJWT } from "./../../policies/General";
import { RSA_NO_PADDING } from "constants";
const { fn, col, cast } = require("sequelize");

export class FeedbackController extends Controller {
  constructor() {
    super();
    this.name = "feedback";
    this.model = Feedback;
  }

  routes(): Router {
    this.router.all("*", validateJWT("access"));

    this.router
      .route("/")
      .get((req, res) => this.getAllFeedbacks(req, res))
      .post(
        (req, res) => this.createFeedback(req, res)
      );

    this.router
      .route("/user/:id")
      .get((req, res) => this.getFeedBacksByUserId(req, res));

    this.router
      .route("/candidate/:id")
      .get((req, res) => this.getFeedbacksByCandidateId(req, res));

    this.router
      .route("/:id")
      .get((req, res) => this.getFeedbackById(req, res))
      .put((req, res) => this.updateFeedback(req, res))
      .delete((req, res) => this.deleteFeedback(req, res));

    return this.router;
  }
  public createFeedback = async (req: Request, res: Response): Promise<void> => {
    const { candidateId, userId, rating, description } = req.body;
    if (!candidateId && !userId) {
      Controller.badRequest(res, { message: "candidateId and userId are missing" })
    }
    try {
      const feedback = await this.model.create(req.body);
      Controller.created(res, feedback)
    } catch (err) {
      Controller.badRequest(res, err)
    }
  }

  public getFeedbackById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.query;
    try {
      const feedback = await this.model.findOne({ where: { id } });
      if (feedback === null) {
        Controller.badRequest(res, {
          message: "No feedback for feedbackId: " + id
        });
      } else {
        Controller.ok(res, feedback);
      }
    } catch (err) {
      console.error(err);
    }
  };

  public getAllFeedbacks = async (req: Request, res: Response) => {
    const feedbacks = await this.model.findAll();
    if (feedbacks.length === 0) {
      Controller.badRequest(res, { message: "No feedbacks found" });
    } else {
      Controller.ok(res, feedbacks);
    }
  };

  public getFeedBacksByUserId = async (req: Request, res: Response) => {
    const { id } = req.query;
    const feedbacks = await this.model.findAll({
      where: { userId: id }
    });
    if (feedbacks.length === 0) {
      Controller.badRequest(res, { message: "No feedbacks for userId: " + id });
    } else {
      Controller.ok(res, feedbacks);
    }
  };

  public getFeedbacksByCandidateId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.query;
    try {
      const feedbacks = await this.model.findAll({
        where: { candidateId: id }
      });
      if (feedbacks.length === 0) {
        Controller.badRequest(res, {
          message: "No feedbacks for candidateId: " + id
        });
      } else {
        Controller.ok(res, feedbacks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  public deleteFeedback = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.query;
    try {
      const feedback = await this.model.findOne({ where: { id } });
      if (feedback === null) {
        Controller.badRequest(res, { message: "Feedback does not exist" });
      } else {
        await feedback.destroy();
        Controller.ok(res, feedback);
      }
    } catch (err) {
      console.error(err);
    }
  };

  public updateFeedback = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.query;
    try {
      const feedback = await this.model.findOne({ where: { id } });
      if (feedback === null) {
        Controller.badRequest(res, { message: "Feedback does not exist" });
      } else {
        await feedback.update(req.body);
        Controller.ok(res, feedback);
      }
    } catch (err) {
      console.error(err);
    }
  };

  validateFields(req: Request, res: Response, next: NextFunction) {
    const { rating, description, candidateId, userId } = req.body;
    if (
      rating === undefined ||
      description === undefined ||
      candidateId === undefined ||
      userId === undefined
    ) {
      return Controller.badRequest(res, "feedback is empty");
    } else {
      next();
    }
  }
}

const feedback = new FeedbackController();
export default feedback;
