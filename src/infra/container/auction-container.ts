import { CreateAuction } from "../../app/usecases/Auction/create-auction";
import { FinishBid } from "../../app/usecases/Auction/finish-bid";
import { ListVehicleBids } from "../../app/usecases/Auction/list-vehicle-bids";
import { SubmitBid } from "../../app/usecases/Auction/submit-bid";
import { MongoAuctionRepository } from "../repositories/auction-repository";
import { MongoCarRepository } from "../repositories/car-repository";
import { MongoUserRepository } from "../repositories/user-repository";
import { Container } from "./injection";

const auctionContainer = new Container();

const carRepository = new MongoCarRepository();
const userRepository = new MongoUserRepository();
const auctionRepository = new MongoAuctionRepository();

auctionContainer.register<ListVehicleBids>(
  "ListVehicleBids",
  new ListVehicleBids(auctionRepository)
);
auctionContainer.register<CreateAuction>(
  "CreateAuction",
  new CreateAuction(userRepository, carRepository, auctionRepository)
);
auctionContainer.register<FinishBid>(
  "FinishBid",
  new FinishBid(auctionRepository)
);
auctionContainer.register<SubmitBid>(
  "SubmitBid",
  new SubmitBid(userRepository, carRepository, auctionRepository)
);

export { auctionContainer };
