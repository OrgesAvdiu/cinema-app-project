import { BaseService } from "./BaseService";

export class MovieDetailService extends BaseService {
  constructor() {
    super("/movieDetails");
  }
}
