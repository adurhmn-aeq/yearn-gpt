import Stripe from "stripe";

export const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("No Stripe Key Found");
  return require("stripe")(process.env.STRIPE_SECRET_KEY) as Stripe;
};

export const createCustomer = async ({
  userName,
  email,
  userId,
}: {
  userName: string;
  email: string;
  userId: string;
}) => {
  const stripe = getStripe();
  try {
    return await stripe.customers.create({
      metadata: {
        userName,
        email,
        userId,
      },
    });
  } catch (err) {
    console.log("createCustomer err", err);
    return null;
  }
};

export const deleteCustomer = async ({
  customerId,
}: {
  customerId: string;
}) => {
  const stripe = getStripe();
  try {
    return await stripe.customers.del(customerId);
  } catch (err) {
    console.log("deleteCustomer err", err);
    return null;
  }
};

export const createCheckout = async ({
  customerId,
  lookup,
}: {
  lookup: string;
  customerId: string;
}) => {
  const stripe = getStripe();

  // get prize
  const prices = await stripe.prices.list({
    lookup_keys: [lookup],
    expand: ["data.product"],
  });

  // get checkout session
  const checkout = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    customer: customerId,
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.FRONTEND_HOST_URL_DEV}/#/pricing`,
    cancel_url: `${process.env.FRONTEND_HOST_URL_DEV}/#/pricing`,
  });

  return checkout;
};

export const createPortal = async (customerId: string) => {
  try {
    const stripe = getStripe();

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_HOST_URL_DEV}/#/pricing`,
    });

    return portal;
  } catch (err) {
    console.log("createPortal err", err);
    return null;
  }
};
