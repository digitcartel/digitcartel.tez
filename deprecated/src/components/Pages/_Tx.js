import { packDataBytes } from "@taquito/michel-codec";
import { Schema } from "@taquito/michelson-encoder";
import { MichelsonMap, OpKind } from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";
import { getLabel, generateNonce } from "@tezos-domains/core";
import { fetchOffer } from "../../utils/tezosApiRequest";

export const BuyTX = async (context) => {
  const _Tezos = context.props.props.context.state._Tezos;
  const contract = await _Tezos.wallet.at(
    "KT1Evxe1udtPDGWrkiRsEN3vMDdB6gNpkMPM"
  );

  context.setState(
    {
      _txPending: true,
    },
    async () => {
      let i = 0;
      let result = [];
      let price = 0;
      while (i < context.state._SelectBuy.length) {
        price += parseInt(context.state._SelectBuy[i].price);
        result.push({
          kind: OpKind.TRANSACTION,
          ...contract.methods
            .execute_offer(
              context.state._SelectBuy[i].tokenContract,
              context.state._SelectBuy[i].tokenId,
              context.state._SelectBuy[i].domain.owner
            )
            .toTransferParams({
              amount: context.state._SelectBuy[i].price,
              mutez: true,
            }),
        });
        i++;
      }

      result.push({
        kind: OpKind.TRANSACTION,
        to: "tz1X4g93kKkH1hkRAnenzUkJe44U61AQoQn6",
        amount: `${(2 * parseInt(price)) / 100}`,
        mutez: true,
      });

      try {
        const send = _Tezos.wallet.batch([...result]).send();

        context.setState(
          {
            _txEntry: "",
          },
          () => {
            context.setState({
              _SelectBuy: [],
              _Selected: false,
              _Selector: [],
              _txEntry: [],
              _txPending: false,
            });
          }
        );
      } catch (e) {
        console.log(e);
        context.setState({
          _txPending: false,
          _batchTxInput: "",
        });
        fetchOffer({ context: context, less: false, more: false, hash: 0 });
      }
    }
  );
};

export const TransferTx = async (context) => {
  const _Tezos = context.props.props.context.state._Tezos;
  const contract = await _Tezos.wallet.at(
    "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS"
  );

  context.setState(
    {
      _txPending: true,
    },
    async () => {
      let i = 0;
      let result = [];
      while (i < context.state._SelectOwned.length) {
        result.push({
          to_: context.state._batchTxInput,
          token_id: context.state._SelectOwned[i].tokenId,
          amount: 1,
        });

        i++;
      }

      try {
        const send = await contract.methods
          .transfer([
            {
              from_: context.state._account,
              txs: result,
            },
          ])
          .send();

        context.setState(
          {
            _txEntry: "",
          },
          () => {
            context.setState({
              _SelectOwned: [],
              _Selected: false,
              _Selector: [],
              _txEntry: [],
              _txPending: false,
            });
          }
        );
      } catch (e) {
        context.setState({
          _txPending: false,
          _batchTxInput: "",
        });
        fetchOffer({ context: context, less: false, more: false, hash: 0 });
      }
    }
  );
};

export const ReverseTx = async (context) => {
  const _Tezos = context.props.props.context.state._Tezos;
  const contract = await _Tezos.wallet.at(
    "KT1H1MqmUM4aK9i1833EBmYCCEfkbt6ZdSBc"
  );

  context.setState(
    {
      _txPending: true,
    },
    async () => {
      let i = 0;
      let result = [];
      while (i < context.state._SelectOperator.length) {
        let a = new MichelsonMap();
        result.push({
          kind: OpKind.TRANSACTION,
          ...contract.methods
            .update_record(
              char2Bytes(context.state._SelectOperator[i].name),
              context.state._account,
              context.state._batchTxInput,
              a
            )
            .toTransferParams(),
        });
        i++;
      }

      try {
        const send = _Tezos.wallet.batch([...result]).send();
        context.setState(
          {
            _txEntry: "",
          },
          () => {
            context.setState({
              _SelectOperator: [],
              _Selected: false,
              _Selector: [],
              _txEntry: [],
              _txPending: false,
            });
          }
        );
      } catch (e) {
        context.setState({
          _txPending: false,
          _batchTxInput: "",
        });
        fetchOffer({ context: context, less: false, more: false, hash: 0 });
      }
    }
  );
};

export const RegisterTx = async (context) => {};

export const ListTx = async (context, price) => {
  const _Tezos = context.props.props.context.state._Tezos;
  const contractA = await _Tezos.wallet.at(
    "KT1Evxe1udtPDGWrkiRsEN3vMDdB6gNpkMPM"
  );
  const contractB = await _Tezos.wallet.at(
    "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS"
  );

  context.setState(
    {
      _txPending: true,
    },
    async () => {
      let i = 0;
      let result = [];
      while (i < context.state._SelectList.length) {
        result.push({
          kind: OpKind.TRANSACTION,
          ...contractA.methods
            .place_offer(
              "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS",
              context.state._SelectList[i].tokenId,
              price * 10 ** 6,
              new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            )
            .toTransferParams(),
        });
        result.push({
          kind: OpKind.TRANSACTION,
          ...contractB.methods
            .update_operators([
              {
                add_operator: {
                  owner: context.state._account,
                  operator: "KT1Evxe1udtPDGWrkiRsEN3vMDdB6gNpkMPM",
                  token_id: context.state._SelectList[i].tokenId,
                },
              },
            ])
            .toTransferParams(),
        });
        i++;
      }

      try {
        const send = _Tezos.wallet.batch([...result]).send();

        context.setState(
          {
            _txEntry: "",
          },
          () => {
            context.setState({
              _SelectList: [],
              _Selected: false,
              _Selector: [],
              _txEntry: [],
              _txPending: false,
            });
          }
        );
      } catch (e) {
        console.log(e);
        context.setState({
          _txPending: false,
          _batchTxInput: "",
        });
        fetchOffer({ context: context, less: false, more: false, hash: 0 });
      }
    }
  );
};
