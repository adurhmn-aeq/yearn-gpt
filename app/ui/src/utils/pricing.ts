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
    startup_monthly: "Starter",
    startup_yearly: "Starter",
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
      "100 message credits/month",
      "40,000 source characters/bot",
    ],
    hobby_yearly: [
      "2 chatbots",
      "100 message credits/month",
      "40,000 source characters/bot",
    ],
    startup_monthly: [
      "5 chatbots",
      "300 message credits/month",
      "100,000 source characters/bot",
    ],
    startup_yearly: [
      "5 chatbots",
      "300 message credits/month",
      "100,000 source characters/bot",
    ],
    enterprise_monthly: [
      "10 chatbots",
      "1000 message credits/month",
      "200,000 source characters/bot",
    ],
    enterprise_yearly: [
      "10 chatbots",
      "1000 message credits/month",
      "200,000 source characters/bot",
    ],
  },
};
