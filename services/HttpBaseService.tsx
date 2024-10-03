import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import Toast from "react-native-root-toast";

interface IValidationsResponse {
  propertyName: string;
  errorMessage: string;
  attemptedValue: string;
  customState: null;
  severity: number;
  errorCode: string;
  formattedMessagePlaceholderValues: {
    PropertyName: string;
    PropertyValue: string;
  };
}

export abstract class HTTPBaseService {
  protected instance: AxiosInstance;
  protected token: string | null = null;
  protected readonly baseURL: string | undefined;
  private abortController: AbortController;

  public constructor(baseURL: string | undefined, ssas: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
    });
    this.initializeToken();
    this.abortController = new AbortController();

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  // Initialize token from AsyncStorage
  private async initializeToken() {
    const token = await AsyncStorage.getItem("token");
    // if (token) {
    // this.token =
    // "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfMlRzdnJOb2xMLW41bGZ0bktrakhKYWNIbXpoV2hwRFY5bEtsdXo4S2swIn0.eyJleHAiOjE3Mjc4ODMzMTYsImlhdCI6MTcyNzg2NTMxNiwiYXV0aF90aW1lIjoxNzI3ODU2MDgyLCJqdGkiOiI3ODNkZjRmZi0yMmEzLTQwNjQtOTgyOC0zZDJkZWUwNzY5NWIiLCJpc3MiOiJodHRwOi8va2V5Y2xvYWsuaW50ZXJuYWwuNTcuMTUyLjguMzAubmlwLmlvL3JlYWxtcy9teVJlYWxtIiwiYXVkIjpbIi5OZXQtQ2xpZW50IiwiYWNjb3VudCJdLCJzdWIiOiJhYTVmYjU2ZS0yZDBiLTRmOWMtODQwOS01NjdjMmExZDk1YjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1jbGllbnQiLCJub25jZSI6ImY5OWUzNTkwLTViYWYtNDFhYS04MGU5LWIzZDEzNGFlMGE2NSIsInNlc3Npb25fc3RhdGUiOiIzZDFiYjc3Ni1mYzU4LTQwOTMtOTVlYS0wNjIyNDQzZTAyMWIiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly81Ny4xNTIuOC4zMC5uaXAuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXlyZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwiVGVzdFJvbGUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHJlYWxtLW1hbmFnZW1lbnQgcHJvZmlsZSBhY2NvdW50Iiwic2lkIjoiM2QxYmI3NzYtZmM1OC00MDkzLTk1ZWEtMDYyMjQ0M2UwMjFiIiwibWVtYmVyX2lkIjoxMSwiY291bnRyeSI6IkVHIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNvbXBhbnlfaWQiOiIyIiwiZW1wbG95ZWVfaWQiOiJjb2RlMTBvbyIsIm5hbWUiOiJNb2hhbWVkIEhhbmkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJoYW5pQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJNb2hhbWVkIiwiZmFtaWx5X25hbWUiOiJIYW5pIiwiZW1haWwiOiJoYW5pQGdtYWlsLmNvbSJ9.BMnafKHmMw7KbwgcUI_xue3jwEvYUqbHQSuoeb5E_0J9ckx-WU9-yt0ajvFWC2rIHeSWM1mU2GPTQh4N-27UKKwOxIkPcGNIZxplqqDNSPtzWsxIyGKUwYA1B12gyqA41Q-kivkh1_sLTzDLi4pLPI26d-qEUbHgW1uvB9T9e4iYyygtvPnnPmCYnYIJ3sj73C-cAAKZl-TgAORYWLRtaP00DzOwSt-rVcF9BB11ThsumMaoZ4cQFJ94ZqkgSh3-JVD9-Pvx7IJC0UH5TCVOCt3LV_pdBBbTH8VQEA37t-TAVgLerbOJgk13lCjsm_8Pve5--SpuhGQXR54uAhh4HQ";
    this.token =
      "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfMlRzdnJOb2xMLW41bGZ0bktrakhKYWNIbXpoV2hwRFY5bEtsdXo4S2swIn0.eyJleHAiOjE3Mjc5ODM0NDgsImlhdCI6MTcyNzk2NTQ4NywiYXV0aF90aW1lIjoxNzI3OTQ3NDQ4LCJqdGkiOiJlYmFhYTg2Mi1hMzcwLTQwZjEtYWM4ZS0wNmViZjk1MzIwMDEiLCJpc3MiOiJodHRwOi8va2V5Y2xvYWsuaW50ZXJuYWwuNTcuMTUyLjguMzAubmlwLmlvL3JlYWxtcy9teVJlYWxtIiwiYXVkIjpbIi5OZXQtQ2xpZW50IiwiYWNjb3VudCJdLCJzdWIiOiJhYTVmYjU2ZS0yZDBiLTRmOWMtODQwOS01NjdjMmExZDk1YjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1jbGllbnQiLCJub25jZSI6ImFkOWRiMDhlLTQ0MmQtNGExOS04NDZkLTI2MTVjZThjNTcyMiIsInNlc3Npb25fc3RhdGUiOiJlNmU0ZDlmZS0wZTA0LTRlMmYtOTY1ZS05ZTNmNjdkZWMzMTAiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly81Ny4xNTIuOC4zMC5uaXAuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXlyZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwiVGVzdFJvbGUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHJlYWxtLW1hbmFnZW1lbnQgcHJvZmlsZSBhY2NvdW50Iiwic2lkIjoiZTZlNGQ5ZmUtMGUwNC00ZTJmLTk2NWUtOWUzZjY3ZGVjMzEwIiwibWVtYmVyX2lkIjoxMSwiY291bnRyeSI6IkVHIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNvbXBhbnlfaWQiOiIyIiwiZW1wbG95ZWVfaWQiOiJjb2RlMTBvbyIsIm5hbWUiOiJNb2hhbWVkIEhhbmkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJoYW5pQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJNb2hhbWVkIiwiZmFtaWx5X25hbWUiOiJIYW5pIiwiZW1haWwiOiJoYW5pQGdtYWlsLmNvbSJ9.Vf2sxTg1TTQiQmXoehH-1z3eqeKWtGLlvTI27C-8IXFm3rTjHOn--NdukdV1w3xexHFU1iYu_h4DsD9I0fgbd8obdkjljMaAITd1ezBPHa5xcbB3s0zTtHvTPgJ_SbEsId8q20tQWQp_INSnrZuuHr4bEKAclwgkEvkS9Q9ZNTgdhoTlXJoABUh179apVR_-hsSujlfXk8PQtkyJlSXpCP1pGqHL8yRCZ_oBkn5k7N9wIZ3rFS_6PRk_x8d8Pfp9nhBpduGCKx3yVJrhkMvOZQQggRe1UhxvBjXEJXXFnB0wxXC6X3eWwOTCKM8NESeC2EVcC-cvf9sg96FHhT3Z6A";
    // }
  }

  private readonly initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private readonly initializeResponseInterceptor = () => {
    this.instance.interceptors.response?.use(
      (response) => {
        if (response?.headers && response?.headers.authorization) {
          const responseToken = (
            response?.headers.authorization as string
          ).split(" ")[1];
          this.token = responseToken;
          AsyncStorage.setItem("hashToken", this.token);
        }
        return response;
      },
      (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;

        // Handle different status codes with appropriate toast messages
        if (
          status === 409 ||
          status === 500 ||
          status === 405 ||
          status === 415 ||
          status === 504
        ) {
          ToastAndroid.show(message || "Server Error", ToastAndroid.LONG);
        } else if (status === 403) {
          ToastAndroid.show(
            "Not authorized to do this action!",
            ToastAndroid.LONG
          );
        } else if (status === 404) {
          ToastAndroid.show(message || "Resource not found", ToastAndroid.LONG);
        } else if (status === 422 && error?.response?.data?.validations) {
          error?.response?.data?.validations.forEach(
            (validationError: IValidationsResponse) => {
              ToastAndroid.show(
                validationError?.errorMessage,
                ToastAndroid.SHORT
              );
            }
          );
        } else if (status === 422 && error?.response?.data?.message) {
          Toast.show(error?.response?.data?.message);
        } else if (status === 400) {
          ToastAndroid.show(
            "Bad Request: Please check your input and try again.",
            ToastAndroid.LONG
          );
        } else if (status === 503 || status === 502) {
          ToastAndroid.show("Error: Bad Gateway", ToastAndroid.LONG);
        } else if (error.message === "Network Error") {
          ToastAndroid.show("No internet connection", ToastAndroid.LONG);
        }

        return Promise.reject(error);
      }
    );
  };

  private readonly handleRequest = async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    // Set the Authorization token in the headers if available
    if (this.token) {
      config.headers[
        "Authorization"
      ] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfMlRzdnJOb2xMLW41bGZ0bktrakhKYWNIbXpoV2hwRFY5bEtsdXo4S2swIn0.eyJleHAiOjE3Mjc5ODM0NDgsImlhdCI6MTcyNzk2NTQ4NywiYXV0aF90aW1lIjoxNzI3OTQ3NDQ4LCJqdGkiOiJlYmFhYTg2Mi1hMzcwLTQwZjEtYWM4ZS0wNmViZjk1MzIwMDEiLCJpc3MiOiJodHRwOi8va2V5Y2xvYWsuaW50ZXJuYWwuNTcuMTUyLjguMzAubmlwLmlvL3JlYWxtcy9teVJlYWxtIiwiYXVkIjpbIi5OZXQtQ2xpZW50IiwiYWNjb3VudCJdLCJzdWIiOiJhYTVmYjU2ZS0yZDBiLTRmOWMtODQwOS01NjdjMmExZDk1YjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1jbGllbnQiLCJub25jZSI6ImFkOWRiMDhlLTQ0MmQtNGExOS04NDZkLTI2MTVjZThjNTcyMiIsInNlc3Npb25fc3RhdGUiOiJlNmU0ZDlmZS0wZTA0LTRlMmYtOTY1ZS05ZTNmNjdkZWMzMTAiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly81Ny4xNTIuOC4zMC5uaXAuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXlyZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwiVGVzdFJvbGUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHJlYWxtLW1hbmFnZW1lbnQgcHJvZmlsZSBhY2NvdW50Iiwic2lkIjoiZTZlNGQ5ZmUtMGUwNC00ZTJmLTk2NWUtOWUzZjY3ZGVjMzEwIiwibWVtYmVyX2lkIjoxMSwiY291bnRyeSI6IkVHIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNvbXBhbnlfaWQiOiIyIiwiZW1wbG95ZWVfaWQiOiJjb2RlMTBvbyIsIm5hbWUiOiJNb2hhbWVkIEhhbmkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJoYW5pQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJNb2hhbWVkIiwiZmFtaWx5X25hbWUiOiJIYW5pIiwiZW1haWwiOiJoYW5pQGdtYWlsLmNvbSJ9.Vf2sxTg1TTQiQmXoehH-1z3eqeKWtGLlvTI27C-8IXFm3rTjHOn--NdukdV1w3xexHFU1iYu_h4DsD9I0fgbd8obdkjljMaAITd1ezBPHa5xcbB3s0zTtHvTPgJ_SbEsId8q20tQWQp_INSnrZuuHr4bEKAclwgkEvkS9Q9ZNTgdhoTlXJoABUh179apVR_-hsSujlfXk8PQtkyJlSXpCP1pGqHL8yRCZ_oBkn5k7N9wIZ3rFS_6PRk_x8d8Pfp9nhBpduGCKx3yVJrhkMvOZQQggRe1UhxvBjXEJXXFnB0wxXC6X3eWwOTCKM8NESeC2EVcC-cvf9sg96FHhT3Z6A`;
      // config.headers["Authorization"] = `Bearer ${this.token}`;
    }

    return config;
  };

  public getRequestConfig() {
    return {
      signal: this.abortController.signal,
    };
  }

  public cancelRequests() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }
}
