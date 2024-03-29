import { Request, Response } from "express";
import { SubmitBid } from "../../app/usecases/Auction/submit-bid";
import { FinishBid } from "../../app/usecases/Auction/finish-bid";
import { ListVehicleBids } from "../../app/usecases/Auction/list-vehicle-bids";
import { CreateAuction } from "../../app/usecases/Auction/create-auction";
import { auctionContainer } from "../container/auction-container";
import {
  CreateAuctionBody,
  FinishBidParam,
  ListVehicleBidsBody,
  SubmitBidBody,
  SubmitBidParam,
} from "../validations";

export class AuctionController {
  async listVehicleRoute(request: Request, response: Response) {
    const param = request.params as ListVehicleBidsBody;
    const listVehicleUseCase =
      auctionContainer.resolve<ListVehicleBids>("ListVehicleBids");
    const result = await listVehicleUseCase.execute(param);

    return response.status(200).json({ statusCode: 200, data: result });
  }

  async submitBidRoute(request: Request, response: Response) {
    const param = request.params as SubmitBidParam;
    const body = request.body as SubmitBidBody;
    const submitBidUseCase = auctionContainer.resolve<SubmitBid>("SubmitBid");

    const merge = { ...param, ...body };

    const result = await submitBidUseCase.execute(merge);
    return response.status(200).json({
      statusCode: 200,
      message: "Bid submitted",
      bids: result.bid,
    });
  }
  async createAuctionRoute(request: Request, response: Response) {
    const body = request.body as CreateAuctionBody;
    const createAuctionUseCase =
      auctionContainer.resolve<CreateAuction>("CreateAuction");
    await createAuctionUseCase.execute(body);
    return response.status(201).json();
  }

  async finishBidRoute(request: Request, response: Response) {
    const param = request.params as FinishBidParam;
    const finishBidUseCase = auctionContainer.resolve<FinishBid>("FinishBid");
    const result = await finishBidUseCase.execute(param);
    return response.status(200).json({ statusCode: 200, message: result });
  }
}
