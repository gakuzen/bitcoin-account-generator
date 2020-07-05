# Bitcoin account generator

Supports the following:

- Hierarchical Deterministic (HD) Segregated Witness (SegWit) account
- N-of-M Multisignature (multisig) Pay-To-Script-Hash (P2SH) account

| Bank / Bitcoin Account | Identifier     | Access Key  |
| ---------------------- | -------------- | ----------- |
| Bank                   | account number | password    |
| Bitcoin                | address        | private key |

## TODO

- Enhance form validation by using Yup and Formik
- Detect Internet connection changes in real-time
- Test Bitcoin related utilities by multiple libraries

## How to run locally

Run `npm start` in the project directory.

## How to use locally

After running locally, open http://localhost:3000 to use it in the browser.

## How to test locally

Run `npm run test` in the project directory.

## How to build

Run `npm run build` in the project directory to build the app for production to the `build` folder.

## Libraries used

- `bitcoinjs-lib`
- `bip39`
- `bootstrap`
- `react-bootstrap`

PS. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
