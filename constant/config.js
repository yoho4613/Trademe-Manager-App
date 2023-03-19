export const BASE_URL = "https://api.tmsandbox.co.nz/v1";
export const BASE_URL_SECURE = "https://secure.tmsandbox.co.nz"
export const BASE_PAGE_SLUG = "/a"

export const menu = [
  {slug: "list", name: "List an Item", href: `${BASE_PAGE_SLUG}/list`, current: false },
  {slug: "selling", name: "Items I'm Selling", href: `${BASE_PAGE_SLUG}/selling`, current: true },
  {slug: "watchlist", name: "Watchlist", href: `${BASE_PAGE_SLUG}/watchlist`, current: false },
  {slug: "sold", name: "Sold Item", href: `${BASE_PAGE_SLUG}/sold`, current: false },
];
