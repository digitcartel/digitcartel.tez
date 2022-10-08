import { fetch10kSupplyReq } from "../service/OBJKT/request";
import { _10kbase } from "./generateDomains";

export const fetch10kSupply = (context) => {
  let i = 0;
  while (i <= 10000) {
    fetch10kSupplyReq({
      contract: "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS",
      lookFor: _10kbase,
      direction: "asc",
      offset: i,
      limit: 500
    }).then((e) => {
      let count = (context.state._10kSupply += e.data.fa[0].tokens.length);
      context.setState({
        _10kSupply: count,
      });
    });
    i += 500;
  }
};
