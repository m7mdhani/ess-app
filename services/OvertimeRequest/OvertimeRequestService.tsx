import { IResponseList } from "@/types";
import { HTTPBaseService } from "../HttpBaseService";

export class OvertimeRequestService extends HTTPBaseService {
  private static classInstance?: OvertimeRequestService;

  constructor() {
    super("http://attendance.57.152.8.30.nip.io/api/");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new OvertimeRequestService();
    }

    return this.classInstance;
  }
  // GET Paginated
  public getOvertimeRequests = (body: any) =>
    this.instance
      .get("OvertimeApprovalRequests", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });

  // GET ALL
  public getAllOvertimeRequests = () =>
    this.instance
      .get("OvertimeApprovalRequests/All", {
        ...this.getRequestConfig(),
      })
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });

  // GET BY ID
  public getOvertimeRequestById = (id: any) =>
    this.instance.get(`OvertimeApprovalRequests/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // POST
  public createOvertimeRequest = (body: any) =>
    this.instance
      .post("OvertimeApprovalRequests", body)
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });

  // CANCEL
  public cancelOvertimeRequest = (id: string) =>
    this.instance
      .put(`OvertimeApprovalRequests/${id}/CancelRequest`)
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });

  // Request Review
  public requestReview = (body: any) =>
    this.instance
      .put("OvertimeApprovalRequests/RequestReview", body)
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });
}
