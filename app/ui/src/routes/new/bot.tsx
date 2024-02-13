import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BotForm } from "../../components/Common/BotForm";
import { Form, notification } from "antd";
import axios from "axios";

export default function NewBot() {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState<any>({
    id: 1,
    value: "Website",
  });
  const [form] = Form.useForm();
  const client = useQueryClient();
  const onSubmit = async (values: any) => {
    if (selectedSource.id == 2 || selectedSource.id == 5) {
      const formData = new FormData();
      values.file.forEach((file: any) => {
        formData.append("file", file.originFileObj);
      });
      const response = await api.post(
        `/bot/upload?embedding=${values.embedding}&model=${values.model}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      client.invalidateQueries(["fetchCredits"]);
      return response.data;
    }
    const response = await api.post("/bot", {
      type: selectedSource.value.toLowerCase(),
      ...values,
    });
    client.invalidateQueries(["fetchCredits"]);
    return response.data;
  };
  const { mutateAsync: createBot, isLoading } = useMutation(onSubmit, {
    onSuccess: (data: any) => {
      navigate(`/bot/${data.id}`);
    },
    onError: (e) => {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const message =
          e.response?.data?.message ||
          e?.response?.data?.error ||
          "Something went wrong.";
        notification.error({
          message: "Error",
          description: message,
        });
        return;
      }

      notification.error({
        message: "Error",
        description: "Something went wrong.",
      });
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-col py-12 sm:px-6 lg:px-8 font-work_sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
            Create a new bot
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 border border-[#F7F7F7] sm:rounded-3xl sm:px-10 dark:bg-[#0f141f] dark:border-[#151a25] dark:shadow-[0 1px 4px #080b1136] font-work_sans shadow-[0_1px_2px_0_rgb(228,229,231,0.24)]">
            <BotForm
              showEmbeddingAndModels={true}
              createBot={createBot}
              isLoading={isLoading}
              setSelectedSource={setSelectedSource}
              form={form}
            />
          </div>
        </div>
      </div>
    </>
  );
}
