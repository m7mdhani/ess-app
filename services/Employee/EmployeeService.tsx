import { HTTPBaseService } from "../HttpBaseService";

export class EmployeesService extends HTTPBaseService {
  private static classInstance?: EmployeesService;

  constructor(token: string) {
    super(process.env.REACT_APP_COPMPANY_API_URL, token);
  }

  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new EmployeesService(token);
    }

    return this.classInstance;
  }
  private appendFormData(formData: FormData, data: any, parentKey?: string) {
    for (const key in data) {
      if (Object.hasOwn(data, key)) {
        const value = data[key];
        const finalKey = parentKey ? `${parentKey}.${key}` : key;

        if (value instanceof Array) {
          // Handle arrays
          value.forEach((item: any, index: number) => {
            this.appendFormData(formData, item, `${finalKey}[${index}]`);
          });
        } else if (typeof value === "object" && value !== null) {
          // Handle nested objects
          this.appendFormData(formData, value, finalKey);
        } else {
          // Append regular key-value pairs
          formData.append(finalKey, value);
        }
      }
    }
  }
  // GET ALL
  public getEmployees = (body?: any) =>
    this.instance
      .get(`Employees`, {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response) => {
        return response;
      });

  // GET BY ID
  public getEmployeeById = (id: string) =>
    this.instance.get(`Employees/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // POST
  public createEmployee = (body: any) => {
    Object.keys(body).forEach((keys: any) => {
      if (body[keys] == Object) {
        Object.keys(body[keys]).forEach((key: any) => {
          return body[keys][key] == null && delete body[keys][key];
        });
      }
      return body[keys] == null && delete body[keys];
    });
    // Loop through the properties of the body object
    // Object.keys(body).forEach((key: string) => {
    //   if (key == "documents") {
    //     const documents = body[key]
    //     documents.forEach((document: any, index: number) => {
    //       // Append other attributes of the document
    //       Object.entries(document).forEach(([docKey, docValue]: any[]) => {
    //         if (docKey !== "file") {
    //           formData.append(`documents[${index}].${docKey}`, docValue)
    //         }
    //       })
    //       // Append file attribute if it exists
    //       if (document.file && typeof document.file !== "string") {
    //         formData.append(`documents[${index}].file`, document.file)
    //       }
    //     })
    //   } else if (key == "certifications") {
    //     const certifications = body[key]
    //     certifications.forEach((document: any, index: number) => {
    //       // Append other attributes of the document
    //       Object.entries(document).forEach(([docKey, docValue]: any[]) => {
    //         if (docKey !== "file") {
    //           formData.append(`certifications[${index}].${docKey}`, docValue)
    //         }
    //       })
    //       // Append file attribute if it exists
    //       if (document.file && typeof document.file !== "string") {
    //         formData.append(`certifications[${index}].file`, document.file)
    //       }
    //     })
    //   } else {
    //     formData.append(key, body[key])
    //   }
    // })
    const formData: any = new FormData();
    Object.keys(body).forEach((key: string) => {
      if (Array.isArray(body[key])) {
        body[key].forEach((item: any, index: number) => {
          Object.entries(item).forEach(([subKey, subValue]: any[]) => {
            formData.append(`${key}[${index}].${subKey}`, subValue);
          });
        });
      } else if (typeof body[key] === "object" && body[key] !== null) {
        // For objects that are not arrays
        Object.entries(body[key]).forEach(([subKey, subValue]: any[]) => {
          formData.append(`${key}.${subKey}`, subValue);
        });
      } else {
        formData.append(key, body[key]);
      }
    });

    return this.instance.post("Employees", formData);
  };

  // EDIT
  public EditEmployee = (body: any) => {
    const formData: any = new FormData();
    Object.keys(body).forEach((keys: any) => {
      if (Array.isArray(body[keys])) {
        body[keys]?.forEach((element: any) => {
          Object?.keys(element)?.forEach((subKey: any) => {
            return element[subKey] == null && delete element[subKey];
          });
        });
      }
      return body[keys] == null && delete body[keys];
    });
    // Loop through the properties of the body object
    Object.keys(body).forEach((key: string) => {
      if (Array.isArray(body[key])) {
        body[key].forEach((item: any, index: number) => {
          Object.entries(item).forEach(([subKey, subValue]: any[]) => {
            formData.append(`${key}[${index}].${subKey}`, subValue);
          });
        });
      } else if (typeof body[key] === "object" && body[key] !== null) {
        // For objects that are not arrays
        Object.entries(body[key]).forEach(([subKey, subValue]: any[]) => {
          formData.append(`${key}.${subKey}`, subValue);
        });
      } else {
        formData.append(key, body[key]);
      }
    });
    // this.appendFormData(formData, body)
    return this.instance.put("Employees", formData);
  };

  // DELETE
  public deleteEmployee = (id: string) =>
    this.instance.delete(`Employees/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });
  public deleteMultipleEmployee = ({ ids }: { ids: string[] }) =>
    this.instance.delete(`Employees`, { data: { ids } }).then((response) => {
      if (response) {
        return response;
      }
    });
  // GET ALL Managers
  public getAllManagers = () =>
    this.instance
      .get(`Employees/ListManagers`, {
        ...this.getRequestConfig(),
      })
      .then((response) => {
        return response;
      });

  // upload employee logo
  public UploadEmployeeLogo = (body: any) =>
    this.instance.post(`Employees/UploadImage`, body).then((response) => {
      return response;
    });

  // get employee logo
  public getEmployeeLogo = (employeeId: string, size: any = 0) =>
    this.instance.get(`Employees/${employeeId}/image`).then((response) => {
      return response;
    });
}
