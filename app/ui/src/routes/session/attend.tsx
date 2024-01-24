import { useState } from "react";
import SessionCollect from "../../components/Session/SessionCollect";
import { SessionAgentPlayground } from "../../components/Bot/Playground/SessionAgentPlayground";
// import { PreviewIframe } from "../../components/Bot/Preview/PreviewIFrame";

export default function SessionScreen() {
  const [stage, setStage] = useState<"collect" | "attend">("collect");
  // const { data, status } = useQuery(["getAgentById", param.id], async () => {
  //   const response = await api.get(`/agent/${param.id}`);
  //   return response.data as {
  //     id: string;
  //     user_id: number;
  //     name: string;
  //     initMsg: string;
  //     prompt: string;
  //     createdAt: string;
  //     sessions: any[];
  //   };
  // });

  return (
    <>
      {stage === "collect" && (
        <div className="flex justify-center p-3 gap-8">
          <SessionCollect startSession={() => setStage("attend")} />
        </div>
      )}
      {stage === "attend" && <SessionAgentPlayground />}
    </>
  );
}
