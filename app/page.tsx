"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ConnectWallet } from "@/components/connectWallet";
import { StatsCard } from "@/components/statsCard";
import { ProposalCard } from "@/components/proposalCard";
import { CreateProposal } from "@/components/createProposal";
import { MemberManagement } from "@/components/memberManagement";
import {
  CheckCircle2,
  Users,
  FileText,
  Vote,
  Box,
  Loader2,
} from "lucide-react";
import ConnectButton from "@/components/connetButton";
import { useVoteChain } from "@/context";
import { SampleProposals } from "@/constant/dummyDats";
import { Logo } from "@/components/logo";

interface Proposal {
  id: number;
  description: string;
  yesVotes: number;
  noVotes: number;
  executed: boolean;
  timestamp: string;
}

export default function VotingDAOApp() {
  const {
    address: walletAddress,
    isConnecting,
    connectWallet,
    userRole,
    getAllProposal,
    getMembersCount,
    isLoading,
  } = useVoteChain();

  const ownerAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl animate-pulse"></div>
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-blue-50 relative">
              <Box className="w-8 h-8 text-blue-600 animate-bounce duration-[3000ms]" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-slate-900 font-bold text-lg tracking-tight">
              VoteChain
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
              <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
              <span>Synchronizing state...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen  bg-[#fafafa]">
      <header className="sticky top-0 z-50  py-4 bg-[#fafafa] shadow-[2px] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center  flex-wrap gap-4 py-4">
            <div className="flex items-center justify-between gap-3 flex-wrap w-full">
              <Logo />
              <div className="flex items-center gap-4">
                {walletAddress && (
                  <Badge className="bg-blue-50 text-blue-600  hover:bg-blue-100 border-blue-100 gap-1 shadow-none font-medium">
                    {userRole}
                  </Badge>
                )}
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {!walletAddress ? (
          <ConnectWallet
            onConnect={connectWallet}
            isConnecting={isConnecting}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Proposals"
                value={getAllProposal?.stats.proposalCount}
                icon={<FileText className="w-5 h-5 text-white" />}
                color="purple"
              />
              <StatsCard
                title="Total Members"
                value={getMembersCount}
                icon={<Users className="w-5 h-5 text-white" />}
                color="blue"
              />
              <StatsCard
                title="Total Votes Cast"
                value={getAllProposal?.stats.totalVotes}
                icon={<CheckCircle2 className="w-5 h-5 text-white" />}
                color="green"
              />
              <StatsCard
                title="Owner Address"
                value={`${ownerAddress.substring(
                  0,
                  6
                )}...${ownerAddress.substring(38)}`}
                icon={<Vote className="w-5 h-5 text-white" />}
                color="pink"
                mono
              />
            </div>

            {/* Owner Panel */}
            {userRole === "Owner" && <MemberManagement />}

            {/* Create Proposal Section */}

            <CreateProposal />

            {/* Proposals List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-black font-inter">
                  Proposals
                </h2>
              </div>
              <ProposalCard
                canVote={userRole === "Owner" || userRole === "Member"}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
