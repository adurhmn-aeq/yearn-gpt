import {
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Skeleton,
  Switch,
  Upload,
  message,
} from "antd";
import { RadioGroup } from "@headlessui/react";
import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { SpiderIcon } from "../Icons/SpiderIcon";
import { GithubIcon } from "../Icons/GithubIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { ApiIcon } from "../Icons/ApiIcon";
import { SitemapIcon } from "../Icons/SitemapIcon";
import { useCreateConfig } from "../../hooks/useCreateConfig";
import botImg from "../../assets/create-bot/botCreate.svg";

type Props = {
  createBot: (values: any) => void;
  isLoading: boolean;
  setSelectedSource: React.Dispatch<React.SetStateAction<any>>;
  form: FormInstance<any>;
  showEmbeddingAndModels: boolean;
  newSelectedSource?: any;
};
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const BotForm = ({
  createBot,
  isLoading,
  setSelectedSource,
  form,
  showEmbeddingAndModels,
}: Props) => {
  const { data: botConfig, status: botConfigStatus } = useCreateConfig();

  const [availableSources] = React.useState([
    {
      id: 1,
      value: "website",
      title: "Webpage",
      icon: GlobeAltIcon,
      formComponent: (
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Please enter the webpage URL",
            },
          ]}
        >
          <Input type="url" placeholder="Enter the webpage URL" />
        </Form.Item>
      ),
    },
    {
      id: 3,
      value: "text",
      title: "Text",
      icon: DocumentTextIcon,
      formComponent: (
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Please enter the text",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter the text"
            autoSize={{ minRows: 6, maxRows: 15 }}
            className=" block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />
        </Form.Item>
      ),
    },
    {
      id: 2,
      value: "file",
      title: "File",
      icon: DocumentArrowUpIcon,
      formComponent: (
        <>
          <Form.Item
            name="file"
            rules={[
              {
                required: true,
                message: `Please upload your files (PDF, Docx, CSV, TXT, MP3, MP4)`,
              },
            ]}
            getValueFromEvent={(e) => {
              console.log("Upload event:", e);
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload.Dragger
              accept={`.pdf,.docx,.csv,.txt,.mp3,.mp4`}
              multiple={true}
              maxCount={10}
              beforeUpload={(file) => {
                const allowedTypes = [
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "text/csv",
                  "text/plain",
                  "audio/mpeg",
                  "audio/mp4",
                  "video/mp4",
                  "video/mpeg",
                ]
                  .map((type) => type.toLowerCase())
                  .join(", ");

                console.log("file type:", file.type.toLowerCase());

                if (!allowedTypes.includes(file.type.toLowerCase())) {
                  message.error(
                    `File type not supported. Please upload a ${allowedTypes} file.`
                  );
                  return Upload.LIST_IGNORE;
                }

                // if video or audio
                if (
                  file.type.toLowerCase().includes("audio") ||
                  file.type.toLowerCase().includes("video")
                ) {
                  message.warning(
                    `Currently, Only support video and audio files with English audio`
                  );
                }

                return false;
              }}
            >
              <div className="p-2">
                <p className="ant-upload-drag-icon justify-center flex">
                  <InboxIcon className="h-10 w-10 text-gray-400" />
                </p>
                <p className="ant-upload-text">
                  Click or drag PDF, Docx, CSV , TXT, MP3, MP4 files to this
                </p>
                <p className="ant-upload-hint">
                  Support is available for a single or bulk upload of up to 10
                  files. Please note that file upload is in beta, so if you
                  encounter any issues, kindly report them.
                </p>
              </div>
            </Upload.Dragger>
          </Form.Item>
          <p className="text-sm text-gray-500">
            If you find any issues, please report them on{" "}
            <a
              href={`https://github.com/n4ze3m/dialoqbase/issues/new?title=file%20upload%20issue&type=bug&labels=bug`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              GitHub
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 4,
      value: "crawl",
      title: "Crawler",
      icon: SpiderIcon,
      formComponent: (
        <>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Please enter the website URL",
              },
            ]}
          >
            <Input type="url" placeholder="Enter the website URL" />
          </Form.Item>
          <Form.Item
            name="maxDepth"
            help="The max depth of the website to crawl"
            rules={[
              {
                required: true,
                message: "Please input max depth!",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter the max depth"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="maxLinks"
            help="The max links to crawl"
            rules={[
              {
                required: true,
                message: "Please input max links count",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter the max depth"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <p className="text-sm text-gray-500">
            If you find any issues, please report them on{" "}
            <a
              href="https://github.com/n4ze3m/dialoqbase/issues/new?title=Crawler%20issue&labels=bug"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              GitHub
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 6,
      value: "github",
      title: "GitHub",
      icon: GithubIcon,
      formComponent: (
        <>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Please enter the public github repo URL",
              },
              {
                pattern: new RegExp(
                  "^(https?://)?(www.)?github.com/([a-zA-Z0-9-]+)/([a-zA-Z0-9_-]+)(.git)?$"
                ),
                message: "Please enter a valid public github repo URL",
              },
            ]}
          >
            <Input type="url" placeholder="Enter the github repo URL" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["options", "branch"]}
                label="Branch"
                rules={[
                  {
                    required: true,
                    message: "Please input branch",
                  },
                ]}
              >
                <Input placeholder="Enter the branch" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Private repo?" name={["options", "is_private"]}>
                <Switch className="mr-2" />
              </Form.Item>
            </Col>
          </Row>

          <p className="text-sm text-gray-500">
            If you find any issues, please report them on{" "}
            <a
              href="https://github.com/n4ze3m/dialoqbase/issues/new?title=Github%20issue&labels=bug"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              GitHub
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 7,
      value: "youtube",
      title: "Youtube",
      icon: YoutubeIcon,
      formComponent: (
        <>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Please enter a valid youtube URL",
              },
              {
                pattern: new RegExp(
                  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
                ),
                message: "Please enter a valid youtube URL",
              },
            ]}
          >
            <Input type="url" placeholder="Enter the youtube URL" />
          </Form.Item>

          <p className="text-sm text-gray-500">
            If you find any issues, please report them on{" "}
            <a
              href="https://github.com/n4ze3m/dialoqbase/issues/new?title=Github%20issue&labels=bug"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              GitHub
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 8,
      value: "rest",
      title: "REST API",
      icon: ApiIcon,
      formComponent: (
        <>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                name={["options", "method"]}
                rules={[
                  {
                    required: true,
                    message: "Please select a method",
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      label: "GET",
                      value: "get",
                    },
                    {
                      label: "POST",
                      value: "post",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid REST API URL",
                  },
                  {
                    pattern: new RegExp(/^(https?:\/\/)?(www\.)?(.+)\.(.+)$/),
                    message: "Please enter a valid REST API URL",
                  },
                ]}
              >
                <Input type="url" placeholder="Enter the REST API URL" />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      id: 9,
      value: "sitemap",
      title: "Sitemap",
      icon: SitemapIcon,
      formComponent: (
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Please enter the sitemap URL",
            },
          ]}
        >
          <Input type="url" placeholder="Enter the sitemap URL" />
        </Form.Item>
      ),
    },
  ]);

  const [selectedSource, _setSelectedSource] = React.useState<any>(
    showEmbeddingAndModels ? null : availableSources[0]
  );

  return (
    <>
      {botConfigStatus === "success" && (
        <Form
          layout="vertical"
          onFinish={createBot}
          form={form}
          className="space-y-6 flex flex-col justify-between !pt-6 w-full"
          initialValues={{
            embedding: "dialoqbase_eb_text-embedding-ada-002",
            model: "gpt-3.5-turbo-dbase",
            maxDepth: 2,
            maxLinks: 10,
            options: {
              branch: "main",
              is_private: false,
              method: "get",
              headers: "{}",
              body: "{}",
            },
          }}
        >
          <div className="flex gap-[40px] items-center justify-between">
            <p className="text-base font-medium text-[#34353899] dark:text-gray-200 w-[800px]">
              Crafted to fit your unique requirements and efficiently manage
              tasks and inquiries, our personalized assistance simplifies your
              workflow with tailored solutions.
            </p>
            <img src={botImg} alt="img" />
          </div>
          <div className="flex flex-1  gap-[20px] flex-col  lg:flex-row">
            <RadioGroup
              value={selectedSource}
              onChange={(e: any) => {
                _setSelectedSource(e);
                setSelectedSource(e);
              }}
            >
              <div className=" flex flex-col  pt-2 pb-8 gap-6 border border-[#E6E6E6] rounded-[20px] w-[100%] lg:w-[200px] xl:w-[276px] h-full shadow-lg transition-all">
                <h2 className="font-[600] text-[20px] text-[#282828] lg:pl-[20px] pt-[20px] pb-[10px] text-center lg:text-left">
                  Domains
                </h2>
                <div className="flex flex-wrap justify-center lg:flex-col gap-4">
                  {availableSources.map((source) => (
                    <RadioGroup.Option
                      key={source.id}
                      value={source}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "!bg-[#1967FC1A]" : " dark:border-gray-700",

                          "relative items-center flex cursor-pointer bg-[#8080801c] lg:bg-[#FFFFFF] focus:outline-none dark:bg-[#141414] px-[10px] py-[8px] text-[#34353899] rounded-lg lg:rounded-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span
                            className={classNames(
                              checked ? "text-[#1967FC]" : "",
                              "flex-shrink-0 flex  items-center justify-center  md:gap-[8px] gap-1 text-xs sm:text-sm md:text-base "
                            )}
                          >
                            <RadioGroup.Label
                              as="span"
                              className="block md:text-base text-xs font-medium text-[#34353899] dark:text-[#34353899]"
                            >
                              <source.icon
                                className={classNames(
                                  checked ? "text-[#1967FC]" : "",
                                  active ? "" : "",
                                  "h-6 w-6"
                                )}
                                aria-hidden="true"
                              />
                            </RadioGroup.Label>
                            {source.title}
                          </span>

                          {/* <span
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "border-indigo-500" : "border-transparent",
                          "pointer-events-none absolute -inset-px rounded-lg"
                        )}
                        aria-hidden="true"
                      /> */}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </div>
            </RadioGroup>

            <div className="flex flex-col flex-1 border-2 border-[#34353833] rounded-[20px] p-6 pb-0 justify-between">
              {selectedSource && selectedSource.formComponent}

              {selectedSource && selectedSource.value === "rest" && (
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item name={["options", "headers"]} label="Headers">
                      <Input.TextArea placeholder="Enter the headers" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["options", "body"]}
                      label="Body (JSON)"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a valid JSON",
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Enter the body" />
                    </Form.Item>
                  </Col>
                </Row>
              )}

              <div className="flex flex-col mt-auto">
                <Form.Item hidden={!showEmbeddingAndModels} noStyle>
                  <Divider />
                </Form.Item>

                <div className="flex justify-between gap-1 flex-wrap md:flex-nowrap md:gap-6">
                  <Form.Item
                    className="w-full"
                    hidden={!showEmbeddingAndModels}
                    label={
                      <span className="font-medium text-gray-800 text-xs sm:text-sm md:text-base dark:text-gray-200">
                        Chat Model
                      </span>
                    }
                    name="model"
                  >
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label?.toLowerCase() ?? "").includes(
                          input?.toLowerCase()
                        ) ||
                        (option?.value?.toLowerCase() ?? "").includes(
                          input?.toLowerCase()
                        )
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
                  <Form.Item
                    className="w-full"
                    hidden={!showEmbeddingAndModels}
                    label={
                      <span className="font-medium text-gray-800 text-xs sm:text-sm md:text-base dark:text-gray-200">
                        Embedding model
                      </span>
                    }
                    name="embedding"
                  >
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label?.toLowerCase() ?? "").includes(
                          input?.toLowerCase()
                        ) ||
                        (option?.value?.toLowerCase() ?? "").includes(
                          input?.toLowerCase()
                        )
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={botConfig.embeddingModel}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <Form.Item className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-[10px] border border-transparent bg-[#1967FC] py-2 px-8 text-sm font-medium text-white shadow-sm hover:bg-[#0945b7] focus:outline-none mb-4"
            >
              {isLoading ? "Creating..." : "submit"}
            </button>
          </Form.Item>
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
