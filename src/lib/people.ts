// People Finder helpers: builds public search links (LinkedIn / Google) and
// message drafts. Nothing here scrapes or calls LinkedIn: it only generates
// URLs you open yourself and text you copy and send yourself.

export type Lang = 'fr' | 'en';
export type Goal = 'advice' | 'hr' | 'referral' | 'alumni';
export type RoleKind = 'practitioner' | 'hr' | 'manager' | 'alumni';

export type Specialty = {
  id: string;
  label: { fr: string; en: string };
  /** Boolean-style keyword groups, FR + EN, used in LinkedIn and Google queries. */
  keywords: string[];
};

export const SPECIALTIES: Specialty[] = [
  {
    id: 'pentest',
    label: { fr: 'pentest / sécurité applicative (SQLi, web)', en: 'pentest / application security (SQLi, web)' },
    keywords: ['pentester', 'penetration testing', 'ethical hacker', 'red team', 'application security', 'AppSec', 'bug bounty', 'OWASP', 'SQL injection'],
  },
  {
    id: 'dataprotection',
    label: { fr: 'protection des données / DPO / CNDP', en: 'data protection / DPO / privacy' },
    keywords: ['data protection', 'DPO', 'privacy', 'RGPD', 'GDPR', 'CNDP', 'protection des données', 'loi 09-08'],
  },
  {
    id: 'soc',
    label: { fr: 'SOC / SIEM / réponse aux incidents', en: 'SOC / SIEM / incident response' },
    keywords: ['SOC analyst', 'SIEM', 'threat hunting', 'incident response', 'blue team', 'Splunk', 'QRadar', 'Sentinel'],
  },
  {
    id: 'dfir',
    label: { fr: 'threat intel / DFIR / malware', en: 'threat intel / DFIR / malware' },
    keywords: ['threat intelligence', 'DFIR', 'forensics', 'malware analysis', 'CTI'],
  },
  {
    id: 'cloud',
    label: { fr: 'cloud security / DevSecOps', en: 'cloud security / DevSecOps' },
    keywords: ['cloud security', 'DevSecOps', 'Azure security', 'AWS security', 'Kubernetes security'],
  },
  {
    id: 'grc',
    label: { fr: 'GRC / ISO 27001 / audit', en: 'GRC / ISO 27001 / audit' },
    keywords: ['GRC', 'ISO 27001', 'security audit', 'audit sécurité', 'RSSI', 'CISO', 'compliance'],
  },
  {
    id: 'infra',
    label: { fr: 'sécurité réseau / Active Directory', en: 'network security / Active Directory' },
    keywords: ['Active Directory', 'network security', 'sécurité réseau', 'firewall', 'IAM', 'PAM'],
  },
];

export const ROLE_KINDS: Record<RoleKind, { fr: string; en: string; keywords: string[] }> = {
  practitioner: { fr: 'Praticiens (même domaine)', en: 'Practitioners (same field)', keywords: [] },
  hr: {
    fr: 'RH / recruteurs',
    en: 'HR / recruiters',
    keywords: ['recruteur', 'recruiter', 'talent acquisition', 'ressources humaines', 'RH', 'HR', 'recrutement', 'chargé de recrutement'],
  },
  manager: {
    fr: 'Managers / responsables',
    en: 'Managers / team leads',
    keywords: ['manager', 'head of', 'responsable', 'directeur', 'director', 'team lead', 'RSSI', 'CISO'],
  },
  alumni: { fr: 'Anciens de mon école', en: 'Alumni of my school', keywords: [] },
};

export const GOALS: Record<Goal, { fr: string; en: string }> = {
  advice: { fr: 'Demander un conseil', en: 'Ask for advice' },
  hr: { fr: 'Demander le contact RH', en: 'Ask for the HR contact' },
  referral: { fr: 'Demander la bonne équipe / recommandation', en: 'Ask for the right team / referral' },
  alumni: { fr: 'Message à un ancien de mon école', en: 'Message to a school alumnus' },
};

const orGroup = (terms: string[]) =>
  terms.length === 1 ? quote(terms[0]) : '(' + terms.map(quote).join(' OR ') + ')';

const quote = (t: string) => (/\s|-/.test(t) ? `"${t}"` : t);

export type SearchInput = {
  specialtyId: string;
  roleKind: RoleKind;
  company: string; // '' = any
  city: string; // '' = any
  school: string; // used for alumni
};

export type SearchLink = { id: string; title: string; hint: string; href: string };

