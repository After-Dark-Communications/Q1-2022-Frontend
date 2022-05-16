import React, { useEffect } from "react";
import logo from "./logo.svg";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const Metamask = () => {
  const Web3Api = useMoralisWeb3Api();
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();
  const fetchNFTs = async () => {
    const userEthNFTs = await Web3Api.account.getNFTs({
      chain: "rinkeby",
      address: "0xacF3930308F3D1494b7d5e852Bd9718A5C0Bcb72",
    });
    console.log(userEthNFTs);
    const userEthNFT2 = await Web3Api.account.getNFTs({
      chain: "rinkeby",
      address: "0x7b439a1C434c288fEA5DC7433C8113b127B1E1ac",
    });
    console.log(userEthNFT2);
    // get testnet NFTs for user
    const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
      chain: "eth",
      address: "0x7b439a1C434c288fEA5DC7433C8113b127B1E1ac",
    });
    console.log(testnetNFTs);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNFTs();
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  return (
    <div>
      <h1>Web 3 wallet connect</h1>
      <button onClick={login}> Metamask Login</button>
      <button onClick={logOut} disabled={isAuthenticating}>
        Logout
      </button>
    </div>
  );
};
export default Metamask;
