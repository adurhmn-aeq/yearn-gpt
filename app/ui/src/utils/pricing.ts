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
  bots: {
    hobby_monthly: 2,
    hobby_yearly: 2,
    startup_monthly: 5,
    startup_yearly: 5,
    enterprise_monthly: 10,
    enterprise_yearly: 10,
  },
  prices: {
    hobby_monthly: 0.001,
    hobby_yearly: 0.01,
    startup_monthly: 0.002,
    startup_yearly: 0.02,
    enterprise_monthly: 0.0035,
    enterprise_yearly: 0.035,
  },
  features: {
    hobby_monthly: [
      "2 chatbots",

      "200 message credits/month",
      "60,000 source characters/bot",
    ],
    hobby_yearly: [
      "2 chatbots",

      "200 message credits/month",
      "60,000 source characters/bot",
    ],
    startup_monthly: [
      "5 chatbots",

      "700 message credits/month",
      "150,000 source characters/bot",
    ],
    startup_yearly: [
      "5 chatbots",

      "700 message credits/month",
      "150,000 source characters/bot",
    ],
    enterprise_monthly: [
      "10 chatbots",

      "1500 message credits/month",
      "300,000 source characters/bot",
    ],
    enterprise_yearly: [
      "10 chatbots",

      "1500 message credits/month",
      "300,000 source characters/bot",
    ],
  },
};
