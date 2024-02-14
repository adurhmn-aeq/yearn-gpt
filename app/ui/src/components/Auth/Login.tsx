import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../hooks/useSettings";
import { getGoogleOAuthURL } from "../../utils/oauth";
import api from "../../services/api";
import axios from "axios";
import { Form, Input, notification } from "antd";
import AuthSidebar from "./AuthSidebar";
import GoogleIcon from "../../../src/assets/google.svg";
import LoginBgAgentOne from "../../assets/agent.png";
import LoginBgAgentTwo from "../../assets/agent-2.png";
import LoginBgAgentThree from "../../assets/agent-3.png";
import LoginBgAgentFour from "../../assets/agent-4.png";
interface User {
  user_id: number;
  username: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
  to: string;
}
export const AuthLogin = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [googleOAuthCode, setGoogleOAuthCode] = useState(params.get("code"));
  const x = useRef(false);
  const onLogin = async (values: any) => {
    const response = await api.post("/user/login", {
      username: values.username || "",
      password: values.password || "",
      googleOAuthCode: googleOAuthCode || "",
    });
    return response.data as LoginResponse;
  };

  const { login } = useAuth();

  const { data: info } = useSettings();

  const { mutateAsync: loginMutation, isLoading } = useMutation(onLogin, {
    onSuccess: (data) => {
      setGoogleOAuthCode("");
      notification.success({
        message: "Success",
        description: data.message,
        placement: "bottomRight",
      });
      login(data.token, data.user);
      navigate(data.to);
    },
    onError: (error) => {
      setGoogleOAuthCode("");
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

  useEffect(() => {
    if (googleOAuthCode && !x.current) {
      x.current = true;
      loginMutation({
        googleOAuthCode,
      });
    }
  }, [googleOAuthCode]);

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
                onFinish={loginMutation}
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
                    autoComplete="username"
                    placeholder="Username"
                    size="large"
                    className="bg-[#f8f8f8] border-[#f8f8f8] py-[10] dark:bg-[#0e1320] dark:border-[#0e1320]"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={"Password"}
                  className="font-work_sans"
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
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isLoading || !!googleOAuthCode}
                    className="font-epilogue h-12 w-full text-copy-500 bg-secondary-500 hover:bg-secondary-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800 disabled:ring-primary-500 text-base"
                  >
                    {isLoading ? "Loading..." : "Sign in"}
                  </button>
                  <button
                    type="button"
                    disabled={isLoading || !!googleOAuthCode}
                    onClick={() => {
                      console.log(getGoogleOAuthURL());
                      // @ts-ignore
                      window.location = getGoogleOAuthURL();
                    }}
                    className="font-epilogue flex w-full justify-center rounded-lg min-h-[44px] bg-white px-3 py-2 text-sm font-semibold leading-6 text-secondary-500 hover:bg-green-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 items-center gap-2 border-secondary-500 border-[1px]"
                  >
                    <img
                      src={GoogleIcon}
                      alt="google"
                      height="20px"
                      width={"20px"}
                    />
                    {isLoading ? "Loading..." : "Signin with Google"}
                  </button>
                </div>
              </Form>
            </div>
            {info?.isRegistrationAllowed ? (
              <p className="mt-5 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </Link>
              </p>
            ) : (
              <p className="mt-5 text-center text-xs text-gray-500">
                Registration is disabled by admin.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
