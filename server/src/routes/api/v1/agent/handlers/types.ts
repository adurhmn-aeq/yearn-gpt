export interface CreateAgentRequest {
  Body: {
    name: string;
    initMsg: string;
    prompt: string;
    model: string;
  };
}

export interface CreateSessionRequest {
  Body: {
    name: string;
    email: string;
    phone: string;
    agentId: string;
  };
}

export interface AgentResponseRequest {
  Body: {
    session: string;
    response: string;
    isInitReq: boolean;
  };
}
export interface GetAgentRequestById {
  Params: {
    id: string;
  };
}

export interface UpdateAgentRequest {
  Body: {
    id: string;
    name?: string;
    initMsg?: string;
    prompt?: string;
    model?: string;
  };
}