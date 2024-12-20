import { loginFormDataEnum } from "@/pages/Login/types";

export const validEmail = (email: string) => {
  const checker = /^[a-zA-Z0-9._%+-]+@fusemachines\.com$/;
  const val = email == null ? "" : email;
  return checker.test(val) && val.length < 255 && val.length > 5;
};
export const validPassword = (password: string) => {
  const val = password == null ? "" : password;
  return val.length >= 8;
};
export const loginValidation = (error: any) => {
  let onErrorField = Object.keys(error).map((key) => {
    if (error?.[key] === true) {
      switch (key) {
        case loginFormDataEnum.email:
          return "Invalid email address. Must be in the format: @fusemachines.com.";
        case loginFormDataEnum.password:
          return "Password must be at least 8 characters.";
        default:
          break;
      }
    }
  });

  return onErrorField.filter(Boolean).join("\n");
};
