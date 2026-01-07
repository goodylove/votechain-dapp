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
import { CheckCircle2, Users, FileText, Vote } from "lucide-react";
import ConnectButton from "@/components/connetButton";
import { useVoteChain } from "@/context";
import { SampleProposals } from "@/constant/dummyDats";

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
  const [proposals, setProposals] = useState<Proposal[]>(SampleProposals);

  const [userVotesCount, setUserVotesCount] = useState(7);

  const [sortBy, setSortBy] = useState<"newest" | "votes" | "active">("newest");

  const ownerAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
  console.log(getAllProposal);
  const handleVote = (proposalId: number, voteYes: boolean) => {
    setProposals(
      proposals.map((p) =>
        p.id === proposalId
          ? {
              ...p,
              yesVotes: voteYes ? p.yesVotes + 1 : p.yesVotes,
              noVotes: !voteYes ? p.noVotes + 1 : p.noVotes,
            }
          : p
      )
    );
    setUserVotesCount(userVotesCount + 1);
  };

  const sortedProposals = [...proposals].sort((a, b) => {
    if (sortBy === "newest") return 0; // Already sorted by creation
    if (sortBy === "votes")
      return b.yesVotes + b.noVotes - (a.yesVotes + a.noVotes);
    if (sortBy === "active")
      return a.executed === b.executed ? 0 : a.executed ? 1 : -1;
    return 0;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black ">
      <header className="sticky top-0 z-50  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between flex-wrap gap-4 bg-black py-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl  font-bold text-white  font-inter tracking-[0%] leading-[1.1]">
                {" "}
                VoteSync
              </h1>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {walletAddress && (
                <>
                  <Badge
                    variant="outline"
                    className="bg-purple-500/10 text-purple-300 py-1 border-purple-500/30 px-3 hidden sm:inline-flex"
                  >
                    {userRole}
                  </Badge>
                </>
              )}
              <ConnectButton />
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
            {(userRole === "Owner" || userRole === "Member") && (
              <CreateProposal />
            )}

            {/* Proposals List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-white">Proposals</h2>
              </div>
              <ProposalCard
                canVote={userRole === "Owner" || userRole === "Member"}
                onVote={handleVote}
              />
              {/* <div className="grid gap-4">
                {sortedProposals.length === 0 ? (
                  <Card className="p-12 text-center bg-slate-800/50 border-slate-700">
                    <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                      No proposals yet. Create the first one!
                    </p>
                  </Card>
                ) : (
                  sortedProposals.map((proposal) => (
                    <ProposalCard
                      key={proposal.id}
                      canVote={userRole === "Owner" || userRole === "Member"}
                      onVote={handleVote}
                    />
                  ))
                )}
              </div> */}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
