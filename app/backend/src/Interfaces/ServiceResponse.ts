// src/interfaces/ServiceResponse.ts

export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 200 | 400 | 401 | 404 | 500;

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 200,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
