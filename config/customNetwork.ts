import { defineChain } from '@reown/appkit/networks';

export const zkSyncSepoliaTestnet = defineChain({
    id: 300,
    caipNetworkId: 'eip155:300',
    chainNamespace: 'eip155',
    name: 'zkSync Era Sepolia Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://sepolia.era.zksync.dev'] },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://sepolia.explorer.zksync.io' },
    },
});
