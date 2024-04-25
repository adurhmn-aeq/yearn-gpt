import { Button, Modal } from "antd";
import * as React from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions({ close }: { close: () => any }) {
  const { connectors, connect } = useConnect();

  return (
    <Modal
      title="Wallet Options"
      open={true}
      onOk={close}
      onCancel={close}
    >
      <div className="flex gap-2 rounded-3 p-3 bg-slate-200 flex-wrap">
        {connectors.map((connector) => (
          <WalletOption
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector })}
          />
        ))}
      </div>
    </Modal>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button disabled={!ready} onClick={onClick}>
      {connector.name}
    </Button>
  );
}
