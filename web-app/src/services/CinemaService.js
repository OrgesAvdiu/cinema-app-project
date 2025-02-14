import { BaseService } from "./BaseService";

export class CinemaService extends BaseService {
  constructor() {
    super("/cinemas");
  }
}
