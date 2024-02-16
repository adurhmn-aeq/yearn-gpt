export enum PlanLookup {
  HOBBY_MONTHLY = "hobby_monthly",
  HOBBY_YEARLY = "hobby_yearly",
  STARTUP_MONTHLY = "startup_monthly",
  STARTUP_YEARLY = "startup_yearly",
  ENTERPRISE_MONTHLY = "enterprise_monthly",
  ENTERPRISE_YEARLY = "enterprise_yearly",
}

export const Plan = {
  titles: {
    hobby_monthly: "Hobby",
    hobby_yearly: "Hobby",
    startup_monthly: "Startup",
    startup_yearly: "Startup",
    enterprise_monthly: "Enterprise",
    enterprise_yearly: "Enterprise",
  },
  prices: {
    hobby_monthly: 10,
    hobby_yearly: 100,
    startup_monthly: 20,
    startup_yearly: 200,
    enterprise_monthly: 35,
    enterprise_yearly: 350,
  },
  features: {
    hobby_monthly: [
      "2 chatbots",
      "2 agents",
      "200 message credits/month",
      "60,000 source characters/bot",
    ],
    hobby_yearly: [
      "2 chatbots",
      "2 agents",
      "200 message credits/month",
      "60,000 source characters/bot",
    ],
    startup_monthly: [
      "5 chatbots",
      "5 agents",
      "700 message credits/month",
      "150,000 source characters/bot",
    ],
    startup_yearly: [
      "5 chatbots",
      "5 agents",
      "700 message credits/month",
      "150,000 source characters/bot",
    ],
    enterprise_monthly: [
      "10 chatbots",
      "10 agents",
      "1500 message credits/month",
      "300,000 source characters/bot",
    ],
    enterprise_yearly: [
      "10 chatbots",
      "10 agents",
      "1500 message credits/month",
      "300,000 source characters/bot",
    ],
  },
};
