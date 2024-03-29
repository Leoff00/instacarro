import { Router } from "express";
import { filterRequest } from "../filters/filter-request";
import {
  createCarSchema,
  createAuctionSchema,
  createUserSchema,
  finishBidSchema,
  listVehicleBidsSchema,
  submitBidSchema,
  loginSchema,
} from "../validations";
import { UserController } from "./user-controller";
import { AuctionController } from "./auction-controller";
import { CarController } from "./car-controller";
import { LoginController } from "./login-controller";
import { JWTGuard } from "../../shared/auth/jwt";

const router = Router();

const loginController = new LoginController();
const carController = new CarController();
const userController = new UserController();
const auctionController = new AuctionController();

router.post(
  "/api/v1/user/create",
  filterRequest(createUserSchema),
  userController.createUserRoute
);

router.post(
  "/api/v1/user/login",
  filterRequest(loginSchema),
  loginController.loginRoute
);

router.post(
  "/api/v1/car/create",
  JWTGuard.verify,
  filterRequest(createCarSchema),
  carController.createCarRoute
);

router.post(
  "/api/v1/auction/create",
  JWTGuard.verify,
  filterRequest(createAuctionSchema),
  auctionController.createAuctionRoute
);

router.get(
  "/api/v1/auction/list/:licensePlate",
  JWTGuard.verify,
  filterRequest(listVehicleBidsSchema),
  auctionController.listVehicleRoute
);

router.put(
  "/api/v1/auction/bid/:licensePlate",
  JWTGuard.verify,
  filterRequest(submitBidSchema),
  auctionController.submitBidRoute
);

router.delete(
  "/api/v1/auction/finish/:licensePlate",
  JWTGuard.verify,
  filterRequest(finishBidSchema),
  auctionController.finishBidRoute
);

export { router };
