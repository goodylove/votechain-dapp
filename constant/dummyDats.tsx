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
    address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "") as `0x${string}`,
    abi: VOTING_V1_ABI,
    functionName: "owner",
  },

  {
    address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "") as `0x${string}`,
    abi: VOTING_V1_ABI,
    functionName: "members",
    args: memberAddresses,
  },

  {
    address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "") as `0x${string}`,
    abi: VOTING_V1_ABI,
    functionName: "getProposal",
    args: [0],
  },
  {
    address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "") as `0x${string}`,
    abi: VOTING_V1_ABI,
    functionName: "getAllProposals",
  },
  {
    address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "") as `0x${string}`,
    abi: VOTING_V1_ABI,
    functionName: "getMemberCount",
  },
];

export const colorConfig = {
  purple: {
    bg: "#f4f7ff",
    border: "#8b5cf6",
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
    titleColor: "#6b7280",
    valueColor: "#7c3aed",
    accentColor: "#7c3aed",
    hoverShadow: "0 10px 15px -3px rgba(124, 58, 237, 0.1)",
  },
  blue: {
    bg: "#eff6ff",
    border: "#3b82f6",
    iconBg: "#dbeafe",
    iconColor: "#2563eb",
    titleColor: "#6b7280",
    valueColor: "#2563eb",
    accentColor: "#2563eb",
    hoverShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.1)",
  },
  green: {
    bg: "#f0fdf4",
    border: "#10b981",
    iconBg: "#d1fae5",
    iconColor: "#059669",
    titleColor: "#6b7280",
    valueColor: "#059669",
    accentColor: "#059669",
    hoverShadow: "0 10px 15px -3px rgba(5, 150, 105, 0.1)",
  },
  pink: {
    bg: "#fdf2f8",
    border: "#ec4899",
    iconBg: "#fce7f3",
    iconColor: "#db2777",
    titleColor: "#6b7280",
    valueColor: "#db2777",
    accentColor: "#db2777",
    hoverShadow: "0 10px 15px -3px rgba(219, 39, 119, 0.1)",
  },
};
