export interface VoteChainContextType {
    address?: string;
    isConnecting: boolean;
    chain?: string;
    chainId?: number;
    connectWallet: () => void;
    setMemberAddresses: (addresses: string[]) => void;
    userRole: "Guest" | "Owner" | "Member";
    getAllProposal: {
        proposals: {
            description: string;
            yesVotes: number;
            noVotes: number;
            executed: boolean;
            totalVotes: number;
        }[];
        stats: {
            totalYes: number;
            totalNo: number;
            totalVotes: number;
            proposalCount: number;

            yesPercentage?: number | undefined;
            noPercentage?: number | undefined;
        };
    };
    getMembersCount: number;
    isLoading: boolean;
    refetchData: () => void
}

export interface Proposal {
    description: string;
    yesCount: bigint;
    noCount: bigint;
    executed: boolean;
}