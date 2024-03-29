import { Request, Response } from "express";
import { SubmitBid } from "../../app/usecases/Auction/submit-bid";
import { FinishBid } from "../../app/usecases/Auction/finish-bid";
import { ListVehicleBids } from "../../app/usecases/Auction/list-vehicle-bids";
import { CreateAuction } from "../../app/usecases/Auction/create-auction";
import { auctionContainer } from "../container/auction-container";
import {
  CreateAuctionBody,
  FinishBidBody,
  ListVehicleBidsBody,
  SubmitBidBody,
} from "../validations";

export class AuctionController {
  async submitBidRoute(request: Request, response: Response) {
    const body = request.body as SubmitBidBody;
    auctionContainer.resolve<SubmitBid>("SubmitBid");
  }
  async finishBidRoute(request: Request, response: Response) {
    const body = request.body as FinishBidBody;
    auctionContainer.resolve<FinishBid>("FinishBid");
  }
  async listVehicleRoute(request: Request, response: Response) {
    const body = request.body as ListVehicleBidsBody;
    auctionContainer.resolve<ListVehicleBids>("ListVehicleBids");
  }
  async createAuctionRoute(request: Request, response: Response) {
    const body = request.body as CreateAuctionBody;

    auctionContainer.resolve<CreateAuction>("CreateAuction");
  }
}
