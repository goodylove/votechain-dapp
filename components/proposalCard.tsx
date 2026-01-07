"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, CheckCircle2, Timer } from "lucide-react";
import { useWriteToContractHook } from "@/hooks/useWrite";
import { useVoteChain } from "@/context";

interface ProposalCardProps {
  canVote: boolean;
}

export function ProposalCard({ canVote }: ProposalCardProps) {
  const { isLoading, isConfirmed, handleVote } = useWriteToContractHook();
  const { getAllProposal } = useVoteChain();

  const proposals = useMemo(() => {
    return getAllProposal.proposals?.map((val) => val) || [];
  }, [getAllProposal]);

  const handleVoteFunc = async (id: bigint, votesChoice: boolean) => {
    try {
      await handleVote(id, votesChoice);
    } catch (error) {
      console.error("Error voting on proposal:", error);
    }
  };

  return (
    <div className="grid gap-6">
      {proposals.length > 0 ? (
        proposals.map((proposal, index) => {
          const totalVotes =
            Number(proposal.yesVotes) + Number(proposal.noVotes);

          const yesPercentage =
            totalVotes > 0 ? (Number(proposal.yesVotes) / totalVotes) * 100 : 0;
          const noPercentage =
            totalVotes > 0 ? (Number(proposal.noVotes) / totalVotes) * 100 : 0;

          return (
            <Card
              key={index}
              className="p-6 bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                        Proposal #{index + 1}
                      </span>
                      {proposal.executed ? (
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-500 hover:bg-gray-200 gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Executed
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100 gap-1 shadow-none font-medium">
                          <Timer className="w-3 h-3" /> Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-600 text-base leading-relaxed">
                    {proposal.description}
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Yes Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 font-medium flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        Approve
                      </span>
                      <span className="text-gray-900 font-bold">
                        {yesPercentage.toFixed(1)}%{" "}
                        <span className="text-gray-400 font-normal ml-1">
                          ({Number(proposal.yesVotes)})
                        </span>
                      </span>
                    </div>

                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] transition-all duration-700 ease-out rounded-full"
                        style={{ width: `${yesPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* No Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 font-medium flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4 text-red-500" />
                        Reject
                      </span>
                      <span className="text-gray-900 font-bold">
                        {noPercentage.toFixed(1)}%{" "}
                        <span className="text-gray-400 font-normal ml-1">
                          ({Number(proposal.noVotes)})
                        </span>
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)] transition-all duration-700 ease-out rounded-full"
                        style={{ width: `${noPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {canVote && !proposal.executed && (
                  <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleVoteFunc(BigInt(index), true)}
                      disabled={isLoading || isConfirmed}
                      className="w-full bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border border-green-200 shadow-sm h-12 font-semibold text-base transition-all"
                      variant="ghost"
                    >
                      {isLoading ? "Voting..." : "Vote Yes"}
                    </Button>
                    <Button
                      onClick={() => handleVoteFunc(BigInt(index), false)}
                      disabled={isLoading || isConfirmed}
                      className="w-full bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 border border-red-200 shadow-sm h-12 font-semibold text-base transition-all"
                      variant="ghost"
                    >
                      {isLoading ? "Voting..." : "Vote No"}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-gray-400 mb-2">No active proposals</div>
          <p className="text-sm text-gray-500">
            Check back later for new governance items.
          </p>
        </div>
      )}
    </div>
  );
}
