import { VOTING_V1_ABI } from "./abi";

export const SampleProposals = [
  {
    id: 1,
    description:
      "Should we allocate 50 ETH to the community treasury for development?",
    yesVotes: 15,
    noVotes: 5,
    executed: false,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    description:
      "Implement a new governance token distribution model for early contributors",
    yesVotes: 8,
    noVotes: 12,
    executed: false,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    description:
      "Update the voting period from 7 days to 5 days to increase efficiency",
    yesVotes: 20,
    noVotes: 3,
    executed: true,
    timestamp: "1 day ago",
  },
];

export const ReadContractData = (memberAddresses: string[]) => [
      {
        address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
          "") as `0x${string}`,
        abi: VOTING_V1_ABI,
        functionName: "owner",
      },

      {
        address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
          "") as `0x${string}`,
        abi: VOTING_V1_ABI,
        functionName: "members",
        args: memberAddresses,
      },

      {
        address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
          "") as `0x${string}`,
        abi: VOTING_V1_ABI,
        functionName: "getProposal",
        args: [0],
      },
      {
        address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
          "") as `0x${string}`,
        abi: VOTING_V1_ABI,
        functionName: "getAllProposals",
      },
      {
        address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
          "") as `0x${string}`,
        abi: VOTING_V1_ABI,
        functionName: "getMemberCount",
      },
    ]
