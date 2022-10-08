import { gql } from "@apollo/client";
import { TEZDOM } from "./client";

export const fetchTezDomOffers = async (params) => {
  return await TEZDOM.query({
    query: gql`query fetchOffers {
      offers(
        where: { 
          domainName: {
            in: ${JSON.stringify(params.lookFor)} 
          }
          state: {
            in: ACTIVE
          }
        }
        order: { direction:ASC field:PRICE } 
        ${params.more ? `after: "${params.hash}"` : ""}
        ${params.less ? `before: "${params.hash}"` : ""}
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        items {
          expiresAtUtc
          domain{
            name
            owner
          }
          tokenContract
          sellerAddress
          tokenId
          price
          state
        }
      }
    }`,
  });
};

export const fetchTezDomFloor = async (params) => {
  return await TEZDOM.query({
    query: gql`query fetchFloor {
      offers(
        where: { 
          domainName: {
            in: ${JSON.stringify(params.lookFor)} 
          }
          state: {
            in: ACTIVE
          }
        }
        order: { direction:ASC field:PRICE } 
      ) {
        items {
          price
        }
      }
    }`,
  });
};

export const fetchDomain = async (params) => {
  return await TEZDOM.query({
    query: gql`{
      domain(name: "${params.lookFor}"){
        id
        owner
        tokenId
        name
      }
    }`,
  });
};

export const fetchAddress = async (params) => {
  return await TEZDOM.query({
    query: gql`{
      reverseRecord(address: "${params.lookFor}") {
        domain {
          name
        }
      }
    }`,
  });
};

export const fetchOwned = async (params) => {
  return await TEZDOM.query({
    query: gql`{
      domains(
        where: { 
          owner: {
            equalTo: "${params.owner}"
          }
        }
        order: { direction:ASC field:NAME } 
        ${params.more ? `after: "${params.hash}"` : ""}
        ${params.less ? `before: "${params.hash}"` : ""}
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        items {
          name
          tokenId
        }
      }
    }`,
  });
};

export const fetchListing = async (params) => {
  return await TEZDOM.query({
    query: gql`{
      offers(
        where: { domainName: { in: ["${params.lookFor}"] }, state: { in: ACTIVE } }
        order: { direction: ASC, field: PRICE }
      ) {
        items {
          price
          sellerAddress
          tokenContract
          tokenId
        }
      }
    }`,
  });
};

export const fetchTezDomLastSales = async (params) => {
  return await TEZDOM.query({
    query: gql`
      query fetchLastSales {
        events(
          where: { type: { in: OFFER_EXECUTED_EVENT } }
          order: { direction: DESC, field: TIMESTAMP }
        ) {
          items {
            ... on OfferExecutedEvent {
              domainName
              price
            }
          }
        }
      }
    `,
  });
};

export const fetchTezDomLastReg = async (params) => {
  return await TEZDOM.query({
    query: gql`
      query fetchLastReg {
        events(
          where: { type: { in: DOMAIN_BUY_EVENT } }
          order: { direction: DESC, field: TIMESTAMP }
        ) {
          items {
            ... on DomainBuyEvent {
              domainName
              price
            }
          }
        }
      }
    `,
  });
};

export const fetchTezDomEventFor = async (params) => {
  return await TEZDOM.query({
    query: gql`
      query fetchLastReg {
        events(
          where: { domainName: { equalTo: "${params.lookFor}" } }
          order: { direction: DESC, field: TIMESTAMP }
          ${params.more ? `after: "${params.hash}"` : ""}
          ${params.less ? `before: "${params.hash}"` : ""}
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
          items {
            ... on DomainBuyEvent {
              price
              type
              operationGroupHash
            }
            ... on DomainClaimEvent {
              type
              operationGroupHash
            }
            ... on DomainRenewEvent {
              type
              durationInDays
              operationGroupHash
            }
            ... on DomainTransferEvent {
              type
              newOwner
              sourceAddress
              newOwnerReverseRecord {
                domain {
                  name
                }
              }
              sourceAddressReverseRecord {
                domain {
                  name
                }
              }
              operationGroupHash
            }
            ... on OfferPlacedEvent{
              price
              type
              operationGroupHash
            }
            ... on OfferExecutedEvent {
              price
              type
              operationGroupHash
            }
            ... on OfferRemovedEvent {
              type
              operationGroupHash
            }
            ... on OfferUpdatedEvent {
              price
              type
              operationGroupHash
            }
            ... on AuctionBidEvent {
              type
              bidAmount
            }
            ... on AuctionEndEvent {
              type
              winningBid
            }
            ... on AuctionSettleEvent {
              type
              winningBid
            }
            ... on AuctionWithdrawEvent {
              type
              sourceAddress
              sourceAddressReverseRecord {
                domain {
                  name
                }
              }
            }
          }
        }
      }
    `,
  });
};
