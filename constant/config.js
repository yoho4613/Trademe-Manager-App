export const BASE_URL = "https://api.tmsandbox.co.nz/v1";
export const BASE_URL_SECURE = "https://secure.tmsandbox.co.nz";
export const BASE_PAGE_SLUG = "/a";
export const HOSTING_URL = "https://localhost:3001";
export const navigation = [
  { slug: "list", name: "List an Item", href: `/list`, current: false },
  {
    slug: "selling",
    name: "Items I'm Selling",
    href: `${BASE_PAGE_SLUG}/selling`,
    current: true,
    url: "/MyTradeMe/SellingItems/All.json",
  },
  {
    slug: "watchlist",
    name: "Watchlist",
    href: `${BASE_PAGE_SLUG}/watchlist`,
    current: false,
    url: "/MyTradeMe/Watchlist/All.json",
  },
  {
    slug: "sold",
    name: "Sold Item",
    href: `${BASE_PAGE_SLUG}/sold`,
    current: false,
    url: "/MyTradeMe/SoldItems/Last45Days.json",
  },
  {
    slug: "unsold",
    name: "Unsold Item",
    href: `${BASE_PAGE_SLUG}/unsold`,
    current: false,
    url: "/MyTradeMe/UnsoldItems/ItemsICanRelist.json",
  },
];
