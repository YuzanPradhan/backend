import { primaryFuseMachines } from "@/assets/logo";
import { loginValidation } from "@/helper/errorHelper";
import { AlertCircle, Lock, Mail } from "lucide-react";
import React from "react";
import { Button } from "../../components/Button/Button";
import { useLoginScreen } from "./hooks/useLoginScreen";

export const Login: React.FC = ({}) => {
  const { handleSubmit, errorData, formData, handleInputChange, isLoading } =
    useLoginScreen();
  console.log({ validation: loginValidation(errorData) });
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              src={primaryFuseMachines}
              alt="Fusemachines Logo"
              className="mx-auto h-12 w-auto mb-10"
            />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {(errorData.email || errorData.password) && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle
                      height={24}
                      width={24}
                      className="h-5 w-5 text-red-400"
                    />
                  </div>
                  <div className="ml-3">
                    {loginValidation(errorData)
                      .split("\n")
                      .map((error) => (
                        <h3 className="text-sm font-medium text-red-800">
                          {error}
                        </h3>
                      ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-colorP03 focus:border-colorP03 sm:text-sm transition-colors duration-200"
                  placeholder="you@fusemachines.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-colorP03 focus:border-colorP03 sm:text-sm transition-colors duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-colorP01 hover:bg-colorP04 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-colorP04 transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Performance Review System
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
