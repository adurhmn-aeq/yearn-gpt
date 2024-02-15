import { Form, FormInstance, Input, Select, Skeleton } from "antd";
import { useCreateConfig } from "../../hooks/useCreateConfig";

type Props = {
  createAgent: (values: any) => void;
  isLoading: boolean;
  form: FormInstance<any>;
};

export const AgentForm = ({ isLoading, form, createAgent }: Props) => {
  const { data: botConfig, status: botConfigStatus } = useCreateConfig();

  return (
    <>
      {botConfigStatus === "success" && (
        <Form
          form={form}
          layout="vertical"
          onFinish={createAgent}
          className="space-y-6"
          initialValues={{
            initMsg: "Good day, how are you doing?",
          }}
        >
          <div className="sm:overflow-hidden ">
            <div className="space-y-6 rounded-t-md bg-white dark:bg-black dark:border-gray-800">
              <Form.Item
                label={
                  <span className="font-medium text-gray-800 text-xs dark:text-gray-200">
                    Agent Name
                  </span>
                }
                name="name"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please enter agent name",
                  },
                ]}
              >
                <Input
                  size="large"
                  type="text"
                  className="!rounded-lg !border-2 !border-[#3E3F4233] focus:!border-[#3E3F42] !outline-none focus:!outline-none focus:!shadow-none !ring-0 hover:!border-[#3E3F42]"
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="font-medium text-gray-800 text-xs dark:text-gray-200">
                    Initiation Message
                  </span>
                }
                name="initMsg"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please enter initiation message",
                  },
                ]}
              >
                <Input
                  size="large"
                  type="text"
                  // className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-green-500 focus:border-indigo-500 sm:text-sm"
                  className="!rounded-lg !border-2 !border-[#3E3F4233] focus:!border-[#3E3F42] !outline-none focus:!outline-none focus:!shadow-none !ring-0 hover:!border-[#3E3F42]"
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="font-medium text-gray-800 text-xs dark:text-gray-200">
                    Agent Prompt
                  </span>
                }
                name="prompt"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please enter agent prompt",
                  },
                ]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 6, maxRows: 10 }}
                  placeholder="Enter agent prompt"
                  className="!bg-[#F9F9F8] !rounded-lg !border-2 !border-none focus:!border-[#3E3F42] !outline-none focus:!outline-none !ring-0 "
                />
              </Form.Item>
              <Form.Item
                className="border-t-2"
                label={
                  <span className="font-medium text-gray-800 text-xs dark:text-gray-200 pt-4">
                    Chat Model
                  </span>
                }
                name="model"
              >
                <Select
                  className="!rounded-lg !border-2 !border-[#3E3F4233] focus:!border-[#3E3F42] !outline-none focus:!outline-none focus:!shadow-none !ring-0 hover:!border-[#3E3F42] hover:!ring-0"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label
                      ? option!.label!.toLowerCase()
                      : ""
                    ).includes(input?.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  placeholder="Select a chat model"
                  options={botConfig.chatModel}
                />
              </Form.Item>
            </div>
            <div className="pt-6 flex justify-end">
              <button
                disabled={isLoading}
                type="submit"
                // className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                className="flex  justify-center rounded-[10px] border border-transparent bg-gray-800 py-2 px-8 text-sm font-medium text-white shadow-sm hover:bg-gray-950 focus:outline-none"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </Form>
      )}
      {botConfigStatus === "loading" && (
        <div className="flex justify-center items-center">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      )}
    </>
  );
};
