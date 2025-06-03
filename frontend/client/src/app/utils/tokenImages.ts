export const tokenLogos = [
  {
    ticker: "SNEK",
    url: "https://taptools-public.s3.amazonaws.com/token-logos/279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b-v2.png",
  },
  {
    ticker: "WMTX",
    url: "https://taptools-public.s3.amazonaws.com/token-logos/1747046383691photo_2025-05-09_07-08-14.jpg",
  },
  {
    ticker: "AGIX",
    url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958.png",
  },
  {
    ticker: "IAG",
    url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/5d16cc1a177b5d9ba9cfa9793b07e60f1fb70fea1f8aef064415d114494147.png",
  },
  { ticker: "LQ", url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/LQ.png" },
  { ticker: "MIN", url: "https://taptools-public.s3.amazonaws.com/token-logos/unnamed-1747321348830-j030eb" },
  { ticker: "INDY", url: "https://taptools-public.s3.amazonaws.com/token-logos/TapTools_INDY.png" },
  {
    ticker: "SHEN",
    url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/8db269c3ec630e06ae29f74bc39edd1f87c819f1056206e879a1cd615368656e4d6963726f555344.png",
  },
  {
    ticker: "HOSKY",
    url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235484f534b59.png",
  },
  {
    ticker: "STRIKE",
    url: "https://d2wbrxwn38q552.cloudfront.net/src/token-logos/f13ac4d66b3ee19a6aa0f2a22298737bd907cc95121662fc971b5275535452494b45.png",
  },
  {
    ticker: "COPI",
    url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/b6a7467ea1deb012808ef4e87b5ff371e85f7142d7b356a40d9b42a0436f726e75636f70696173205b76696120436861696e506f72742e696f5d.png",
  },
  { ticker: "STUFF", url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/stufflogo100+-+Jason+Manske.png" },
  {
    ticker: "NVL",
    url: "https://d2wbrxwn38q552.cloudfront.net/src/token-logos/5b26e685cc5c9ad630bde3e3cd48c694436671f3d25df53777ca60ef4e564c.png",
  },
  { ticker: "USDM", url: "https://taptools-public.s3.amazonaws.com/token-logos/2%20-%20James%20Meidinger.png" },
  {
    ticker: "NTX",
    url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/edfd7a1d77bcb8b884c474bdc92a16002d1fb720e454fa6e993444794e5458.png",
  },
  {
    ticker: "USDA",
    url: "https://taptools-public.s3.amazonaws.com/src/token-logos/fe7c786ab321f41c654ef6c1af7b3250a613c24e4213e0425a7ae45655534441.png",
  },
  {
    ticker: "PALM",
    url: "https://taptools-public.s3.amazonaws.com/token-logos/b7c5cd554f3e83c8aa0900a0c9053284a5348244d23d0406c28eaf4d50414c4d0a-1744735689513-o808q4",
  },
  { ticker: "FLDT", url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/logo_crop_small.png" },
  {
    ticker: "SUNDAE",
    url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/9a9693a9a37912a5097918f97918d15240c92ab729a0b7c4aa144d7753554e444145.png",
  },
  {
    ticker: "BODEGA",
    url: "https://taptools-public.s3.amazonaws.com/src/token-logos/5deab590a137066fef0e56f06ef1b830f21bc5d544661ba570bdd2ae424f44454741.png",
  },
  { ticker: "iUSD", url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/iusd.png" },
  { ticker: "NMKR", url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/nmkr.png" },
  {
    ticker: "VYFI",
    url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/804f5544c1962a40546827cab750a88404dc7108c0f588b72964754f56594649.png?s=200",
  },
  {
    ticker: "xVYFI",
    url: "https://d2wbrxwn38q552.cloudfront.net/token-logos/804f5544c1962a40546827cab750a88404dc7108c0f588b72964754f56594649.png?s=200",
  },
];

export const getLogoByTicker = (ticker: string): string => {
  return (
    tokenLogos.find((x) => x.ticker.toUpperCase() === ticker.toUpperCase())?.url ??
    "https://cryptologos.cc/logos/cardano-ada-logo.svg?v=040"
  );
};
