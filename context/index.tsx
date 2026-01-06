"use client";

import { VOTING_V1_ABI } from "@/constant/abi";
import { ReadContractData } from "@/constant/dummyDats";
import { Proposal, VoteChainContextType } from "@/interface/interface";
import { useAppKit } from "@reown/appkit/react";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { writeContractSync } from "viem/actions";
import { useConnection, useReadContracts } from "wagmi";

const VoteChainContext = createContext<VoteChainContextType | undefined>(
  undefined
);

const VoteChainProvider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnecting, chain, chainId } = useConnection();
  const { open: connectWallet } = useAppKit();
  const [memberAddresses, setMemberAddresses] = useState<string[]>([]);

  const { data, isLoading } = useReadContracts({
    contracts: ReadContractData(memberAddresses),
  });


  const userRole = useMemo((): "guest" | "owner" | "member" => {
    if (!data || !address) return "guest";

    const owner = data[0].result as `0x${string}`;
    const isMember = data[1]?.result;

    if (address.toLowerCase() === owner.toLowerCase()) {
      return "owner";
    }

    if (isMember) {
      return "member";
    }

    return "guest";
  }, [data, address]);

  const getAllProposal = useMemo(() => {
    const rawProposals = data ? (data[3]?.result as Proposal[]) || [] : [];

    if (rawProposals.length === 0) {
      return {
        proposals: [],
        stats: {
          totalYes: 0,
          totalNo: 0,
          totalVotes: 0,
          proposalCount: 0,
        },
      };
    }

    // Calculate totals using reduce
    const { totalYes, totalNo, proposals } = rawProposals.reduce(
      (acc, curr, index) => {
        const yesVotes = Number(curr.yesCount);
        const noVotes = Number(curr.noCount);

        return {
          totalYes: acc.totalYes + yesVotes,
          totalNo: acc.totalNo + noVotes,
          proposals: [
            ...acc.proposals,
            {
              id: index,
              description: curr.description,
              yesVotes,
              noVotes,
              executed: curr.executed,
              totalVotes: yesVotes + noVotes,
            },
          ],
        };
      },
      { totalYes: 0, totalNo: 0, proposals: [] as any[] }
    );

    const totalVotes = totalYes + totalNo;

    return {
      proposals,
      stats: {
        totalYes,
        totalNo,
        totalVotes,
        proposalCount: proposals.length,

        yesPercentage: totalVotes > 0 ? (totalYes / totalVotes) * 100 : 0,
        noPercentage: totalVotes > 0 ? (totalNo / totalVotes) * 100 : 0,
      },
    };
  }, [data]);

  const getMembersCount = useMemo(() => {
    const count = data ? (data[4]?.result as bigint) || BigInt(0) : BigInt(0);
    return Number(count);
  }, [data]);

  const value = useMemo(() => {
    return {
      address,
      isConnecting,
      chain: chain?.name,
      chainId,
      connectWallet,
      setMemberAddresses,
      userRole,
      getAllProposal,
      getMembersCount,
      isLoading,
    };
  }, [
    isLoading,
    address,
    isConnecting,
    chain,
    chainId,
    connectWallet,
    setMemberAddresses,
    userRole,
    getAllProposal,
    getMembersCount,
  ]);

  return (
    <VoteChainContext.Provider value={value}>
      {children}
    </VoteChainContext.Provider>
  );
};
export default VoteChainProvider;

export const useVoteChain = () => {
  const context = React.useContext(VoteChainContext);

  if (context === undefined) {
    throw new Error("useVoteChain must be used within a VoteChainProvider");
  }
  return context;
};
