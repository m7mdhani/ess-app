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

  constructor(token: string) {
    super(
      process.env.EXPO_PUBLIC_ATTENDANCE_API_URL,
      "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfMlRzdnJOb2xMLW41bGZ0bktrakhKYWNIbXpoV2hwRFY5bEtsdXo4S2swIn0.eyJleHAiOjE3Mjc4ODMzMTYsImlhdCI6MTcyNzg2NTMxNiwiYXV0aF90aW1lIjoxNzI3ODU2MDgyLCJqdGkiOiI3ODNkZjRmZi0yMmEzLTQwNjQtOTgyOC0zZDJkZWUwNzY5NWIiLCJpc3MiOiJodHRwOi8va2V5Y2xvYWsuaW50ZXJuYWwuNTcuMTUyLjguMzAubmlwLmlvL3JlYWxtcy9teVJlYWxtIiwiYXVkIjpbIi5OZXQtQ2xpZW50IiwiYWNjb3VudCJdLCJzdWIiOiJhYTVmYjU2ZS0yZDBiLTRmOWMtODQwOS01NjdjMmExZDk1YjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1jbGllbnQiLCJub25jZSI6ImY5OWUzNTkwLTViYWYtNDFhYS04MGU5LWIzZDEzNGFlMGE2NSIsInNlc3Npb25fc3RhdGUiOiIzZDFiYjc3Ni1mYzU4LTQwOTMtOTVlYS0wNjIyNDQzZTAyMWIiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly81Ny4xNTIuOC4zMC5uaXAuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXlyZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwiVGVzdFJvbGUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHJlYWxtLW1hbmFnZW1lbnQgcHJvZmlsZSBhY2NvdW50Iiwic2lkIjoiM2QxYmI3NzYtZmM1OC00MDkzLTk1ZWEtMDYyMjQ0M2UwMjFiIiwibWVtYmVyX2lkIjoxMSwiY291bnRyeSI6IkVHIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNvbXBhbnlfaWQiOiIyIiwiZW1wbG95ZWVfaWQiOiJjb2RlMTBvbyIsIm5hbWUiOiJNb2hhbWVkIEhhbmkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJoYW5pQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJNb2hhbWVkIiwiZmFtaWx5X25hbWUiOiJIYW5pIiwiZW1haWwiOiJoYW5pQGdtYWlsLmNvbSJ9.BMnafKHmMw7KbwgcUI_xue3jwEvYUqbHQSuoeb5E_0J9ckx-WU9-yt0ajvFWC2rIHeSWM1mU2GPTQh4N-27UKKwOxIkPcGNIZxplqqDNSPtzWsxIyGKUwYA1B12gyqA41Q-kivkh1_sLTzDLi4pLPI26d-qEUbHgW1uvB9T9e4iYyygtvPnnPmCYnYIJ3sj73C-cAAKZl-TgAORYWLRtaP00DzOwSt-rVcF9BB11ThsumMaoZ4cQFJ94ZqkgSh3-JVD9-Pvx7IJC0UH5TCVOCt3LV_pdBBbTH8VQEA37t-TAVgLerbOJgk13lCjsm_8Pve5--SpuhGQXR54uAhh4HQ"
    );
  }

  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new TimeLogsService(token);
    }

    return this.classInstance;
  }
  // GET PAGINATED
  public getEmployeeTimeLogs = (body: any) =>
    this.instance
      .get("EmployeeTimeLogs", {
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
