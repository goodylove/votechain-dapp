// /src/hooks/useVoting.ts
import { useState, useCallback, useEffect } from "react";
import { useConnection } from "wagmi";
import { addMember, createProposal, vote } from "@/lib/writeContract";
import { useWaitForTransactionReceipt, useWatchContractEvent } from "wagmi";

import { toast } from "sonner";
import { VOTING_V1_ABI } from "@/constant/abi";
const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "") as `0x${string}`;

export const useVoting = () => {
  const { address } = useConnection();
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: transactionHash });

  // Watch for events related to current user
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: VOTING_V1_ABI,
    eventName: "Voted",
    onLogs: (logs) => {
      logs.forEach((log) => {
        const { proposalId, voter, support } = log.args;
        if (voter === address) {
          toast.success("Your vote was recorded!", {
            description: `You voted ${
              support ? "YES" : "NO"
            } on proposal ${proposalId}`,
          });
        }
      });
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: VOTING_V1_ABI,
    eventName: "ProposalCreated",
    onLogs: (logs) => {
      logs.forEach((log) => {
        const { proposalId, description } = log.args;
        toast.info("New proposal created!", {
          description: `ID: ${proposalId} - ${description}`,
        });
      });
    },
  });

  // Write functions with event integration
  const handleVote = useCallback(
    async (proposalId: bigint, voteChoice: boolean) => {
      if (!address) {
        toast.error("Connect your wallet first!");
        return;
      }

      setIsLoading(true);
      const toastId = toast.loading("Submitting your vote...");

      try {
        const hash = await vote(proposalId, voteChoice);
        setTransactionHash(hash);
        return hash;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        toast.error("Vote failed!", {
          id: toastId,
          description: errorMessage,
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [address]
  );

  const handleCreateProposal = useCallback(
    async (description: string) => {
      if (!address) {
        toast.error("Connect your wallet first!");
        return;
      }

      setIsLoading(true);
      const toastId = toast.loading("Creating proposal...");

      try {
        const hash = await createProposal(description);
        setTransactionHash(hash);
        toast.success("Proposal submitted!", {
          id: toastId,
          description: "Waiting for confirmation...",
        });
        return hash;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        toast.error("Proposal creation failed!", {
          id: toastId,
          description: errorMessage,
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [address]
  );

  const handleAddMember = useCallback(
    async (memberAddress: `0x${string}`) => {
      if (!address) {
        toast.error("Connect your wallet first!");
        return;
      }

      setIsLoading(true);
      const toastId = toast.loading("Adding member...");

      try {
        const hash = await addMember(memberAddress);
        setTransactionHash(hash);
        toast.success("Member addition submitted!", {
          id: toastId,
          description: "Waiting for confirmation...",
        });
        return hash;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        toast.error("Add member failed!", {
          id: toastId,
          description: errorMessage,
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [address]
  );

  // Effect to show confirmation toast
  useEffect(() => {
    if (isConfirmed && transactionHash) {
      toast.success("Transaction confirmed!", {
        description: "Your action was successfully completed.",
        action: {
          label: "View on Explorer",
          onClick: () =>
            window.open(
              `https://sepolia.etherscan.io/tx/${transactionHash}`,
              "_blank"
            ),
        },
      });
      setTransactionHash(null);
    }
  }, [isConfirmed, transactionHash]);

  return {
    // Write functions
    handleVote,
    handleCreateProposal,
    handleAddMember,

    // State
    isLoading: isLoading || isConfirming,
    isConfirming,
    isConfirmed,
    transactionHash,

    // User info
    userAddress: address,
  };
};
