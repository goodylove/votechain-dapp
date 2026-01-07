import { useAppKit, useDisconnect } from "@reown/appkit/react";
import { Button } from "./ui/button";
import { useVoteChain } from "@/context";

export default function ConnectButton() {
  const { open: connectWallet } = useAppKit();
  const { disconnect } = useDisconnect();
  const { address } = useVoteChain();

  const handleClick = () => {
    if (address) {
      disconnect();
    } else {
      connectWallet();
    }
  };

  return (
    <Button
      className="cursor-pointer px-8 text-sm bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl shadow-slate-200 transition-transform hover:-translate-y-1"
      onClick={handleClick}
    >
      {address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
}
