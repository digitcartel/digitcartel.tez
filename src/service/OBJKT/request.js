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
        active_auctions
        active_listing
        editions
        floor_price
        items
        owners
        volume_24h
        volume_total
      }
    }`,
  });
};

export const fetchObjktOffers = async (params) => {
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
          limit: ${params.limit}
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
