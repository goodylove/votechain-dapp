"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PenLine, Info, ArrowUpRight } from "lucide-react";
import Confetti from "react-confetti";
import { useWriteToContractHook } from "@/hooks/useWrite";

export function CreateProposal() {
  const [description, setDescription] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { handleCreateProposal, isLoading, isConfirmed } =
    useWriteToContractHook();

  const maxChars = 500;

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast.error("Proposal description cannot be empty");
      return;
    }

    if (description.length > maxChars) {
      toast.error(`Proposal description cannot exceed ${maxChars} characters`);
      return;
    }

    await handleCreateProposal(description);
    setShowConfetti(true);

    if (isConfirmed) {
      setDescription("");
    }
  };

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden  w-full mx-auto">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-md border border-gray-200 shadow-sm text-slate-600">
              <PenLine className="w-4 h-4" />
            </div>
            <h2 className="font-semibold text-slate-800 text-sm">
              New Proposal Draft
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-white px-2 py-1 rounded border border-gray-100">
            <span>PROPOSAL-ID: AUTO</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <label
              htmlFor="proposal-description"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Description
            </label>

            <div className="relative">
              <Textarea
                id="proposal-description"
                placeholder="Describe the initiative clearly. What is the goal? What funds are required?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px] bg-white border-gray-200 text-slate-900 placeholder:text-slate-400 resize-y focus-visible:ring-slate-900/20 text-base leading-relaxed p-4 rounded-lg"
                disabled={isLoading}
                maxLength={maxChars}
              />

              <div className="absolute bottom-3 right-3">
                <span
                  className={`text-xs font-mono px-2 py-1 rounded-md ${
                    description.length > maxChars * 0.9
                      ? "bg-red-50 text-red-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {description.length}/{maxChars}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900">
                Before you submit
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Proposals cannot be edited once submitted. The voting period
                will begin immediately and last for 3 days. A quorum of 50% is
                required.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-slate-900 cursor-pointer hover:bg-slate-800 text-white font-medium h-11 px-8 rounded-lg transition-all shadow-lg shadow-slate-200"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Publishing...
                </span>
              ) : (
                <span className="flex items-center">
                  Submit Proposal{" "}
                  <ArrowUpRight className="ml-2 w-4 h-4 opacity-70" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
