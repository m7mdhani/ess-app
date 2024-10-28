import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { IValidationsResponse } from "@/types";

export abstract class HTTPBaseService {
  protected instance: AxiosInstance;
  protected token: string | null = null;
  protected readonly baseURL: string | undefined;
  private abortController: AbortController;

  public constructor(baseURL: string | undefined) {
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
    if (token) {
      this.token = token;
    }
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
          Toast.show(message || "Server Error");
        } else if (status === 403) {
          Toast.show("Not authorized to do this action!");
        } else if (status === 404) {
          Toast.show(message || "Resource not found");
        } else if (status === 422 && error?.response?.data?.validations) {
          error?.response?.data?.validations.forEach(
            (validationError: IValidationsResponse) => {
              Toast.show(validationError?.errorMessage);
            }
          );
        } else if (status === 422 && error?.response?.data?.message) {
          Toast.show(error?.response?.data?.message);
        } else if (status === 400) {
          Toast.show("Bad Request: Please check your input and try again.");
        } else if (status === 503 || status === 502) {
          Toast.show("Error: Bad Gateway");
        } else if (error.message === "Network Error") {
          Toast.show("No internet connection");
        }

        return Promise.reject(error);
      }
    );
  };

  private readonly handleRequest = async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    // Set the Authorization token in the headers if available
    // if (this.token) {
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGbkJ0QVhuNEtZYWVDdkZSNkZQX2EzX21VTmFKZko2dFQ4UzRRRExPUnRVIn0.eyJleHAiOjE3MzAxMTk2MjMsImlhdCI6MTczMDEwMTYyMywiYXV0aF90aW1lIjoxNzMwMTAxNjIwLCJqdGkiOiJhNDY0OGJlZS01NWJmLTQxNTQtOTFjMy02NjFkYzU0Nzk3MGYiLCJpc3MiOiJodHRwOi8va2V5Y2xvYWsuaW50ZXJuYWwuNTcuMTUyLjguMzAubmlwLmlvL3JlYWxtcy9teVJlYWxtIiwiYXVkIjpbIi5OZXQtQ2xpZW50IiwiYWNjb3VudCJdLCJzdWIiOiIzNzZlOGFkZS04NzBmLTQ3MjUtODI4Ny01ZDFlYWE0N2JiZDciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1jbGllbnQiLCJub25jZSI6IjNhY2NhZGNhLWQxYTAtNDQ2MS04NWI4LWU2MzQ5Y2YwMzgwMyIsInNlc3Npb25fc3RhdGUiOiIxNjdjNTUyMC0wNmRhLTQ4N2ItYmM5MS0wMTg1ZDE5MzZkZWYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly81Ny4xNTIuOC4zMC5uaXAuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXlyZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwiVGVzdFJvbGUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHJlYWxtLW1hbmFnZW1lbnQgcHJvZmlsZSBhY2NvdW50Iiwic2lkIjoiMTY3YzU1MjAtMDZkYS00ODdiLWJjOTEtMDE4NWQxOTM2ZGVmIiwibWVtYmVyX2lkIjo0LCJjb3VudHJ5IjoiRUciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNvbXBhbnlfaWQiOiIyIiwiZW1wbG95ZWVfaWQiOiJjb2RlMTAiLCJuYW1lIjoiTW9oYW1lZCBIYW5pIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGFuaUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiTW9oYW1lZCIsImZhbWlseV9uYW1lIjoiSGFuaSIsImVtYWlsIjoiaGFuaUBnbWFpbC5jb20ifQ.n9EDKDzBoSUIazMRg4FBdpVa-0-fADudYjTD0VtN8LDar166aTCwUEoAyBkEpJ_6BWO_Iy5ERS70zqMaXryyo1j9szk4EqTZsXWAnEljw6jNs7q-xuxXzyZjVoNB06SIlj96cytwG-48s_Br2pw5kUybv7FuZ62bB_UvSzMHY64VTCs3pkZ8yhWVAE00w2H1O0MwvObN37WegsiXTRX8rDCjBrmJyKfhoZ8HaCo2MuDFZ-PVGYT14_OCFns0j3dQ85qVVrJlZBFcoyBe1xKQGWLXEanJ9egpQIlofqN9ggV2azuqI7_fNMfVOQA-rke5uxMmOVz4ltKHw6nCpA2Oww`;
    config.headers["Content-Type"] = "application/json";
    // config.headers["Authorization"] = `Bearer ${this.token}`;
    // }
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
