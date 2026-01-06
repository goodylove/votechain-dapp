"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ThumbsUp, ThumbsDown, Clock } from "lucide-react";

interface Proposal {
  id: number;
  description: string;
  yesVotes: number;
  noVotes: number;
  executed: boolean;
  timestamp: string;
}

interface ProposalCardProps {
  proposal: Proposal;
  canVote: boolean;
  onVote: (proposalId: number, voteYes: boolean) => void;
}

export function ProposalCard({ proposal, canVote, onVote }: ProposalCardProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = proposal.yesVotes + proposal.noVotes;
  const yesPercentage =
    totalVotes > 0 ? (proposal.yesVotes / totalVotes) * 100 : 0;
  const noPercentage =
    totalVotes > 0 ? (proposal.noVotes / totalVotes) * 100 : 0;

  const handleVote = async (voteYes: boolean) => {
    if (hasVoted || proposal.executed) return;

    setIsVoting(true);
    // Simulate transaction
    setTimeout(() => {
      onVote(proposal.id, voteYes);
      setHasVoted(true);
      setIsVoting(false);
      toast.success("Vote submitted successfully!");
    }, 1500);
  };

  return (
    <Card className="p-6 bg-black border font-inter border-slate-700 transition-all hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white">
              Proposal #{proposal.id}
            </h3>
            <Badge
              className={
                proposal.executed
                  ? "bg-gray-500/20 text-gray-300 border-gray-500/30"
                  : "bg-blue-500/20 text-blue-300 border-blue-500/30"
              }
              variant="outline"
            >
              {proposal.executed ? "Executed" : "Active"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            {proposal.timestamp}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-base leading-relaxed">
          {proposal.description}
        </p>

        {/* Vote Bars */}
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-400 font-medium flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                Yes
              </span>
              <span className="text-green-400 font-mono">
                {yesPercentage.toFixed(0)}% ({proposal.yesVotes} votes)
              </span>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500 rounded-full"
                style={{ width: `${yesPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-medium flex items-center gap-2">
                <ThumbsDown className="w-4 h-4" />
                No
              </span>
              <span className="text-red-400 font-mono">
                {noPercentage.toFixed(0)}% ({proposal.noVotes} votes)
              </span>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500 rounded-full"
                style={{ width: `${noPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Vote Buttons */}
        {canVote && !proposal.executed && (
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => handleVote(true)}
              disabled={isVoting || hasVoted}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 hover:text-green-300 cursor-pointer text-green-300 border border-green-500/30"
              variant="outline"
            >
              {isVoting ? "Submitting..." : hasVoted ? "Voted" : "Vote Yes"}
            </Button>
            <Button
              onClick={() => handleVote(false)}
              disabled={isVoting || hasVoted}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 hover:text-red-300 text-red-300 border border-red-500/30 cursor-pointer"
              variant="outline"
            >
              {isVoting ? "Submitting..." : hasVoted ? "Voted" : "Vote No"}
            </Button>
          </div>
        )}

        {hasVoted && (
          <p className="text-sm text-center text-gray-400 italic">
            You have already voted on this proposal
          </p>
        )}
      </div>
    </Card>
  );
}
