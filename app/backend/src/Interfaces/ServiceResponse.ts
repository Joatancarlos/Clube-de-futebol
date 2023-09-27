// src/interfaces/ServiceResponse.ts

export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 200 | 201 | 400 | 401 | 404 | 422 | 500;

type response = { message?: string; token?: string; role?: string, data?: unknown };

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseErrorType,
  data: T | response
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
