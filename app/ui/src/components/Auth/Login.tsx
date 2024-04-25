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
import LoginVR from "../../assets/login/botImg.svg";
import LoginBot from "../../assets/login/loginBot.svg";
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
    <div className="flex bg-white dark:bg-secondary-500 h-screen w-screen ">
      <div className="w-full h-full lg:w-[50%] flex overflow-auto justify-center">
        <div className="w-[100%] max-w-[600px] py-[20px] my-auto">
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col items-center gap-[30px]">
              <img src={LoginBot} alt="img" />
              <h2 className="font-[600] text-[42px] text-[#15121C] text-center">
                Welcome Back
              </h2>
            </div>
            <Form
              layout="vertical"
              className="space-y-6 flex flex-col gap-[20px] items-center"
              onFinish={loginMutation}
              requiredMark={false}
            >
              {/* <div className="w-[90%]">
                <div>
                  <button
                    type="button"
                    disabled={isLoading || !!googleOAuthCode}
                    onClick={() => {
                      console.log(getGoogleOAuthURL());
                      // @ts-ignore
                      window.location = getGoogleOAuthURL();
                    }}
                    className="font-epilogue flex w-full justify-center rounded-lg min-h-[50px] bg-white px-3 py-2 text-sm font-semibold leading-6 text-secondary-500 hover:bg-green-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 items-center gap-2 border-secondary-500 border-[1px]"
                  >
                    <img
                      src={GoogleIcon}
                      alt="google"
                      height="20px"
                      width={"20px"}
                    />
                    {isLoading ? "Loading..." : "Continue with Google"}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-[10px] w-[100%] px-[5px]">
                <div className="h-[2px] w-[50%] bg-[#3435384a]"></div>
                <p className="text-[#3435384a] text-[16px] font-[500]">or</p>
                <div className="h-[2px] w-[50%] bg-[#3435384a]"></div>
              </div> */}
              <div className="w-[90%] flex flex-col gap-[20px]">
                <Form.Item
                  name="username"
                  // label={"Username"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                  style={{ fontFamily: "work sans" }}
                >
                  <Input
                    autoComplete="username"
                    placeholder="Username"
                    size="large"
                    className="bg-[#f8f8f8] border-[#f8f8f8] py-[10] dark:bg-[#0e1320] dark:border-[#0e1320] h-[50px]"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  // label={"Password"}
                  className="font-work_sans"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    autoComplete="current-password"
                    placeholder="Password"
                    className="bg-[#f8f8f8] border-[#f8f8f8] py-[10] dark:bg-[#0e1320] dark:border-[#0e1320] h-[50px]"
                  />
                </Form.Item>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading || !!googleOAuthCode}
                    className="font-epilogue h-[50px] w-full text-copy-500 bg-[#1967FC] hover:bg-[#0d4cc6] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800 disabled:ring-primary-500 text-base"
                  >
                    {isLoading ? "Loading..." : "Sign in"}
                  </button>
                </div>
              </div>
            </Form>
            <p className="font-[500] text-[12px] text-[#343538B2] text-center">
              By continuing, you agree to YearnGPT’s 
              <a
                className="underline"
                href="https://docs.yearntogether.com/terms-and-conditions/terms-and-conditions"
                target="blank"
              >
                Terms of Service
              </a>{" "}
               and 
              <a
                className="underline"
                href="https://docs.yearntogether.com/terms-and-conditions/privacy-policy"
                target="blank"
              >
                Privacy Policy.
              </a>
            </p>
            {info?.isRegistrationAllowed ? (
              <p className=" text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </Link>
              </p>
            ) : (
              <p className=" text-center text-xs text-gray-500">
                Registration is disabled by admin.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-[50%] h-full bg-[#15121C] lg:flex flex-col hidden">
        <div className="flex flex-col items-end gap-[25px] pt-[150px]">
          <div className="flex flex-col gap-[25px] pr-[35px]">
            <div className="flex flex-col items-center gap-[15px]">
              <h2 className="font-[600] text-[64px] text-[white] leading-none">
                Portal to all
              </h2>
              <h2 className="font-[600] text-[64px] text-[white] leading-none text-center">
                your <span className="text-[#1967FC]">IDO </span>Needs
              </h2>
            </div>
            <div className="flex flex-col items-center gap-[5px]">
              <p className="font-[400] text-[20px] text-[#FFFFFF99]">
                Revolutionizing IDOs Forever.
              </p>
              <p className="font-[400] text-[20px] text-[#FFFFFF99]">
                The Ultimate AI-Driven Solution!
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="w-full h-full flex justify-start items-end">
            <img
              className="max-h-[100%] object-contain"
              src={LoginVR}
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
