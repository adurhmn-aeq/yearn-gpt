import { http, createConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = "e1117df9bd6be0d4b1b8740ed7124660";

export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [bscTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
