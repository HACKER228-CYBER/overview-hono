import type { HonoRequest } from "hono";

export interface IPaginationQueries {
  page: number | 0;
  limit: number | 30;
}

class CommonService {
  constructor() {}

  public paginationQueries(req: HonoRequest): IPaginationQueries {
    if (!req) {
      return {
        page: 0,
        limit: 30,
      };
    }

    const page = req.queries("page");
    const limit = req.queries("limit");

    return {
      page: page ? +page[0] : 0,
      limit: limit ? +limit[0] : 30,
    };
  }
}

export default new CommonService();
