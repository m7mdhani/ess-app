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

export class OvertimeRequestService extends HTTPBaseService {
  private static classInstance?: OvertimeRequestService;

  constructor(token: string) {
    super("http://attendance.57.152.8.30.nip.io/api/", "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfMlRzdnJOb2xMLW41bGZ0bktrakhKYWNIbXpoV2hwRFY5bEtsdXo4S2swIn0.eyJleHAiOjE3Mjc5ODM0NDgsImlhdCI6MTcyNzk2NTQ4NywiYXV0aF90aW1lIjoxNzI3OTQ3NDQ4LCJqdGkiOiJlYmFhYTg2Mi1hMzcwLTQwZjEtYWM4ZS0wNmViZjk1MzIwMDEiLCJpc3MiOiJodHRwOi8va2V5Y2xvYWsuaW50ZXJuYWwuNTcuMTUyLjguMzAubmlwLmlvL3JlYWxtcy9teVJlYWxtIiwiYXVkIjpbIi5OZXQtQ2xpZW50IiwiYWNjb3VudCJdLCJzdWIiOiJhYTVmYjU2ZS0yZDBiLTRmOWMtODQwOS01NjdjMmExZDk1YjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1jbGllbnQiLCJub25jZSI6ImFkOWRiMDhlLTQ0MmQtNGExOS04NDZkLTI2MTVjZThjNTcyMiIsInNlc3Npb25fc3RhdGUiOiJlNmU0ZDlmZS0wZTA0LTRlMmYtOTY1ZS05ZTNmNjdkZWMzMTAiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly81Ny4xNTIuOC4zMC5uaXAuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXlyZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwiVGVzdFJvbGUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHJlYWxtLW1hbmFnZW1lbnQgcHJvZmlsZSBhY2NvdW50Iiwic2lkIjoiZTZlNGQ5ZmUtMGUwNC00ZTJmLTk2NWUtOWUzZjY3ZGVjMzEwIiwibWVtYmVyX2lkIjoxMSwiY291bnRyeSI6IkVHIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNvbXBhbnlfaWQiOiIyIiwiZW1wbG95ZWVfaWQiOiJjb2RlMTBvbyIsIm5hbWUiOiJNb2hhbWVkIEhhbmkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJoYW5pQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJNb2hhbWVkIiwiZmFtaWx5X25hbWUiOiJIYW5pIiwiZW1haWwiOiJoYW5pQGdtYWlsLmNvbSJ9.Vf2sxTg1TTQiQmXoehH-1z3eqeKWtGLlvTI27C-8IXFm3rTjHOn--NdukdV1w3xexHFU1iYu_h4DsD9I0fgbd8obdkjljMaAITd1ezBPHa5xcbB3s0zTtHvTPgJ_SbEsId8q20tQWQp_INSnrZuuHr4bEKAclwgkEvkS9Q9ZNTgdhoTlXJoABUh179apVR_-hsSujlfXk8PQtkyJlSXpCP1pGqHL8yRCZ_oBkn5k7N9wIZ3rFS_6PRk_x8d8Pfp9nhBpduGCKx3yVJrhkMvOZQQggRe1UhxvBjXEJXXFnB0wxXC6X3eWwOTCKM8NESeC2EVcC-cvf9sg96FHhT3Z6A");
  }

  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new OvertimeRequestService("eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfMlRzdnJOb2xMLW41bGZ0bktrakhKYWNIbXpoV2hwRFY5bEtsdXo4S2swIn0.eyJleHAiOjE3Mjc5ODM0NDgsImlhdCI6MTcyNzk2NTQ4NywiYXV0aF90aW1lIjoxNzI3OTQ3NDQ4LCJqdGkiOiJlYmFhYTg2Mi1hMzcwLTQwZjEtYWM4ZS0wNmViZjk1MzIwMDEiLCJpc3MiOiJodHRwOi8va2V5Y2xvYWsuaW50ZXJuYWwuNTcuMTUyLjguMzAubmlwLmlvL3JlYWxtcy9teVJlYWxtIiwiYXVkIjpbIi5OZXQtQ2xpZW50IiwiYWNjb3VudCJdLCJzdWIiOiJhYTVmYjU2ZS0yZDBiLTRmOWMtODQwOS01NjdjMmExZDk1YjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1jbGllbnQiLCJub25jZSI6ImFkOWRiMDhlLTQ0MmQtNGExOS04NDZkLTI2MTVjZThjNTcyMiIsInNlc3Npb25fc3RhdGUiOiJlNmU0ZDlmZS0wZTA0LTRlMmYtOTY1ZS05ZTNmNjdkZWMzMTAiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly81Ny4xNTIuOC4zMC5uaXAuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXlyZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwiVGVzdFJvbGUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHJlYWxtLW1hbmFnZW1lbnQgcHJvZmlsZSBhY2NvdW50Iiwic2lkIjoiZTZlNGQ5ZmUtMGUwNC00ZTJmLTk2NWUtOWUzZjY3ZGVjMzEwIiwibWVtYmVyX2lkIjoxMSwiY291bnRyeSI6IkVHIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNvbXBhbnlfaWQiOiIyIiwiZW1wbG95ZWVfaWQiOiJjb2RlMTBvbyIsIm5hbWUiOiJNb2hhbWVkIEhhbmkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJoYW5pQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJNb2hhbWVkIiwiZmFtaWx5X25hbWUiOiJIYW5pIiwiZW1haWwiOiJoYW5pQGdtYWlsLmNvbSJ9.Vf2sxTg1TTQiQmXoehH-1z3eqeKWtGLlvTI27C-8IXFm3rTjHOn--NdukdV1w3xexHFU1iYu_h4DsD9I0fgbd8obdkjljMaAITd1ezBPHa5xcbB3s0zTtHvTPgJ_SbEsId8q20tQWQp_INSnrZuuHr4bEKAclwgkEvkS9Q9ZNTgdhoTlXJoABUh179apVR_-hsSujlfXk8PQtkyJlSXpCP1pGqHL8yRCZ_oBkn5k7N9wIZ3rFS_6PRk_x8d8Pfp9nhBpduGCKx3yVJrhkMvOZQQggRe1UhxvBjXEJXXFnB0wxXC6X3eWwOTCKM8NESeC2EVcC-cvf9sg96FHhT3Z6A");
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

  // EDIT
  public editOvertimeRequest = (body: any) =>
    this.instance
      .put("OvertimeApprovalRequests", body)
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
