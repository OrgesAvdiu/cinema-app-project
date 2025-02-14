import { BaseService } from "./BaseService";

export class MovieService extends BaseService {
  constructor() {
    super("/movies");
  }
}
