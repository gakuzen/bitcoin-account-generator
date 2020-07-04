import * as Bip39 from "bip39";

import {
  AddressType,
  generateMnemonic,
  generateAccount,
  generateMultiSigAccount,
} from "./bitcoin";

describe("bitcoin utils", () => {
  it("should generate valid mnemonic", () => {
    for (let i = 0; i < 100; i++) {
      const mnemonic: string = generateMnemonic();

      expect(Bip39.validateMnemonic(mnemonic)).toEqual(true); // rely on the validation of bip39 library
    }
  });

  const mnemonic1: string =
    "build rail seat drop smooth battle faith claim swarm bike moment involve trim wood general open modify coast predict buddy craft clarify obscure own";
  const mnemonic2: string =
    "enact luxury struggle speed nothing crime wonder outer mistake six pink pave document medal access release distance shoot moon bronze kiwi link flock cushion";

  it("should generate SegWit address", () => {
    const testCases = [
      {
        mnemonic: mnemonic1,
        path: "m/49'/0'/0'/0/0",
        address: "3L8ULV881SRqrgSs56pEXR1V5GGzg5iRFT",
      },
      {
        mnemonic: mnemonic1,
        path: "m/49'/0'/0'/0/1",
        address: "3P9gHZuWh35NKmwRznvddxRZwVY7kMXniH",
      },
      {
        mnemonic: mnemonic1,
        path: "m/49'/0'/0'/0/2",
        address: "3KZ2AsxEMbUBBQNhzBv5yq6mnaq3uARbnr",
      },
      {
        mnemonic: mnemonic2,
        path: "m/49'/0'/0'/0/0",
        address: "3E8K1eW9k9Hq3LuMRCkyAEXwta7kUkaj2x",
      },
      {
        mnemonic: mnemonic2,
        path: "m/49'/0'/0'/0/1",
        address: "31uT9LxnSodQRFDvE6juwnZAP6RWfUUcRm",
      },
      {
        mnemonic: mnemonic2,
        path: "m/49'/0'/0'/0/2",
        address: "39yfQxkaYX38si5vJSm77dsXp61jq6sUNw",
      },
    ];

    testCases.forEach((testCase) => {
      const { payment } =
        generateAccount(AddressType.SegWit, testCase.mnemonic, testCase.path) ||
        {};

      expect(payment?.address).toEqual(testCase.address);
    });
  });

  it("should generate native SegWit address", () => {
    const testCases = [
      {
        mnemonic: mnemonic1,
        path: "m/84'/0'/0'/0/0",
        address: "bc1qtevrz8s8xktn7f2yu66gdgsyfrggchxfnpcfay",
      },
      {
        mnemonic: mnemonic1,
        path: "m/84'/0'/0'/0/1",
        address: "bc1q9wq7wysvsnk4kylwf94lm7slraw2h8mrtx377l",
      },
      {
        mnemonic: mnemonic1,
        path: "m/84'/0'/0'/0/2",
        address: "bc1qtf2x4yulw33745p0huykxxwmtg75xs5m6twgw8",
      },
      {
        mnemonic: mnemonic2,
        path: "m/84'/0'/0'/0/0",
        address: "bc1q8nnc0ugcgkcvwtmzzgu9dtrnjx6glqa8f7hfnh",
      },
      {
        mnemonic: mnemonic2,
        path: "m/84'/0'/0'/0/1",
        address: "bc1quw82t4f4udn22gcvcqkk0as65qpszn44uvvq24",
      },
      {
        mnemonic: mnemonic2,
        path: "m/84'/0'/0'/0/2",
        address: "bc1qkra9sqhp0yvq6ekxwt4krjw77srefnd7nmdcyl",
      },
    ];

    testCases.map((testCase) => {
      const { payment } =
        generateAccount(
          AddressType.NativeSegWit,
          testCase.mnemonic,
          testCase.path
        ) || {};

      expect(payment?.address).toEqual(testCase.address);
    });
  });

  it("should generate n-of-m multi-sig P2SH address", () => {
    const testCases = [
      {
        publicKeys: [
          "0241965adac60853110dbca7aa1322d3891b9080f8fcc981b32ff216ebda032f36",
        ],
        n: 1,
        address: "3NFwkkZgNXJwRLhD8ZyktMQsff4n3LwX9G",
      },
      {
        publicKeys: [
          "0241965adac60853110dbca7aa1322d3891b9080f8fcc981b32ff216ebda032f36",
          "03e8879ffc3eaac1f137e9e787f11a62bc63c237633192bac02aedcacffbbe900e",
        ],
        n: 1,
        address: "3GRW2VT3fUqyLYhKcFR3Ac1H5Yh4gwtUUT",
      },
      {
        publicKeys: [
          "0241965adac60853110dbca7aa1322d3891b9080f8fcc981b32ff216ebda032f36",
          "03e8879ffc3eaac1f137e9e787f11a62bc63c237633192bac02aedcacffbbe900e",
        ],
        n: 2,
        address: "32vLbnsYF15Rzf2ifY8WCLe67uYxy7VHpc",
      },
      {
        publicKeys: [
          "0241965adac60853110dbca7aa1322d3891b9080f8fcc981b32ff216ebda032f36",
          "03e8879ffc3eaac1f137e9e787f11a62bc63c237633192bac02aedcacffbbe900e",
          "02278190d8372bf5da23db6fdd618a73b80fe368f65d0a54e4bd94cbec6f8342de",
        ],
        n: 1,
        address: "3BBLvBGzct54npa5eLh9wJYLws7qPNXuWK",
      },
      {
        publicKeys: [
          "0241965adac60853110dbca7aa1322d3891b9080f8fcc981b32ff216ebda032f36",
          "03e8879ffc3eaac1f137e9e787f11a62bc63c237633192bac02aedcacffbbe900e",
          "02278190d8372bf5da23db6fdd618a73b80fe368f65d0a54e4bd94cbec6f8342de",
        ],
        n: 2,
        address: "3FBXrpS1xT8cN7ZWfNn8y4JRne4YVn8BJj",
      },
      {
        publicKeys: [
          "0241965adac60853110dbca7aa1322d3891b9080f8fcc981b32ff216ebda032f36",
          "03e8879ffc3eaac1f137e9e787f11a62bc63c237633192bac02aedcacffbbe900e",
          "02278190d8372bf5da23db6fdd618a73b80fe368f65d0a54e4bd94cbec6f8342de",
        ],
        n: 3,
        address: "39gJpNVZzwPZDr8Dorqzc5cnfhorXrBFDg",
      },
    ];

    testCases.map((testCase) => {
      const { address } =
        generateMultiSigAccount(testCase.publicKeys, testCase.n) || {};

      expect(address).toEqual(testCase.address);
    });
  });
});
