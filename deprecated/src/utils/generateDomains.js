export let _999base = [];
export let _10kbase = [];
export let _100kbase = [];
export let _3dpalibase = [];
export let _4dpalibase = [];
export let _5dpalibase = [];

let i = -1;
while (++i < 100000) {
  let _3digits = (i < 10 ? "00" + i : i < 100 ? "0" + i : i).toString();

  let _4digits = (
    i < 10 ? "000" + i : i < 100 ? "00" + i : i < 1000 ? "0" + i : i
  ).toString();

  let _5digits = (
    i < 10
      ? "0000" + i
      : i < 100
      ? "000" + i
      : i < 1000
      ? "00" + i
      : i < 10000
      ? "0" + i
      : i
  ).toString();

  if (_3digits == _3digits.split("").reverse().join("") && i < 1000)
    _3dpalibase.push(_3digits + ".tez");
  if (_4digits == _4digits.split("").reverse().join("") && i < 10000)
    _4dpalibase.push(_4digits + ".tez");
  if (_5digits == _5digits.split("").reverse().join("") && i < 100000)
    _5dpalibase.push(_5digits + ".tez");

  if (i < 100000) _100kbase.push(_5digits + ".tez");
  if (i < 10000) _10kbase.push(_4digits + ".tez");
  if (i < 1000) _999base.push(_3digits + ".tez");
}
