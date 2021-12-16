import { Wallet, MultiClient, classNknClient } from "nkn";

interface Window {
  nkn: {
    // setPRNG: string;
    ready: Promise<void>;
    Client: classNknClient;
    MultiClient: typeof MultiClient;
    Wallet: typeof Wallet;
  };
}
