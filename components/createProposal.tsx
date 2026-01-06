"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileText, Sparkles } from "lucide-react";
import Confetti from "react-confetti";

interface CreateProposalProps {
  onCreateProposal: (description: string) => void;
}

export function CreateProposal({ onCreateProposal }: CreateProposalProps) {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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

    setIsSubmitting(true);
    // Simulate transaction
    setTimeout(() => {
      onCreateProposal(description);
      setDescription("");
      setIsSubmitting(false);
      setShowConfetti(true);
      toast.success("Proposal created successfully!");
      setTimeout(() => setShowConfetti(false), 5000);
    }, 1500);
  };

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      <Card className="p-6 bg-black border border-slate-700 backdrop-blur-sm font-inter">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Create New Proposal
            </h2>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="proposal-description"
              className="text-sm text-gray-300 block"
            >
              Proposal Description
            </label>
            <Textarea
              id="proposal-description"
              placeholder="Describe what you're proposing to the group..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-500 resize-none"
              disabled={isSubmitting}
              maxLength={maxChars}
            />
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Be clear and specific about your proposal</span>
              <span
                className={
                  description.length > maxChars * 0.9 ? "text-yellow-400" : ""
                }
              >
                {description.length} / {maxChars}
              </span>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white font-medium py-4 px-6 rounded-xl hover:bg-blue-600 transition cursor-pointer"
            size="lg"
          >
            {isSubmitting ? "Submitting..." : "Submit Proposal"}
          </Button>
        </div>
      </Card>
    </>
  );
}
