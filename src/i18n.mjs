// Language switch for the static build. The builder renders every page twice:
// once with lang 'en' (site root) and once with 'zh' (under /zh/).
import * as D from './data.mjs';
import * as Z from './zh.mjs';

let current = 'en';
export const setLang = (l) => { current = l; };
export const lang = () => current;
export const isZh = () => current === 'zh';

/** Pick a string for the current language */
export const t = (en, zh) => (current === 'zh' ? zh : en);

/** Asset root: zh pages live one folder deeper than their language root */
export const ar = (r) => (current === 'zh' ? `${r}../` : r);

const merge = (base, over) => (current === 'zh' && over ? { ...base, ...over } : base);
const mergeList = (list, zhList) => list.map((x, i) => merge(x, zhList[i]));

// ---- Localised data views -------------------------------------------
export const L = {
  site: () => merge(D.site, Z.zhSite),
  packages: () => mergeList(D.packages, Z.zhPackages),
  membershipsUpfront: () => mergeList(D.membershipsUpfront, Z.zhMembershipsUpfront),
  membershipsRecurring: () => mergeList(D.membershipsRecurring, Z.zhMembershipsRecurring),
  team: () => D.team.map((m) => merge({ ...m, zh: undefined }, Z.zhTeam[m.slug])),
  faqs: () => (current === 'zh' ? Z.zhFaqs : D.faqs),
  posts: () => D.posts.map((p) => merge(p, Z.zhPosts[p.slug])),
  categories: () => D.categories.map(([k, label]) => [k, current === 'zh' ? Z.zhCategories[k] : label]),
  day: (d) => (current === 'zh' ? Z.zhDays[d.day][0] : d.day),
  dayFull: (d) => (current === 'zh' ? Z.zhDays[d.day][1] : d.full),
};

/** Split a raw schedule name like "Hatha Yoga 哈他瑜伽 · Off Peak" into parts */
export function className(raw) {
  const [title, flag] = raw.split(' · ');
  const m = title.match(/^(.*?)\s*([一-鿿].*)?$/);
  const en = m[1].trim();
  const zh = (m[2] || '').trim();
  return {
    name: current === 'zh' && zh ? zh : en,
    en,
    flag: flag ? t(flag, '非高峰') : '',
  };
}
