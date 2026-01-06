import { writeContract } from '@wagmi/core';
import { config } from '@/config';
import { VOTING_V1_ABI } from '@/constant/abi';

const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
    "") as `0x${string}`;


export const vote = async (proposalId: bigint, voteChoice: boolean) => {
    return writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: VOTING_V1_ABI,
        functionName: 'vote',
        args: [proposalId, voteChoice],
    });
};

export const createProposal = async (description: string) => {
    return writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: VOTING_V1_ABI,
        functionName: 'createProposal',
        args: [description],
    });
};



export const addMember = async (memberAddress: `0x${string}`) => {
    return writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: VOTING_V1_ABI,
        functionName: 'addMember',
        args: [memberAddress],
    });
};

