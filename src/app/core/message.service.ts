import { Injectable } from "@angular/core";

@Injectable()
export class MessageService {
  messages: Array<any> = [];
  no: number = 1;

  push(type: string, message: string) {
    this.messages.push({ type: type, message: message });
  }

  remove(alert: any) {
    this.messages.splice(this.messages.indexOf(alert), 1);
  }

  parseErrorAndPush(error: any, errorMessage?: ErrorMessages) {
    if (error.status === 401) {
      this.push(
        MessageType.DANGER,
        errorMessage
          ? errorMessage.unauthorized
          : undefined || "Unauthorised access found"
      );
    } else if (error.status === 404) {
      this.push(
        MessageType.DANGER,
        errorMessage
          ? errorMessage.notFound
          : undefined || "Invalid request or server is not reachable"
      );
    } else if (error.status === 500) {
      this.push(
        MessageType.DANGER,
        errorMessage
          ? errorMessage.serverError
          : undefined || "Error occured while processing your request"
      );
    }

  }

  constructor() {}
}

export class ErrorMessages {
  unauthorized: string = "";
  notFound: string = "";
  serverError: string = "";

  constructor(serverError?: string, notFound?: string, unauthorized?: string) {
    unauthorized = unauthorized;
    notFound = notFound;
    serverError = serverError;
  }
}
export enum MessageType{
  SUCCESS = "success", INFO="info", WARNING="warning", DANGER="danger"
}