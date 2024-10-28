import { HTTPBaseService } from "../HttpBaseService";

interface IResponseList {
  config?: [];
  data: IResponseData;
  headers?: [];
  status?: number;
  statusText?: string;
  request?: [];
  response?: any;
}
interface IResponseData {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  data: any[];
}

export class MissedDurationRequestService extends HTTPBaseService {
  private static classInstance?: MissedDurationRequestService;

  constructor() {
    super("http://attendance.57.152.8.30.nip.io/api/");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MissedDurationRequestService();
    }

    return this.classInstance;
  }
  // GET Paginated
  public getMissedRequests = (body: any) =>
    this.instance
      .get("MissedDurationApprovalRequests", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });

  // GET ALL
  public getAllMissedRequests = () =>
    this.instance
      .get("MissedDurationApprovalRequests/All", {
        ...this.getRequestConfig(),
      })
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });

  // GET BY ID
  public getMissedRequestById = (id: any) =>
    this.instance
      .get(`MissedDurationApprovalRequests/${id}`)
      .then((response) => {
        if (response) {
          return response;
        }
      });

  // POST
  public createMissedRequest = (body: any) =>
    this.instance
      .post("MissedDurationApprovalRequests", body)
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });

  // CANCEL
  public cancelMissedRequest = (id: string) =>
    this.instance
      .put(`MissedDurationApprovalRequests/${id}/CancelRequest`)
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });

  // Request Review
  public requestReview = (body: any) =>
    this.instance
      .put("MissedDurationApprovalRequests/RequestReview", body)
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });
}