export function buildSearchLinks(input: SearchInput, lang: Lang): SearchLink[] {
  const spec = SPECIALTIES.find((s) => s.id === input.specialtyId) ?? SPECIALTIES[0];
  const role = ROLE_KINDS[input.roleKind];

  const parts: string[] = [];
  if (input.roleKind === 'practitioner') parts.push(orGroup(spec.keywords.slice(0, 6)));
  else if (input.roleKind === 'alumni') {
    parts.push(quote(input.school || 'ENSA Oujda'));
    parts.push(orGroup(spec.keywords.slice(0, 5)));
  } else {
    parts.push(orGroup(role.keywords));
    if (input.roleKind === 'manager') parts.push(orGroup(spec.keywords.slice(0, 5)));
  }
  if (input.company) parts.push(quote(input.company));
  const place = input.city ? `(${quote(input.city)} OR Maroc OR Morocco)` : '(Maroc OR Morocco)';
  parts.push(place);

  const keywords = parts.join(' ');
  const enc = encodeURIComponent;

  const linkedinPeople = `https://www.linkedin.com/search/results/people/?keywords=${enc(keywords)}&origin=GLOBAL_SEARCH_HEADER`;
  const google = `https://www.google.com/search?q=${enc(`site:linkedin.com/in ${keywords}`)}`;

  const hiringTerms =
    lang === 'fr'
      ? '("stage PFE" OR "PFE" OR "stagiaire" OR "on recrute" OR "je recrute")'
      : '("PFE" OR "internship" OR "we are hiring" OR "hiring")';
  const postKeywords = [hiringTerms, orGroup(spec.keywords.slice(0, 5)), input.company ? quote(input.company) : 'Maroc'].join(' ');
  const linkedinPosts = `https://www.linkedin.com/search/results/content/?keywords=${enc(postKeywords)}&datePosted=%22past-month%22&origin=FACETED_SEARCH`;

  const links: SearchLink[] = [
    {
      id: 'li-people',
      title: lang === 'fr' ? 'Recherche de personnes sur LinkedIn' : 'LinkedIn people search',
      hint: lang === 'fr' ? 'Ouvre LinkedIn avec la requête déjà écrite (compte connecté requis).' : 'Opens LinkedIn with the query pre-filled (needs you to be logged in).',
      href: linkedinPeople,
    },
    {
      id: 'google',
      title: lang === 'fr' ? 'Recherche Google (X-ray) sur profils publics' : 'Google X-ray search on public profiles',
      hint:
        lang === 'fr'
          ? 'Trouve des profils publics sans compte LinkedIn et sans limite de recherches.'
          : 'Finds public profiles without a LinkedIn account and without search limits.',
      href: google,
    },
    {
      id: 'li-posts',
      title: lang === 'fr' ? 'Publications de recrutement (30 derniers jours)' : 'Hiring posts (last 30 days)',
      hint:
        lang === 'fr'
          ? "Les gens qui postent « on recrute / PFE » sont les plus faciles à contacter."
          : 'People posting “we are hiring / PFE” are the easiest to reach.',
      href: linkedinPosts,
    },
  ];

  if (input.company) {
    links.push({
      id: 'li-company',
      title: lang === 'fr' ? `Page entreprise : ${input.company}` : `Company page: ${input.company}`,
      hint: lang === 'fr' ? 'Onglet « Personnes » pour filtrer par poste.' : 'Use the “People” tab to filter by job title.',
      href: `https://www.linkedin.com/search/results/companies/?keywords=${enc(input.company)}`,
    });
  }
  return links;
}

/* ------------------------------ Messages ------------------------------ */

export type Profile = {
  myName: string;
  school: string;
  project: string; // e.g. "PFE de 6 mois"
};

export const DEFAULT_PROFILE: Profile = {
  myName: '',
  school: 'ENSA Oujda',
  project: 'PFE',
};

type Tpl = { connect: string; followup: string };

