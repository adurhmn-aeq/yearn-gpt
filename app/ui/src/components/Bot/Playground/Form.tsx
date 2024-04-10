import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessage } from "../../../hooks/useMessage";
import { useForm } from "@mantine/form";
import React from "react";
import { useStoreMessage } from "../../../store";
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition";

export const PlaygroundgForm = () => {
  const { onSubmit } = useMessage();
  const form = useForm({
    initialValues: {
      message: "",
      isBot: false,
    },
  });

  const client = useQueryClient();

  const {
    defaultSpeechToTextLanguage,
    setDefaultSpeechToTextLanguage,
    setDefaultWebTextToSpeechLanguageWebAPI,
    setElevenLabsDefaultVoice,
  } = useStoreMessage();

  const [hideListening, setHideListening] = React.useState(false);
  const {
    transcript,
    listening,
    supported: browserSupportsSpeechRecognition,
    listen,
    stop,
  } = useSpeechRecognition();

  React.useEffect(() => {
    const defaultLanguageFromLocalStorage = localStorage.getItem(
      "defaultSpeechToTextLanguage"
    );
    const defaultWebTextToSpeechLanguageWebAPIFromLocalStorage =
      localStorage.getItem("defaultWebTextToSpeechLanguageWebAPI");
    if (defaultLanguageFromLocalStorage) {
      setDefaultSpeechToTextLanguage(defaultLanguageFromLocalStorage);
    } else {
      setDefaultSpeechToTextLanguage(window.navigator.language);
    }

    if (defaultWebTextToSpeechLanguageWebAPIFromLocalStorage) {
      setDefaultWebTextToSpeechLanguageWebAPI(
        defaultWebTextToSpeechLanguageWebAPIFromLocalStorage
      );
    }

    const defaultElevenLabsDefaultVoiceFromLocalStorage = localStorage.getItem(
      "elevenLabsDefaultVoice"
    );

    if (defaultElevenLabsDefaultVoiceFromLocalStorage) {
      setElevenLabsDefaultVoice(defaultElevenLabsDefaultVoiceFromLocalStorage);
    }
  }, []);

  React.useEffect(() => {
    form.setFieldValue("message", transcript);
  }, [transcript]);

  React.useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setHideListening(true);
    } else {
      setHideListening(false);
    }
  }, [browserSupportsSpeechRecognition]);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const { mutateAsync: sendMessage, isLoading: isSending } = useMutation(
    onSubmit,
    {
      onSuccess: () => {
        client.invalidateQueries(["getBotPlaygroundHistory"]);
        form.setFieldValue("message", "");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const resetHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
    }
  };

  return (
    <div className="p-3 md:p-6 md:bg-white dark:bg-[#1e1e1e] border rounded-t-xl   border-black/10 dark:border-gray-600">
      <div className="flex-grow space-y-6 ">
        <div className="flex">
          <form
            onSubmit={form.onSubmit(async (value) => {
              form.reset();
              resetHeight();
              await sendMessage(value.message);
            })}
            className="shrink-0 flex-grow  flex items-center "
          >
            <div className="flex items-center p-2 rounded-[60px] border  bg-gray-100 w-full dark:bg-[#1e1e1e] dark:border-gray-600">
              <textarea
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !isSending) {
                    e.preventDefault();
                    form.onSubmit(async (value) => {
                      if (value.message.trim().length === 0) {
                        return;
                      }
                      form.reset();
                      resetHeight();
                      await sendMessage(value.message);
                    })();
                  }
                }}
                ref={textareaRef}
                className="rounded-full pl-4 pr-2 py-2 w-full resize-none bg-transparent focus-within:outline-none sm:text-sm focus:ring-0 focus-visible:ring-0 ring-0 dark:ring-0 border-0 dark:text-gray-100"
                required
                rows={1}
                tabIndex={0}
                placeholder={
                  !listening ? "Type your message…" : "Listening......"
                }
                {...form.getInputProps("message")}
              />
              {!hideListening && (
                <button
                  disabled={isSending}
                  onClick={() => {
                    if (!listening) {
                      listen({
                        lang: defaultSpeechToTextLanguage,
                      });
                    } else {
                      stop();
                    }
                  }}
                  type="button"
                  className={`p-0 mr-2 text-gray-500  ${
                    listening &&
                    "animate-pulse ring-2 ring-blue-500 rounded-full ring-opacity-50"
                  }`}
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"></path>
                    <path d="M19 10v2a7 7 0 01-14 0v-2"></path>
                    <path d="M12 19L12 22"></path>
                  </svg> */}

                  <svg
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00013 16.615C10.2695 16.615 11.3558 16.1631 12.2597 15.2596C13.1633 14.3562 13.6152 13.2693 13.6152 12V4.61551C13.6152 3.34621 13.1637 2.25979 12.2597 1.35588C11.3558 0.45218 10.2695 0 9.00013 0C7.73088 0 6.6444 0.45218 5.74055 1.35588C4.83664 2.25964 4.38477 3.34621 4.38477 4.61551V12C4.38477 13.2692 4.83684 14.3562 5.74055 15.2596C6.64425 16.1631 7.73088 16.615 9.00013 16.615Z"
                      fill="#1967FC"
                    />
                    <path
                      d="M17.0335 9.50458C16.8513 9.32185 16.6345 9.23047 16.3845 9.23047C16.1348 9.23047 15.9184 9.32185 15.7355 9.50458C15.553 9.68725 15.4617 9.90356 15.4617 10.1535V11.9997C15.4617 13.7786 14.8293 15.3002 13.5648 16.5646C12.3008 17.829 10.7791 18.4612 9.0001 18.4612C7.22119 18.4612 5.69961 17.829 4.43511 16.5646C3.17076 15.3005 2.53864 13.7787 2.53864 11.9997V10.1535C2.53864 9.90356 2.44725 9.68725 2.26463 9.50458C2.08191 9.32185 1.8658 9.23047 1.61564 9.23047C1.36548 9.23047 1.14911 9.32185 0.96649 9.50458C0.783718 9.68725 0.692383 9.90356 0.692383 10.1535V11.9997C0.692383 14.1247 1.40165 15.9734 2.81977 17.5453C4.23794 19.1173 5.99033 20.0187 8.077 20.2493V22.1533H4.38474C4.13473 22.1533 3.91842 22.2448 3.73575 22.4276C3.55302 22.6101 3.46164 22.8265 3.46164 23.0765C3.46164 23.3262 3.55302 23.543 3.73575 23.7255C3.91842 23.9081 4.13473 23.9997 4.38474 23.9997H13.6152C13.8652 23.9997 14.0818 23.9082 14.2642 23.7255C14.4471 23.543 14.5386 23.3262 14.5386 23.0765C14.5386 22.8266 14.4471 22.6102 14.2642 22.4276C14.0818 22.2448 13.8652 22.1533 13.6152 22.1533H9.92341V20.2493C12.0097 20.0187 13.762 19.1173 15.1803 17.5453C16.5986 15.9734 17.3081 14.1247 17.3081 11.9997V10.1535C17.3081 9.90361 17.2165 9.68745 17.0335 9.50458Z"
                      fill="#1967FC"
                    />
                  </svg>
                </button>
              )}
              <button
                disabled={isSending || form.values.message.length === 0}
                className="mx-2 flex items-center justify-center min-w-[40px] h-[40px] text-white bg-[#1967FC] rounded-[60px] disabled:opacity-50"
              >
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 10L4 15 9 20"></path>
                  <path d="M20 4v7a4 4 0 01-4 4H4"></path>
                </svg> */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.2638 10.8233L4.43422 3.10079C4.2821 3.02666 4.11362 2.99245 3.94463 3.00139C3.77565 3.01033 3.61172 3.06213 3.46827 3.15189C3.32482 3.24166 3.20657 3.36645 3.12465 3.51452C3.04273 3.6626 2.99984 3.82908 3 3.9983V4.02693C3.00008 4.16071 3.01657 4.29397 3.04909 4.42374L4.56758 10.4977C4.58793 10.5786 4.63254 10.6514 4.69542 10.7062C4.7583 10.761 4.83645 10.7953 4.91938 10.8045L11.593 11.5466C11.7041 11.5599 11.8064 11.6135 11.8806 11.6972C11.9548 11.7808 11.9958 11.8888 11.9958 12.0006C11.9958 12.1125 11.9548 12.2204 11.8806 12.3041C11.8064 12.3878 11.7041 12.4413 11.593 12.4547L4.91938 13.1968C4.83645 13.2059 4.7583 13.2402 4.69542 13.2951C4.63254 13.3499 4.58793 13.4227 4.56758 13.5036L3.04909 19.5767C3.01657 19.7065 3.00008 19.8397 3 19.9735V20.0021C2.99997 20.1713 3.04297 20.3377 3.12495 20.4856C3.20693 20.6336 3.32519 20.7583 3.46861 20.8479C3.61204 20.9376 3.77592 20.9893 3.94484 20.9982C4.11375 21.0071 4.28216 20.9729 4.43422 20.8988L20.263 13.1763C20.4834 13.0688 20.6692 12.9015 20.7992 12.6934C20.9291 12.4854 20.9981 12.2451 20.9981 11.9998C20.9981 11.7545 20.9291 11.5142 20.7992 11.3062C20.6692 11.0982 20.4842 10.9309 20.2638 10.8233Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        {/* <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-block">
            {"LLM can make mistakes, please verify the answer always."}
          </span>
        </div> */}
      </div>
    </div>
  );
};
