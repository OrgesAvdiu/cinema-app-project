import { BaseService } from "./BaseService";

export class RoomService extends BaseService {
  constructor() {
    super("/rooms");
  }
}
