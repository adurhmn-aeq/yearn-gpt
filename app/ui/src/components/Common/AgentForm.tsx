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
            "init-msg": "Good day, how are you doing?",
          }}
        >
          <div className="">
            <div className="space-y-6 mb-4">
              <Form.Item
                label="Agent Name"
                name="name"
                className="font-work_sans font-medium text-secondary-500 dark:text-copy-500"
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
                  className="dark:bg-[#121826] dark:border-[#121826]"
                />
              </Form.Item>
              <Form.Item
                label="Initiation Message"
                name="initMsg"
                className="font-work_sans font-medium text-secondary-500 dark:text-gray-200"
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
                  className="mt-1 block w-full rounded-md  focus:ring-primary-500 focus:border-primary-200 sm:text-sm dark:bg-[#121826] dark:border-[#121826]"
                />
              </Form.Item>
              <Form.Item
                label="Agent Prompt"
                name="prompt"
                className="font-work_sans font-medium text-secondary-500 dark:text-gray-200"
                rules={[
                  {
                    required: true,
                    message: "Please enter agent prompt",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter agent prompt"
                  className=" block w-full sm:text-sm focus:ring-primary-500 focus:border-primary-200 min-h-[160px] rounded-md dark:bg-[#121826] dark:border-[#121826]"
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="font-medium font-work_sans text-secondary-500-800 text-sm dark:text-gray-200">
                    Chat Model
                  </span>
                }
                name="model"
              >
                <Select
                  size="large"
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
                  className="font-work_sans dark:bg-[#121826] dark:border-[#121826] rounded-lg"
                />
              </Form.Item>
            </div>
            <div className="py-3 ">
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-work_sans"
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
