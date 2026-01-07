"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { UserPlus, ShieldAlert, Key } from "lucide-react";
import { useWriteToContractHook } from "@/hooks/useWrite";

export function MemberManagement() {
  const [newMemberAddress, setNewMemberAddress] = useState<string>("");
  const { handleAddMember, isLoading } = useWriteToContractHook();

  const handleAddMemberFunc = async () => {
    if (!newMemberAddress || !newMemberAddress.startsWith("0x")) {
      toast.error("Please enter a valid Ethereum address");
      return;
    }

    await handleAddMember(newMemberAddress as `0x${string}`);
    setNewMemberAddress("");
  };

  return (
    <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100">
              <Key className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Member Access
              </h2>
              <p className="text-sm text-slate-500">
                Grant voting rights to new wallets
              </p>
            </div>
          </div>

          <Badge className="w-fit bg-slate-900 text-white hover:bg-slate-800 border-transparent px-2 py-1 shadow-sm">
            <ShieldAlert className="w-3 h-3 " /> Owner Only
          </Badge>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="member-address"
              className="text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              Wallet Address
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                id="member-address"
                type="text"
                placeholder="0x..."
                value={newMemberAddress}
                onChange={(e) => setNewMemberAddress(e.target.value)}
                className="flex-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-mono h-11"
                disabled={isLoading}
              />
              <Button
                onClick={handleAddMemberFunc}
                disabled={isLoading}
                className="bg-slate-900 cursor-pointer hover:bg-slate-800 text-white shadow-lg shadow-slate-200 h-11 px-6 min-w-[140px]"
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-500 text-xs bg-white p-3 rounded-lg border border-slate-100">
            <div className="min-w-[4px] h-4 bg-orange-400 rounded-full mt-0.5"></div>
            <p>
              Adding a member grants them full voting power immediately. Ensure
              the address is on the <strong>zkSync Sepolia Testnet</strong>{" "}
              before proceeding.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
