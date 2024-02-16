import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import React, { useEffect, useState } from "react";
import { SkeletonLoading } from "../../components/Common/SkeletonLoading";
import { Cooking } from "../../components/Common/Cooking";
import AgentInfo from "../../components/Agent/AgentInfo";
import AgentSessions from "../../components/Agent/AgentSessions";
import { useAuth } from "../../context/AuthContext";
// import { PreviewIframe } from "../../components/Bot/Preview/PreviewIFrame";

export default function AgentPreview() {
  const [sessionId, setSessionId] = useState("");
  const param = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, status } = useQuery(["getAgentById", param.id], async () => {
    const response = await api.get(`/agent/${param.id}`);
    return response.data as {
      id: string;
      user_id: number;
      name: string;
      initMsg: string;
      prompt: string;
      createdAt: string;
      sessions: {
        name: string;
        email: string;
        id: string;
        createdAt: string;
      }[];
    };
  });

  const {
    data: data2,
    status: status2,
    refetch,
  } = useQuery(["getSessionById", param.id], async () => {
    const response = await api.get(`/agent/session`, {
      params: {
        agentId: param.id, // param.id
        sessionId: sessionId, // data.sessions[i].id
      },
    });
    return response.data as {
      id: string;
      name: string;
      email: string;
      phone: string;
      messages: {
        id: string;
        message: string;
        isBot: boolean;
        createdAt: number;
      };
      createdAt: Date;
      user_id: number;
      agent_id: string;
    };
  });

  console.log({ data, data2 });

  const { isLogged } = useAuth();

  React.useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  React.useEffect(() => {
    if (status === "error") {
      navigate("/");
    }
  }, [data]);

  React.useEffect(() => {
    if (status === "success" && data) {
      setSessionId(data.sessions[0].id);
    }
  }, [data, status]);

  React.useEffect(() => {
    if (sessionId) {
      refetch();
    }
  }, [sessionId]);

  return (
    <>
      {status === "loading" && (
        <div className="mx-auto my-3 w-full max-w-7xl">
          <SkeletonLoading />
        </div>
      )}
      {status === "success" && !data && <Cooking />}
      {status === "success" && data && (
        <div className="flex h-full w-full py-6 px-4">
          <AgentSessions
            sessionId={sessionId}
            sessions={data?.sessions}
            agentName={data2?.name}
            botName={data?.name}
            sessionMessage={data2?.messages}
            setSessionId={setSessionId}
          />
          <AgentInfo info={data} />
        </div>
      )}
    </>
  );
}
