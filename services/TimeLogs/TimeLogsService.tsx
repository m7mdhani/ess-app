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

export class TimeLogsService extends HTTPBaseService {
  private static classInstance?: TimeLogsService;

  constructor() {
    super("http://attendance.57.152.8.30.nip.io/api/");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new TimeLogsService();
    }

    return this.classInstance;
  }
  // GET PAGINATED
  public getEmployeeTimeLogs = (body: any) =>
    this.instance
      .get("EmployeeTimeLogs/ShiftLogs", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });

  // GET BY ID
  public getEmployeeTimeLogsById = (id: any) =>
    this.instance.get(`EmployeeTimeLogs/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // EMPLOYEE ACTIONS
  public takeAction = (body: any) =>
    this.instance
      .put("EmployeeTimeLogs/take-action", body)
      .then((response: IResponseList | object) => {
        return response as IResponseList;
      });
}
