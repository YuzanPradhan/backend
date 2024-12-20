export interface loginFormData {
  email: string;
  password: string;
}
export interface errorFormData {
  email: boolean;
  password: boolean;
}
export enum loginFormDataEnum {
  email = "email",
  password = "password",
}