const T: Record<Lang, Record<Goal, Tpl>> = {
  en: {
    advice: {
      connect:
        "Hello {first}, I'm a final-year cybersecurity engineering student at {school}, looking for a {project}. Your work in {field} caught my eye. Could I ask you for a short piece of advice?",
      followup:
        "Hello {first}, thank you for accepting my request.\n\nI'm {me}, a final-year cybersecurity engineering student at {school}, and I'm looking for a {project} in {field}. I saw that you work {at}, so I wanted to ask you directly: what would you recommend to a student who wants to get into this field, and is there a good way to approach the team?\n\nAny advice, even a single line, would help a lot. Thank you for your time!",
    },
    hr: {
      connect:
        "Hello {first}, I'm a final-year cybersecurity student at {school}, looking for a {project} in {field}. Could you point me to the right HR contact {at}? Thank you!",
      followup:
        "Hello {first}, thank you for accepting my request.\n\nI'm {me}, a final-year cybersecurity engineering student at {school}, looking for a {project} in {field}. Could you tell me who handles intern applications {at}, or the best channel to send my CV (email, careers page, or a specific person)?\n\nI'd be glad to send my CV if that is useful. Thank you very much!",
    },
    referral: {
      connect:
        "Hello {first}, I'm a final-year cybersecurity student at {school}, looking for a {project} in {field}. Your team {at} seems like a great fit. Who would be the right person to contact?",
      followup:
        "Hello {first}, thank you for accepting my request.\n\nI'm {me}, a final-year cybersecurity engineering student at {school}. I'm looking for a {project} in {field} and your team {at} matches what I'm aiming for. Do you know who leads intern projects there, or whether a {project} is open this year?\n\nIf it helps, I can send a short CV and a summary of my projects. Thank you!",
    },
    alumni: {
      connect:
        "Hello {first}, I'm a final-year cybersecurity student at {school}, like you once were. I'm looking for a {project} in {field}. Could I ask for a few minutes of advice?",
      followup:
        "Hello {first}, thank you for accepting my request.\n\nI'm {me}, a final-year cybersecurity engineering student at {school}. I saw you studied there and now work {at}. How did you land your first role or internship in {field}, and what would you do differently today?\n\nAny advice, or an introduction to someone who recruits interns, would mean a lot. Thank you!",
    },
  },
  fr: {
    advice: {
      connect:
        "Bonjour {first}, étudiant ingénieur en cybersécurité à {school} (dernière année), je cherche un {project}. Votre parcours en {field} m'intéresse. Puis-je vous demander un conseil ?",
      followup:
        "Bonjour {first}, merci d'avoir accepté ma demande.\n\nJe suis {me}, étudiant ingénieur en cybersécurité à {school}, en dernière année, et je cherche un {project} en {field}. J'ai vu que vous travaillez {at}, alors je me permets de vous demander : quels conseils donneriez-vous à un étudiant qui veut se lancer dans ce domaine, et comment approcher l'équipe ?\n\nUn conseil, même en une ligne, m'aiderait beaucoup. Merci pour votre temps !",
    },
    hr: {
      connect:
        "Bonjour {first}, étudiant en cybersécurité à {school}, je cherche un {project} en {field}. Pouvez-vous m'indiquer le bon contact RH {at} ? Merci !",
      followup:
        "Bonjour {first}, merci d'avoir accepté ma demande.\n\nJe suis {me}, étudiant ingénieur en cybersécurité à {school}, et je cherche un {project} en {field}. Pourriez-vous m'indiquer qui gère les candidatures de stage {at}, ou le meilleur canal pour envoyer mon CV (email, page carrières ou une personne précise) ?\n\nJe peux vous envoyer mon CV si c'est utile. Merci beaucoup !",
    },
    referral: {
      connect:
        "Bonjour {first}, étudiant en cybersécurité à {school} (dernière année), je cherche un {project} en {field}. Votre équipe {at} correspond à mon profil. Qui serait la bonne personne à contacter ?",
      followup:
        "Bonjour {first}, merci d'avoir accepté ma demande.\n\nJe suis {me}, étudiant ingénieur en cybersécurité à {school}. Je cherche un {project} en {field} et votre équipe {at} correspond à ce que je vise. Savez-vous qui encadre les stagiaires, ou si un {project} est ouvert cette année ?\n\nJe peux envoyer un CV court et un résumé de mes projets. Merci !",
    },
    alumni: {
      connect:
        "Bonjour {first}, je suis étudiant en cybersécurité à {school}, comme vous l'avez été. Je cherche un {project} en {field}. Auriez-vous quelques minutes pour me conseiller ?",
      followup:
        "Bonjour {first}, merci d'avoir accepté ma demande.\n\nJe suis {me}, étudiant ingénieur en cybersécurité à {school}, en dernière année. J'ai vu que vous avez étudié là-bas et que vous travaillez maintenant {at}. Comment avez-vous décroché votre premier stage ou poste en {field}, et que feriez-vous différemment aujourd'hui ?\n\nUn conseil, ou une mise en relation avec quelqu'un qui recrute des stagiaires, m'aiderait beaucoup. Merci !",
    },
  },
};

export type MessageVars = {
  first: string;
  company: string;
  specialtyId: string;
  profile: Profile;
};

export function firstNameOf(full: string) {
  const f = (full || '').trim().split(/\s+/)[0] || '';
  return f.replace(/[,.;]+$/, '');
}

