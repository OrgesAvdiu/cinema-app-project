import { BaseService } from "./BaseService";

export class OffersService extends BaseService {
  constructor() {
    super("/offers");
  }
}
