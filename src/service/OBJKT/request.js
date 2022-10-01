import { gql } from "@apollo/client";
import { OBJKT } from "./client";

export const fetchObjktCollection = async (params) => {
  return await OBJKT.query({
    query: gql`query fetchContract {
      fa(
        where: {
          contract: {
            _eq: ${params.contract}
          }
        }
      ) {
        items
        owners
      }
    }`,
  });
};

export const fetchObjktOffersSent = async (params) => {
  return await OBJKT.query({
    query: gql`query fetchOffers {
      offer(
        where: {
          buyer_address: {
            _eq: "${params.owner}"
          }
          status: {_eq: "active"}
          fa_contract: {_eq: "${params.contract}"}
        }
      ) {
        id
        price
        status
        token {
          token_id
          name
        }
        bigmap_key
      }
    }`,
  });
};

export const fetchObjktOffersReceived = async (params) => {
  return await OBJKT.query({
    query: gql`
      query fetchOffers {
        offer(
          where: {
            token: {
              holders: {
                holder_address: { _eq: "${params.owner}" }
              }
            }
            status: {_eq: "active"}
            fa_contract: {_eq: "${params.contract}"}
            buyer_address: {_neq: "${params.owner}"}
          }
        ) {
          id
          price
          status
          token {
            token_id
            name
          }
          bigmap_key
        }
      }
    `,
  });
};

export const fetchObjktFor = async (params) => {
  return await OBJKT.query({
    query: gql`query fetchFa {
      fa(
        where: {
          contract: {
            _eq: ${params.contract}
          }
        }
      ) {
        tokens(
          where: {
            name: {
              _in: ${JSON.stringify(params.lookFor)}
            }
          }
        ) {
          name
          highest_offer
          lowest_ask
          fulfilled_asks {
            price
          }
          token_id
          offers {
            buyer_address
            floor_offer
            price
          }
        }
      }
    }`,
  });
};

export const fetchObjktFloor = async (params) => {
  return await OBJKT.query({
    query: gql`query fetchFa {
      fa(
        where: {
          contract: {
            _eq: ${params.contract}
          }
        }
      ) {
        tokens(
          where: {
            name: {
              _in: ${JSON.stringify(params.lookFor)}
            }
          }
          order_by: {lowest_ask: asc}
          offset: ${params.offset}
          limit: 10
        ) {
          lowest_ask
        }
      }
    }`,
  });
};

export const fetch10kSupplyReq = async (params) => {
  return await OBJKT.query({
    query: gql`query fetchContract {
      fa(
        where: {
          contract: {
            _eq: ${params.contract}
          }
        }
      ) {
        tokens(
          where: {
            name: {
              _in: ${JSON.stringify(params.lookFor)}
            }
          }, 
          order_by: {
            name: asc
          }, 
          offset: ${params.offset},
          limit: 500
        ) {
          name
        }
      }
    }`,
  });
};

export const fetch999HoldersReq = async (params) => {
  return await OBJKT.query({
    query: gql`query fetchContract {
      fa(
        where: {
          contract: {
            _eq: ${params.contract}
          }
        }
      ) {
        tokens(
          where: {
            name: {
              _in: ${JSON.stringify(params.lookFor)}
            }
          }, 
          order_by: {
            name: asc
          }, 
          offset: ${params.offset},
          limit: 1000
        ) {
          name
          holders {
            holder_address
          }
        }
      }
    }`,
  });
};