export function buildMessages(goal: Goal, lang: Lang, v: MessageVars) {
  const spec = SPECIALTIES.find((s) => s.id === v.specialtyId) ?? SPECIALTIES[0];
  const fieldShort: Record<string, { fr: string; en: string }> = {
    pentest: { fr: 'sécurité offensive', en: 'offensive security' },
    dataprotection: { fr: 'protection des données', en: 'data protection' },
    soc: { fr: 'SOC / SIEM', en: 'SOC / SIEM' },
    dfir: { fr: 'threat intel / DFIR', en: 'threat intel / DFIR' },
    cloud: { fr: 'cloud security', en: 'cloud security' },
    grc: { fr: 'GRC / audit sécurité', en: 'GRC / security audit' },
    infra: { fr: 'sécurité réseau / AD', en: 'network / AD security' },
  };
  const field = (fieldShort[spec.id] ?? { fr: spec.label.fr, en: spec.label.en })[lang];
  const at = v.company ? (lang === 'fr' ? `chez ${v.company}` : `at ${v.company}`) : lang === 'fr' ? 'dans votre entreprise' : 'at your company';

  const map: Record<string, string> = {
    first: v.first || (lang === 'fr' ? '' : ''),
    me: v.profile.myName || (lang === 'fr' ? '[votre nom]' : '[your name]'),
    school: v.profile.school || 'ENSA Oujda',
    project: v.profile.project || 'PFE',
    field,
    at,
  };
  const fill = (s: string) =>
    s
      .replace(/\{(\w+)\}/g, (_, k) => map[k] ?? `{${k}}`)
      .replace(/Hello ,/g, 'Hello,')
      .replace(/Bonjour ,/g, 'Bonjour,');

  const tpl = T[lang][goal];
  return { connect: fill(tpl.connect), followup: fill(tpl.followup) };
}

/* -------------------------------- CSV -------------------------------- */

export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQ = false;
  const s = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQ) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          cell += '"';
          i++;
        } else inQ = false;
      } else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && s[i + 1] === '\n') i++;
      row.push(cell);
      cell = '';
      if (row.some((x) => x.trim() !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell !== '' || row.length) {
    row.push(cell);
    if (row.some((x) => x.trim() !== '')) rows.push(row);
  }
  return rows;
}

export function toCSV(rows: string[][]): string {
  const esc = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  return '\uFEFF' + rows.map((r) => r.map(esc).join(',')).join('\r\n');
}

export type Status = 'new' | 'requested' | 'connected' | 'messaged' | 'replied' | 'referral' | 'closed';
export const STATUSES: { id: Status; fr: string; en: string }[] = [
  { id: 'new', fr: 'Nouveau', en: 'New' },
  { id: 'requested', fr: 'Invitation envoyée', en: 'Request sent' },
  { id: 'connected', fr: 'Connecté', en: 'Connected' },
  { id: 'messaged', fr: 'Message envoyé', en: 'Messaged' },
  { id: 'replied', fr: 'A répondu', en: 'Replied' },
  { id: 'referral', fr: 'Piste / contact RH obtenu', en: 'Lead / HR contact obtained' },
  { id: 'closed', fr: 'Clos', en: 'Closed' },
];

export type Contact = {
  id: string;
  name: string;
  company: string;
  role: string;
  url: string;
  priority: string;
  status: Status;
  notes: string;
  updated: number;
};

const norm = (h: string) => h.toLowerCase().replace(/[^a-z]/g, '');
const pick = (headers: string[], names: string[]) => {
  const want = names.map(norm);
  return headers.findIndex((h) => want.includes(norm(h)));
};

export function contactsFromCSV(text: string): Contact[] {
  const rows = parseCSV(text);
  if (rows.length < 2) return [];
  const h = rows[0];
  const iName = pick(h, ['Contact name', 'name', 'full name']);
  const iCompany = pick(h, ['Company', 'entreprise']);
  const iRole = pick(h, ['Public role / relevance noted', 'role', 'title', 'headline']);
  const iUrl = pick(h, ['LinkedIn URL', 'linkedin_url', 'url', 'profile']);
  const iPrio = pick(h, ['Priority']);
  const iNotes = pick(h, ['Follow-up / notes', 'notes']);
  const iStatus = pick(h, ['Status']);
  const out: Contact[] = [];
  for (const r of rows.slice(1)) {
    const name = (r[iName] ?? '').trim();
    const url = (r[iUrl] ?? '').trim();
    if (!name && !url) continue;
    const st = (r[iStatus] ?? '').trim().toLowerCase() as Status;
    out.push({
      id: url || `${name}|${r[iCompany] ?? ''}`,
      name,
      company: (r[iCompany] ?? '').trim(),
      role: (r[iRole] ?? '').trim(),
      url,
      priority: (r[iPrio] ?? '').trim(),
      status: STATUSES.some((s) => s.id === st) ? st : 'new',
      notes: (r[iNotes] ?? '').trim(),
      updated: Date.now(),
    });
  }
  return out;
}

export function contactsToCSV(list: Contact[]): string {
  const head = ['Company', 'Contact name', 'Role', 'LinkedIn URL', 'Priority', 'Status', 'Notes'];
  return toCSV([head, ...list.map((c) => [c.company, c.name, c.role, c.url, c.priority, c.status, c.notes])]);
}
