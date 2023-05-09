import express from "express";
const { Router } = express;
import TaskController from "../controller/task.controller.js";

const router = Router();

router.post("/create", TaskController.createTask);

export { router };
