export const NavTags = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export type NavTag = (typeof NavTags)[number];
