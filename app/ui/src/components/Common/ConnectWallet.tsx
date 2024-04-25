import { Button } from "antd";
import { useAccount, useDisconnect } from "wagmi";
import { WalletOptions } from "./WalletOptions";
import { useState } from "react";

function ConnectWallet() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isWalletOptionsOpen, setIsWalletOptionsOpen] = useState(false);

  if (!isConnected)
    return (
      <>
        <Button onClick={() => setIsWalletOptionsOpen(true)}>
          Connect Wallet
        </Button>
        {isWalletOptionsOpen && (
          <WalletOptions close={() => setIsWalletOptionsOpen(false)} />
        )}
      </>
    );

  return (
    <div className="flex flex-col gap-2">
      <button
        className="rounded-md bg-green-300 p-3 text-center"
        onClick={() => navigator.clipboard.writeText(address || "")}
      >
        {address?.slice(0, 15) + "..."}
      </button>
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </div>
  );
}

export default ConnectWallet;
