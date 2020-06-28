import * as BitcoinjsLib from "bitcoinjs-lib";
import * as Bip39 from "bip39";

export const generateAccount = (mnemonic: string): void => {
  const seed: Buffer = Bip39.mnemonicToSeedSync(mnemonic);
  const node: BitcoinjsLib.bip32.BIP32Interface = BitcoinjsLib.bip32.fromSeed(
    seed
  );
};

export const generateMnemonic = (): string => {
  return Bip39.generateMnemonic();
};
