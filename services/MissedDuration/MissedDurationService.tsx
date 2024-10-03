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

  constructor(token: string) {
    super(process.env.EXPO_PUBLIC_ATTENDANCE_API_URL, token);
  }

  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new MissedDurationRequestService(token);
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

  // EDIT
  public editMissedRequest = (body: any) =>
    this.instance
      .put("MissedDurationApprovalRequests", body)
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
