import Alert from "@/components/Alert";
import {
  loginValidation,
  validEmail,
  validPassword,
} from "@/helper/errorHelper";
import React, { useState } from "react";
import { errorFormData, loginFormData } from "../types";
import { useLoginApi } from "./useLoginApi";

export const useLoginScreen = () => {
  const { isPending: isLoading, isError, mutate: login } = useLoginApi();

  const [formData, setFormData] = useState<loginFormData>({
    email: "",
    password: "",
  });
  const [errorData, setErrorData] = useState<errorFormData>({
    email: false,
    password: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let error: errorFormData = errorData;
    error = {
      ...error,
      email: !validEmail(formData.email),
      password: !validPassword(formData.password),
    };
    setErrorData({
      ...errorData,
      ...error,
    });
    if (Object.values(error).includes(true)) {
      Alert("error", loginValidation(error));
    } else {
      const payload = {
        ...formData,
      };
      login(payload);
    }
  };

  return {
    handleSubmit,
    handleInputChange,
    errorData,
    formData,
    isLoading,
    isError,
  };
};
