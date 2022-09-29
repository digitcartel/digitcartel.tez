import { fetch999HoldersReq } from "../service/OBJKT/request";
import { _999base } from "./generateDomains";

export const fetch999Holders = (context) => {
  let i = 0;
  let result = context.state._Holders999;
  let holders = [];
  while (i <= 1000) {
    fetch999HoldersReq({
      contract: "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS",
      lookFor: _999base,
      offset: i,
      limit: 500,
    }).then((e) => {
      let x = -1;
      let tmp = e.data.fa[0].tokens;
      while (++x < tmp.length) {
        let owner = tmp[x].holders[tmp[x].holders.length - 1].holder_address;
        if (holders.includes(owner)) {
          let object = result.find((z) => {
            return z.owner == owner;
          });

          object.count++;
          object.name.push(tmp[x].name);
        } else {
          holders.push(owner);
          result.push({
            owner: owner,
            count: 1,
            name: [tmp[x].name],
          });
        }
      }
      result = result.sort((a, b) => {
        return b.count - a.count;
      });
      context.setState({
        _Holders999: result,
      });
    });
    i += 500;
  }
};
