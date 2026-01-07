"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { UserPlus, Users, CheckCircle } from "lucide-react";
import { useVoteChain } from "@/context";
import { useWriteToContractHook } from "@/hooks/useWrite";

export function MemberManagement() {
  const [newMemberAddress, setNewMemberAddress] = useState<`0x${string}`>();

  const { handleAddMember, isLoading } = useWriteToContractHook();

  const handleAddMemberFunc = async () => {
    if (!newMemberAddress || !newMemberAddress.startsWith("0x")) {
      toast.error("Please enter a valid zksync address");
      return;
    }

    await handleAddMember(newMemberAddress as `0x${string}`);
  };

  return (
    <Card className="p-6 bg-black border border-slate-700 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Member Management</h2>
          <Badge
            className="bg-purple-500/20 text-purple-300 border-purple-500/30"
            variant="outline"
          >
            Owner Only
          </Badge>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="member-address"
            className="text-sm text-gray-300 block"
          >
            Add New Member
          </label>
          <div className="flex gap-3">
            <Input
              id="member-address"
              type="text"
              placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
              value={newMemberAddress}
              onChange={(e) =>
                setNewMemberAddress(e.target.value as `0x${string}`)
              }
              className="flex-1 bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-500 font-mono"
              disabled={isLoading}
            />
            <Button
              onClick={handleAddMemberFunc}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white cursor-pointer flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {isLoading ? "Adding..." : "Add Member"}
            </Button>
          </div>
          <p className="text-xs text-gray-400">
            Enter an zkSync sepolia testnet address to grant voting privileges
          </p>
        </div>

        {/* <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">
            Current Members ({members.length})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {members.map((address, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500/30 transition-colors"
              >
                <span className="font-mono text-sm text-gray-300">
                  {address}
                </span>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </Card>
  );
}
