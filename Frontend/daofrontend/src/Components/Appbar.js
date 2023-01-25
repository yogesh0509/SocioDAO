import React, { useEffect, useRef, useState } from "react";
import { BigNumber, providers, utils } from "ethers";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Web3Modal from "web3modal";

export default function ButtonAppBar() {
  // const account = useAccount();
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);
  return (
    <Box sx={{ flexGrow: 1 }} className="appbox">
      <AppBar position="static" className="appbar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DAO
          </Typography>
          <Button
            color="inherit"
            variant="contained"
            className="butn"
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
          {/* <ConnectButton /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
