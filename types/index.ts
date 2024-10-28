export interface IValidationsResponse {
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

export interface IResponseList {
    config?: [];
    data: IResponseData;
    headers?: [];
    status?: number;
    statusText?: string;
    request?: [];
    response?: any;
  }
  export interface IResponseData {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    data: any[];
  }