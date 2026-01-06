import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Shield, Users, Vote } from "lucide-react";

interface ConnectWalletProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export function ConnectWallet({ onConnect, isConnecting }: ConnectWalletProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="max-w-2xl w-full font-inter p-8 sm:p-12 bg-black text-center space-y-8 border-none">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Welcome to VoteSync
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Connect your wallet to participate in decentralized governance. Vote
            on proposals, create new initiatives, and shape the future of our
            community.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 py-6">
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white">Join Members</h3>
            <p className="text-sm text-gray-400">
              Connect and become part of the voting community
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Vote className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white">Vote on Proposals</h3>
            <p className="text-sm text-gray-400">
              Make your voice heard on important decisions
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-green-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white">Secure & Transparent</h3>
            <p className="text-sm text-gray-400">
              All votes recorded on the blockchain
            </p>
          </div>
        </div>

        <Button
          onClick={() => onConnect()}
          disabled={isConnecting}
          size="lg"
          className="cursor-pointer bg-blue-500 text-white font-sans  py-5 px-6 rounded-xl hover:bg-blue-600 transition"
        >
          {isConnecting ? "Connecting Wallet..." : "Connect Wallet to Continue"}
        </Button>

        <p className="text-sm text-gray-500">
          By connecting, you agree to our terms of service and privacy policy
        </p>
      </Card>
    </div>
  );
}
