// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Wallet, Shield, Users, Vote } from "lucide-react";

// interface ConnectWalletProps {
//   onConnect: () => void;
//   isConnecting: boolean;
// }

// export function ConnectWallet({ onConnect, isConnecting }: ConnectWalletProps) {
//   return (
//     <div className="min-h-[80vh] flex items-center justify-center">
//       <Card className="max-w-2xl w-full font-inter p-8 sm:p-12  text-center space-y-8 border-none">
//         <div className="space-y-4">
//           <h1 className="text-3xl sm:text-4xl font-bold text-black">
//             Welcome to VoteChain
//           </h1>
//           <p className="text-lg text-gray-800 leading-relaxed">
//             Connect your wallet to participate in decentralized governance. Vote
//             on proposals, create new initiatives, and shape the future of our
//             community.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-3 gap-6 py-6">
//           <div className="space-y-3">
//             <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/20 flex items-center justify-center">
//               <Users className="w-6 h-6 text-purple-400" />
//             </div>
//             <h3 className="font-semibold text-white">Join Members</h3>
//             <p className="text-sm text-gray-700">
//               Connect and become part of the voting community
//             </p>
//           </div>
//           <div className="space-y-3">
//             <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/20 flex items-center justify-center">
//               <Vote className="w-6 h-6 text-blue-400" />
//             </div>
//             <h3 className="font-semibold text-white">Vote on Proposals</h3>
//             <p className="text-sm text-gray-700">
//               Make your voice heard on important decisions
//             </p>
//           </div>
//           <div className="space-y-3">
//             <div className="w-12 h-12 mx-auto rounded-xl bg-green-500/20 flex items-center justify-center">
//               <Shield className="w-6 h-6 text-green-400" />
//             </div>
//             <h3 className="font-semibold text-white">Secure & Transparent</h3>
//             <p className="text-sm text-gray-700">
//               All votes recorded on the blockchain
//             </p>
//           </div>
//         </div>

//         <Button
//           onClick={() => onConnect()}
//           disabled={isConnecting}
//           size="lg"
//           className="cursor-pointer bg-blue-500 text-white font-sans  py-5 px-6 rounded-xl hover:bg-blue-600 transition"
//         >
//           {isConnecting ? "Connecting Wallet..." : "Connect Wallet to Continue"}
//         </Button>

//         <p className="text-sm text-gray-500">
//           By connecting, you agree to our terms of service and privacy policy
//         </p>
//       </Card>
//     </div>
//   );
// }

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Activity, Globe } from "lucide-react";

interface ConnectWalletProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export function ConnectWallet({ onConnect, isConnecting }: ConnectWalletProps) {
  return (
    // Background: Added a subtle grid pattern to make it feel technical
    <div className="min-h-[85vh] flex items-center justify-center bg-white relative overflow-hidden">
      {/* Decorative background blobs - keeps it from looking flat */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-4xl w-full px-6 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Typography & Action */}
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-slate-600">
                V1.0 LIVE ON ETHEREUM
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Governance <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Decentralized.
                </span>
              </h1>
              <p className="text-lg text-slate-500 max-w-md leading-relaxed">
                The on-chain protocol for community decision making. Connect
                your wallet to cast votes and submit proposals directly to the
                smart contract.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => onConnect()}
                disabled={isConnecting}
                size="lg"
                className=" cursor-pointer px-8 text-sm bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl shadow-slate-200 transition-transform hover:-translate-y-1"
              >
                {isConnecting ? (
                  "Connecting..."
                ) : (
                  <>
                    Connect Wallet <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Element (Abstract Representation of Voting) */}
          <div className="hidden md:block relative">
            {/* A "Glass" Card representing a mock vote - looks like the app itself */}
            <Card className="p-6 bg-white/60 backdrop-blur-xl border border-slate-200/60 shadow-2xl rounded-3xl rotate-[-2deg] hover:rotate-0 transition-all duration-500">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    #1
                  </div>
                  <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    Active
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                </div>
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>YES</span>
                    <span>78%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[78%]"></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating Card behind it for depth */}
            <div className="absolute top-12 -right-6 w-full h-full bg-slate-900 rounded-3xl -z-10 opacity-5 rotate-[3deg]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
