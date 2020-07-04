import * as BitcoinjsLib from "bitcoinjs-lib";
import * as Bip39 from "bip39";

export enum AddressType {
  SegWit = "SegWit",
  NativeSegWit = "NativeSegWit",
}

export const defaultPathBIP49 = `m/49'/0'/0'/0/0`;
export const defaultPathBIP84 = `m/84'/0'/0'/0/0`;
const defaultMnemonicStrength = 256;

export const generateAccount = (
  addressType: AddressType,
  mnemonic: string,
  path: string
): {
  node: BitcoinjsLib.bip32.BIP32Interface;
  account: BitcoinjsLib.payments.Payment;
} | null => {
  try {
    const seed: Buffer = Bip39.mnemonicToSeedSync(mnemonic);
    const root: BitcoinjsLib.bip32.BIP32Interface = BitcoinjsLib.bip32.fromSeed(
      seed
    );

    const child: BitcoinjsLib.bip32.BIP32Interface = root.derivePath(path);

    let account: BitcoinjsLib.payments.Payment | null = null;

    switch (addressType) {
      case AddressType.SegWit: {
        account = BitcoinjsLib.payments.p2sh({
          redeem: BitcoinjsLib.payments.p2wpkh({ pubkey: child.publicKey }),
        });
        break;
      }
      case AddressType.NativeSegWit: {
        account = BitcoinjsLib.payments.p2wpkh({ pubkey: child.publicKey });
        break;
      }
      default: {
      }
    }

    if (account) {
      return {
        node: child,
        account,
      };
    }

    return null;
  } catch (err) {
    return null;
  }
};

export const generateMnemonic = (): string => {
  return Bip39.generateMnemonic(defaultMnemonicStrength);
};
