import { Form, Input, notification } from "antd";
import api from "../../services/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../hooks/useSettings";
import AuthSidebar from "./AuthSidebar";
import LoginBgAgentOne from "../../assets/agent.png";
import LoginBgAgentTwo from "../../assets/agent-2.png";
import LoginBgAgentThree from "../../assets/agent-3.png";
import LoginBgAgentFour from "../../assets/agent-4.png";

interface User {
  user_id: number;
  username: string;
  email: string;
}

interface RegisterResponse {
  message: string;
  token: string;
  user: User;
  to: string;
}

export const AuthRegister = () => {
  const navigate = useNavigate();
  const onRegister = async (values: any) => {
    const response = await api.post("/user/register", values);
    return response.data as RegisterResponse;
  };

  const { login } = useAuth();

  const { data: info } = useSettings();

  const { mutateAsync: registerMutation, isLoading } = useMutation(onRegister, {
    onSuccess: (data) => {
      notification.success({
        message: "Success",
        description: data.message,
        placement: "bottomRight",
      });
      login(data.token, data.user);
      navigate(data.to);
    },
    onError: (error) => {
      // is axios
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        notification.error({
          message: "Error",
          description: message,
          placement: "bottomRight",
        });
        return;
      }

      notification.error({
        message: "Error",
        description: "Something went wrong",
      });
    },
  });

  const sliderImages = [
    LoginBgAgentOne,
    LoginBgAgentTwo,
    LoginBgAgentThree,
    LoginBgAgentFour,
  ];

  const AuthSidebarHeading = () => {
    return (
      <>
        Deliver 5star <br /> customer support
      </>
    );
  };

  return (
    <>
      {" "}
      <div className="flex min-h-full bg-white dark:bg-secondary-500">
        <AuthSidebar
          imagePath={sliderImages}
          heading={<AuthSidebarHeading></AuthSidebarHeading>}
        />
        <div className="flex flex-1 justify-center items-center lg:justify-start lg:items-start flex-col px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="xl:ml-12 xl:mt-12 w-full max-w-sm lg:w-96">
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 flex items-center justify-center lg:justify-start">
                <span className="text-lg font-normal dark:text-copy-200 text-secondary-500 opacity-80">
                  Bilic Agents
                </span>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 ml-2">
                  {/* @ts-ignore */}
                  {`v${__APP_VERSION__}`}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-epilogue text-xl font-medium leading-tight tracking-tight text-secondary-500 md:text-2xl dark:text-copy-500">
                  Signin to your account
                </h2>
                <p className="my-0 mt-0 dark:text-copy-200 dark:opacity-50 text-secondary-900 font-normal opacity-80 font-work_sans">
                  Kindly provide the information below
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <Form
                  layout="vertical"
                  className="space-y-6"
                  onFinish={registerMutation}
                  requiredMark={false}
                >
                  {" "}
                  <Form.Item
                    name="username"
                    label={"Username"}
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    style={{ fontFamily: "work sans", marginBottom: "16px" }}
                  >
                    <Input
                      size="large"
                      autoComplete="username"
                      placeholder="Username"
                      className="bg-[#f8f8f8] border-[#f8f8f8] py-[10] dark:bg-[#0e1320] dark:border-[#0e1320]"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={"Email"}
                    rules={[
                      {
                        required: true,
                        message: "Please input your email",
                      },
                    ]}
                    style={{ fontFamily: "work sans", marginTop: "16px" }}
                  >
                    <Input
                      size="large"
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      className="bg-[#f8f8f8] border-[#f8f8f8] py-[10] dark:bg-[#0e1320] dark:border-[#0e1320]"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label={"Password"}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    style={{ fontFamily: "work sans", marginTop: "16px" }}
                  >
                    <Input.Password
                      size="large"
                      autoComplete="current-password"
                      placeholder="Password"
                      className="bg-[#f8f8f8] border-[#f8f8f8] py-[10] dark:bg-[#0e1320] dark:border-[#0e1320]"
                    />
                  </Form.Item>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading || !info?.isRegistrationAllowed}
                      className="flex font-epilogue h-12 w-full justify-center items-center rounded-md bg-secondary-500 hover:bg-secondary-400 px-5 py-2.5 text-base font-medium leading-6 text-copy-500 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-primary-300
                    dark:focus:ring-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Loading..." : "Register"}
                    </button>
                  </div>
                </Form>
              </div>
              <p className="mt-5 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-primary-600 hover:text-primary-500 dark:text-primary-600 dark:hover:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
