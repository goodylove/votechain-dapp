import { AppKitButton, useAppKit } from "@reown/appkit/react";
import { Button } from "./ui/button";
import { useVoteChain } from "@/context";

export default function ConnectButton() {
  const { open: connectWallet } = useAppKit();
  const { address } = useVoteChain();
  // return <AppKitButton balance="hide" />;
  return (
    <Button
      className="cursor-pointer bg-blue-500 text-white font-sans  py-5 px-6 rounded-xl hover:bg-blue-600 transition"
      onClick={() => connectWallet()}
    >
      {address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
}
