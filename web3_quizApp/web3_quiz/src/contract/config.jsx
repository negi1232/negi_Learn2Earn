import BloctoSDK from "@blocto/sdk";
const chainId= "0x13881"; // (required) chainId to be used
const rpc="https://rpc-mumbai.maticvigil.com/"; // (required for Ethereum) JSON RPC endpoint
const bloctoSDK = new BloctoSDK({
    ethereum: {
      chainId: "0x13881", // (required) chainId to be used
      rpc: "http://localhost:8545/" // (required for Ethereum) JSON RPC endpoint
    }
  });


const quiz_address="0x861C6ed1c4B517c374A1B772Ef59AB29B7d79950";
const token_address="0x7643c2413FF153165851BECe0DdE106D86A07e40";

export {chainId,rpc,bloctoSDK,quiz_address,token_address };
