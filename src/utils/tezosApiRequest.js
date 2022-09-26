export const fetchOwned = ({ context, less, more, hash }) => {
  const getOwneds = async (e) => {
    let OwnedData = await fetch("https://api.tezos.domains/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
            domains(
              where: { 
                owner: {
                  equalTo: ${JSON.stringify(e)} 
                }
              }
              order: { direction:ASC field:NAME } 
              ${more ? `after: "${hash}"` : ""}
              ${less ? `before: "${hash}"` : ""}
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
      }),
    });

    OwnedData = await OwnedData.json();
    if (OwnedData.data) {
      return OwnedData.data;
    }
  };

  getOwneds(context.state._account).then((e) => {
    context.setState({
      _Owned: e,
    });
  });
};

export const fetchOperator = ({ context, less, more, hash }) => {
  const getOperators = async (e) => {
    let OperatorData = await fetch("https://api.tezos.domains/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
            domains(
              where: { 
                owner: {
                  equalTo: ${JSON.stringify(e)} 
                }
                address: {
                  notEqualTo: ${JSON.stringify(e)}
                }
              }
              order: { direction:ASC field:NAME } 
              ${more ? `after: "${hash}"` : ""}
              ${less ? `before: "${hash}"` : ""}
            ) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
              }
              items {
                name
                owner
                address
                tokenId
              }
            }
          }`,
      }),
    });

    OperatorData = await OperatorData.json();
    if (OperatorData.data) {
      return OperatorData.data;
    }
  };

  getOperators(context.state._account).then((e) => {
    context.setState({
      _Operator: e,
    });
  });
};

export const fetchListing = ({ context, less, more, hash }) => {
  const getListings = async (e) => {
    let ListingData = await fetch("https://api.tezos.domains/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
            domains(
              where: { 
                owner: {
                  equalTo: ${JSON.stringify(context.state._account)} 
                }
                name: {
                  in: ${JSON.stringify(e)}
                }
              }
              order: { direction:ASC field:NAME } 
              ${more ? `after: "${hash}"` : ""}
              ${less ? `before: "${hash}"` : ""}
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
      }),
    });

    ListingData = await ListingData.json();
    if (ListingData.data) {
      return ListingData.data;
    }
  };

  getListings(
    context.state._999Base.base.concat(
      context.state._10kBase.base,
      context.state._100kBase.base
    )
  ).then((e) => {
    context.setState({
      _Listing: e,
    });
  });
};

export const fetchOffer = ({ context, less, more, hash }) => {
  context.setState({
    _floor: 0,
  });
  const getOffers = async (e) => {
    let OfferData = await fetch("https://api.tezos.domains/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
            offers(
              where: { 
                domainName: {
                  in: ${JSON.stringify(e)} 
                }
                state: {
                  in: ACTIVE
                }
              }
              order: { direction:ASC field:PRICE } 
              ${more ? `after: "${hash}"` : ""}
              ${less ? `before: "${hash}"` : ""}
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
      }),
    });

    OfferData = await OfferData.json();
    if (OfferData.data) {
      return OfferData.data;
    }
  };

  getOffers(context.state._FILTERBASE.base).then((e) => {
    context.setState({
      _Offer: e,
    });
  });
};

export const fetchFloor = (context) => {
  context.setState({
    _floor: 0,
  });
  const getOffers = async (e) => {
    let OfferData = await fetch("https://api.tezos.domains/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
            offers(
              where: { 
                domainName: {
                  in: ${JSON.stringify(e)} 
                }
                state: {
                  in: ACTIVE
                }
              }
              order: { direction:ASC field:PRICE } 
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
                }
                price
                state
              }
            }
          }`,
      }),
    });

    OfferData = await OfferData.json();
    if (OfferData.data) {
      return OfferData.data;
    }
  };

  getOffers(context.state._FILTERBASE.base).then((e) => {
    context.setState({
      _floor: e.offers.items[0].price / 10 ** 6,
    });
  });

  fetch("https://api.coingecko.com/api/v3/coins/tezos")
    .then((e) => {
      return e.json();
    })
    .then((e) => {
      context.setState({
        _TezosPrice: e.market_data.current_price,
      });
    });

  fetch("https://api.coingecko.com/api/v3/coins/ethereum")
    .then((e) => {
      return e.json();
    })
    .then((e) => {
      context.setState({
        _EthereumPrice: e.market_data.current_price,
      });
    });
};

export const fetchAddress = (context, domain) => {
  const getDomain = async (e) => {
    let DomainData = await fetch("https://api.tezos.domains/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
            domain(name: "${e}") {
              address
            }
          }
          `,
      }),
    });

    DomainData = await DomainData.json();
    if (DomainData.data) {
      return DomainData.data;
    }
  };

  getDomain(domain).then((e) => {
    context.setState({
      _batchTxInput:
        (e.domain == null && "domain unregistered") ||
        (e.domain && e.domain.address) ||
        "no reverse set",
    });
  });
};

export const fetchSearch = async (context, domain) => {
  const getDomain = async (e) => {
    let DomainData = await fetch("https://api.tezos.domains/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
            domain(name: "${e}") {
              name
              tokenId
            }
          }
          `,
      }),
    });

    DomainData = await DomainData.json();
    if (DomainData.data) {
      return DomainData.data;
    }
  };

  return await getDomain(domain);
};

export const fetchDomain = (context, domain) => {
  const getDomain = async (e) => {
    let DomainData = await fetch("https://api.tezos.domains/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
            reverseRecord(address: "${e}") {
              domain {
                name
              }
            }
          }
          `,
      }),
    });

    DomainData = await DomainData.json();
    if (DomainData.data) {
      return DomainData.data;
    }
  };

  getDomain(domain).then((e) => {
    context.setState({
      _accountDomain: e.reverseRecord.domain.name,
    });
  });
};
