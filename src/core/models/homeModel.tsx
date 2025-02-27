export type HomePageResponse = {
  bl: Bl[];
  fc: Fc[];
  meta: Meta;
  col: Col[];
  nal: Nal[];
  tt: Tt[];
};
export type Tt = {
  n: string;
  ip: string;
  desc: string;
  desi: string;
};
export type Nal = {
  id: number;
  n: string;
  ip: string;
  prods: Prod[];
};
export type Col = {
  id: number;
  n: string;
  sid: number;
  prods: Prod[];
};
export type Prod = {
  pgi: number;
  pgn: string;
  pi: number;
  pn: string;
  pp: number;
  ip: string;
};
export type Meta = {
  t: string;
  desc: string;
  kwd: string;
};
export type Fc = {
  id: number;
  n: string;
  cip: string;
};
export type Bl = {
  t: string;
  n: string;
  wip: string;
  mip: string;
  sid: number;
  sdesc: string;
  url: string;
};

export type MenuCategoriesResponse = {
  mtoc: Mtoc[];
  rsc: Mtoc[];
};
export type Mtoc = {
  id: number;
  n: string;
  isp: boolean;
  pcid: number;
  hc: boolean;
  o: number;
};
