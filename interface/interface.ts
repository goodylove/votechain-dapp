export interface VoteChainContextType {
    address?: string;
    isConnecting: boolean;
    chain?: string;
    chainId?: number;
    connectWallet: () => void;
    setMemberAddresses: (addresses: string[]) => void;
    userRole: "guest" | "owner" | "member";
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
}

export interface Proposal {
    description: string;
    yesCount: bigint;
    noCount: bigint;
    executed: boolean;
}