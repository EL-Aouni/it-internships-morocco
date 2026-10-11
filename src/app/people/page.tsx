'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ExternalLink, Copy, Download, Upload, Plus, Trash2, Search, Users } from 'lucide-react';
import {
  SPECIALTIES,
  ROLE_KINDS,
  GOALS,
  STATUSES,
  DEFAULT_PROFILE,
  buildSearchLinks,
  buildMessages,
  firstNameOf,
  contactsFromCSV,
  contactsToCSV,
  type Lang,
  type Goal,
  type RoleKind,
  type Profile,
  type Contact,
  type Status,
} from '@/lib/people';

type Company = { id: number; name: string; city: string };

const LS_CONTACTS = 'pfe-contacts-v1';
const LS_SETTINGS = 'pfe-people-settings-v1';
const CONNECT_LIMIT = 200; // free LinkedIn accounts: ~200 chars on connection notes

const field =
  'h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

export default function PeoplePage() {
  const [tab, setTab] = useState<'find' | 'contacts'>('find');
  const [lang, setLang] = useState<Lang>('fr');
  const [goal, setGoal] = useState<Goal>('advice');
  const [specialtyId, setSpecialtyId] = useState('pentest');
  const [roleKind, setRoleKind] = useState<RoleKind>('practitioner');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState('');

  // contacts tab state
  const [q, setQ] = useState('');
  const [fStatus, setFStatus] = useState('');
  const [fCompany, setFCompany] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // preview name for the "Find" tab message
  const [previewName, setPreviewName] = useState('');

  useEffect(() => {
    try {
      const c = localStorage.getItem(LS_CONTACTS);
      if (c) setContacts(JSON.parse(c));
      const s = localStorage.getItem(LS_SETTINGS);
      if (s) {
        const o = JSON.parse(s);
        if (o.lang) setLang(o.lang);
        if (o.goal) setGoal(o.goal);
        if (o.specialtyId) setSpecialtyId(o.specialtyId);
        if (o.profile) setProfile({ ...DEFAULT_PROFILE, ...o.profile });
      }
    } catch {
      /* storage unavailable or corrupted: start empty */
    }
    setLoaded(true);

    const basePath = process.env.NODE_ENV === 'production' ? '/it-internships-morocco' : '';
    fetch(`${basePath}/companies.json`)
      .then((r) => r.json())
      .then((d: Company[]) => setCompanies(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(LS_CONTACTS, JSON.stringify(contacts));
    } catch {}
  }, [contacts, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(LS_SETTINGS, JSON.stringify({ lang, goal, specialtyId, profile }));
    } catch {}
  }, [lang, goal, specialtyId, profile, loaded]);

  const say = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(''), 1800);
  };
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      say(lang === 'fr' ? 'Copié ✓' : 'Copied ✓');
    } catch {
      say(lang === 'fr' ? 'Copie impossible' : 'Copy failed');
    }
  };

  const t = (fr: string, en: string) => (lang === 'fr' ? fr : en);

  const cities = useMemo(() => Array.from(new Set(companies.map((c) => c.city))).sort(), [companies]);
  const companyNames = useMemo(() => Array.from(new Set(companies.map((c) => c.name))).sort(), [companies]);

  const links = useMemo(
    () => buildSearchLinks({ specialtyId, roleKind, company, city, school: profile.school }, lang),
    [specialtyId, roleKind, company, city, profile.school, lang]
  );

  const previewMsgs = useMemo(
    () =>
      buildMessages(roleKind === 'alumni' ? 'alumni' : goal, lang, {
        first: firstNameOf(previewName) || (lang === 'fr' ? 'Prénom' : 'Firstname'),
        company,
        specialtyId,
        profile,
      }),
    [goal, lang, previewName, company, specialtyId, profile, roleKind]
  );

  const msgFor = (c: Contact) =>
    buildMessages(goal, lang, { first: firstNameOf(c.name), company: c.company, specialtyId, profile });

  /* ----------------------------- contacts ops ----------------------------- */
  const update = (id: string, patch: Partial<Contact>) =>
    setContacts((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch, updated: Date.now() } : c)));

  const onImport = async (f: File | undefined) => {
    if (!f) return;
    const list = contactsFromCSV(await f.text());
    if (!list.length) return say(t('Aucun contact trouvé dans ce CSV', 'No contacts found in this CSV'));
    setContacts((cur) => {
      const byId = new Map(cur.map((c) => [c.id, c]));
      let added = 0;
      for (const c of list) {
        if (!byId.has(c.id)) {
          byId.set(c.id, c);
          added++;
        }
      }
      say(t(`${added} nouveaux contacts importés`, `${added} new contacts imported`));
      return Array.from(byId.values());
    });
    if (fileRef.current) fileRef.current.value = '';
  };

  const onExport = () => {
    const blob = new Blob([contactsToCSV(contacts)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'pfe-contacts.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const [draft, setDraft] = useState({ name: '', company: '', url: '', role: '' });
  const addDraft = () => {
    if (!draft.name.trim() && !draft.url.trim()) return;
    const c: Contact = {
      id: draft.url.trim() || `${draft.name}|${draft.company}|${Date.now()}`,
      name: draft.name.trim(),
      company: draft.company.trim() || company,
      role: draft.role.trim(),
      url: draft.url.trim(),
      priority: '',
      status: 'new',
      notes: '',
      updated: Date.now(),
    };
    setContacts((cs) => (cs.some((x) => x.id === c.id) ? cs : [c, ...cs]));
    setDraft({ name: '', company: '', url: '', role: '' });
  };

  const companiesInContacts = useMemo(
    () => Array.from(new Set(contacts.map((c) => c.company).filter(Boolean))).sort(),
    [contacts]
  );

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return contacts.filter(
      (c) =>
        (!fStatus || c.status === fStatus) &&
        (!fCompany || c.company === fCompany) &&
        (!s || `${c.name} ${c.company} ${c.role} ${c.notes}`.toLowerCase().includes(s))
    );
  }, [contacts, q, fStatus, fCompany]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    contacts.forEach((c) => (m[c.status] = (m[c.status] || 0) + 1));
    return m;
  }, [contacts]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <Users className="h-5 w-5" /> {t('Trouver des contacts', 'People Finder')}
          </h1>
          <div className="flex items-center gap-2">
            <select className={`${field} w-24`} value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label="Language">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="mr-2 h-4 w-4" />
                {t('Accueil', 'Home')}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-5xl space-y-6">
        {/* Shared settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('1. Mon profil et mon objectif', '1. My profile and my goal')}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <label className="text-sm space-y-1">
              <span className="text-muted-foreground">{t('Mon nom', 'My name')}</span>
              <input className={field} value={profile.myName} onChange={(e) => setProfile({ ...profile, myName: e.target.value })} placeholder="Prénom Nom" />
            </label>
            <label className="text-sm space-y-1">
              <span className="text-muted-foreground">{t('Mon école', 'My school')}</span>
              <input className={field} value={profile.school} onChange={(e) => setProfile({ ...profile, school: e.target.value })} />
            </label>
            <label className="text-sm space-y-1">
              <span className="text-muted-foreground">{t('Type de stage', 'Internship type')}</span>
              <input className={field} value={profile.project} onChange={(e) => setProfile({ ...profile, project: e.target.value })} placeholder="PFE" />
            </label>
            <label className="text-sm space-y-1 md:col-span-2">
              <span className="text-muted-foreground">{t('Mon domaine cible', 'My target field')}</span>
              <select className={field} value={specialtyId} onChange={(e) => setSpecialtyId(e.target.value)}>
                {SPECIALTIES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label[lang]}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm space-y-1">
              <span className="text-muted-foreground">{t('Ce que je veux demander', 'What I want to ask')}</span>
              <select className={field} value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
                {(Object.keys(GOALS) as Goal[]).map((g) => (
                  <option key={g} value={g}>
                    {GOALS[g][lang]}
                  </option>
                ))}
              </select>
            </label>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 border-b">
          {(['find', 'contacts'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                tab === k ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {k === 'find' ? t('2. Trouver des personnes', '2. Find people') : `${t('3. Mes contacts', '3. My contacts')} (${contacts.length})`}
            </button>
          ))}
        </div>

        {tab === 'find' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 grid gap-3 md:grid-cols-3">
                <label className="text-sm space-y-1">
                  <span className="text-muted-foreground">{t('Qui chercher ?', 'Who to look for?')}</span>
                  <select className={field} value={roleKind} onChange={(e) => setRoleKind(e.target.value as RoleKind)}>
                    {(Object.keys(ROLE_KINDS) as RoleKind[]).map((r) => (
                      <option key={r} value={r}>
                        {ROLE_KINDS[r][lang]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm space-y-1">
                  <span className="text-muted-foreground">{t('Entreprise (optionnel)', 'Company (optional)')}</span>
                  <select className={field} value={company} onChange={(e) => setCompany(e.target.value)}>
                    <option value="">{t('Toutes', 'Any')}</option>
                    {companyNames.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm space-y-1">
                  <span className="text-muted-foreground">{t('Ville (optionnel)', 'City (optional)')}</span>
                  <select className={field} value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">{t('Tout le Maroc', 'All Morocco')}</option>
                    {cities.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </CardContent>
            </Card>

            <div className="grid gap-3 md:grid-cols-2">
              {links.map((l) => (
                <Card key={l.id}>
                  <CardContent className="pt-6 space-y-2">
                    <div className="font-medium flex items-start gap-2">
                      <Search className="h-4 w-4 mt-1 shrink-0 text-primary" />
                      {l.title}
                    </div>
                    <p className="text-sm text-muted-foreground">{l.hint}</p>
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t('Ouvrir', 'Open')}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('Message prêt à copier', 'Ready-to-copy message')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="text-sm space-y-1 block max-w-sm">
                  <span className="text-muted-foreground">{t('Prénom de la personne (aperçu)', "Person's first name (preview)")}</span>
                  <input className={field} value={previewName} onChange={(e) => setPreviewName(e.target.value)} placeholder="Ahmed" />
                </label>
                <MessageBox
                  title={t("Note d'invitation", 'Connection note')}
                  text={previewMsgs.connect}
                  limit={CONNECT_LIMIT}
                  onCopy={copy}
                  lang={lang}
                />
                <MessageBox title={t('Message après acceptation', 'Message after they accept')} text={previewMsgs.followup} onCopy={copy} lang={lang} />
                <p className="text-xs text-muted-foreground">
                  {t(
                    "Astuce : ouvrez le profil, lisez-le, puis ajoutez une phrase personnelle (un post, un projet) avant d'envoyer. Les messages personnalisés reçoivent bien plus de réponses. Envoyez-les vous-même : rien n'est envoyé automatiquement.",
                    'Tip: open the profile, read it, and add one personal sentence (a post, a project) before sending. Personalised messages get far more replies. You send them yourself: nothing is sent automatically.'
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'contacts' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t(
                'Vos contacts restent dans votre navigateur (localStorage). Rien n’est envoyé à un serveur ni publié sur GitHub.',
                'Your contacts stay in your browser (localStorage). Nothing is sent to a server or published on GitHub.'
              )}
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={(e) => onImport(e.target.files?.[0])} />
              <Button size="sm" onClick={() => fileRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                {t('Importer CSV', 'Import CSV')}
              </Button>
              <a
                href={`${process.env.NODE_ENV === 'production' ? '/it-internships-morocco' : ''}/example-contacts.csv`}
                download
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                {t('Télécharger un CSV exemple', 'Download example CSV')}
              </a>
              <Button size="sm" variant="outline" onClick={onExport} disabled={!contacts.length}>
                <Download className="mr-2 h-4 w-4" />
                {t('Exporter CSV', 'Export CSV')}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={!contacts.length}
                onClick={() => {
                  if (confirm(t('Supprimer tous les contacts ?', 'Delete all contacts?'))) setContacts([]);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t('Tout effacer', 'Clear all')}
              </Button>
              <div className="flex flex-wrap gap-1 text-xs ml-auto">
                {STATUSES.map((s) => (
                  <span key={s.id} className="rounded-full border px-2 py-0.5">
                    {s[lang]}: <b>{counts[s.id] || 0}</b>
                  </span>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="pt-6 grid gap-2 md:grid-cols-5">
                <input className={field} placeholder={t('Nom', 'Name')} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                <input className={field} placeholder={t('Entreprise', 'Company')} value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
                <input className={field} placeholder={t('Poste', 'Role')} value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
                <input className={field} placeholder="LinkedIn URL" value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
                <Button onClick={addDraft}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('Ajouter', 'Add')}
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-2 md:grid-cols-3">
              <input className={field} placeholder={t('Rechercher…', 'Search…')} value={q} onChange={(e) => setQ(e.target.value)} />
              <select className={field} value={fCompany} onChange={(e) => setFCompany(e.target.value)}>
                <option value="">{t('Toutes les entreprises', 'All companies')}</option>
                {companiesInContacts.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              <select className={field} value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
                <option value="">{t('Tous les statuts', 'All statuses')}</option>
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s[lang]}
                  </option>
                ))}
              </select>
            </div>

            {!contacts.length && (
              <p className="text-center text-muted-foreground py-10">
                {t('Aucun contact. Importez un CSV ou ajoutez-en un.', 'No contacts yet. Import a CSV or add one.')}
              </p>
            )}

            <div className="space-y-2">
              {shown.slice(0, 200).map((c) => {
                const m = msgFor(c);
                const open = openId === c.id;
                return (
                  <Card key={c.id}>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex flex-wrap items-start gap-3">
                        <div className="flex-1 min-w-[200px]">
                          <div className="font-medium">{c.name || '—'}</div>
                          <div className="text-sm text-muted-foreground">
                            {c.company}
                            {c.priority ? ` · ${c.priority}` : ''}
                          </div>
                          {c.role && <div className="text-xs text-muted-foreground mt-1">{c.role}</div>}
                        </div>
                        <select className={`${field} w-48`} value={c.status} onChange={(e) => update(c.id, { status: e.target.value as Status })}>
                          {STATUSES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s[lang]}
                            </option>
                          ))}
                        </select>
                        {c.url && (
                          <a href={c.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              {t('Profil', 'Profile')}
                            </Button>
                          </a>
                        )}
                        <Button size="sm" variant="secondary" onClick={() => setOpenId(open ? null : c.id)}>
                          {open ? t('Fermer', 'Close') : t('Messages', 'Messages')}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Delete"
                          onClick={() => setContacts((cs) => cs.filter((x) => x.id !== c.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <input
                        className={field}
                        placeholder={t('Notes (réponse, date de relance…)', 'Notes (reply, follow-up date…)')}
                        value={c.notes}
                        onChange={(e) => update(c.id, { notes: e.target.value })}
                      />
                      {open && (
                        <div className="space-y-3 pt-2">
                          <MessageBox title={t("Note d'invitation", 'Connection note')} text={m.connect} limit={CONNECT_LIMIT} onCopy={copy} lang={lang} />
                          <MessageBox title={t('Message après acceptation', 'Message after they accept')} text={m.followup} onCopy={copy} lang={lang} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              {shown.length > 200 && (
                <p className="text-sm text-muted-foreground text-center">
                  {t(`${shown.length - 200} autres : affinez la recherche.`, `${shown.length - 200} more: refine the search.`)}
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow">
          {toast}
        </div>
      )}
    </div>
  );
}

function MessageBox({
  title,
  text,
  limit,
  onCopy,
  lang,
}: {
  title: string;
  text: string;
  limit?: number;
  onCopy: (t: string) => void;
  lang: Lang;
}) {
  const [value, setValue] = useState(text);
  const [edited, setEdited] = useState(false);

  // follow the generated text until the user edits it by hand
  useEffect(() => {
    if (!edited) setValue(text);
  }, [text, edited]);

  const over = limit !== undefined && value.length > limit;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{title}</span>
        {limit !== undefined && (
          <span className={over ? 'text-destructive' : 'text-muted-foreground'}>
            {value.length}/{limit}
          </span>
        )}
      </div>
      <textarea
        className="w-full rounded-md border border-input bg-background p-3 text-sm min-h-[110px] focus:outline-none focus:ring-2 focus:ring-ring"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setEdited(true);
        }}
      />
      {over && (
        <p className="text-xs text-destructive">
          {lang === 'fr'
            ? 'Trop long pour une note d’invitation gratuite : raccourcissez, ou envoyez ce texte après acceptation.'
            : 'Too long for a free-account connection note: shorten it, or send this text after they accept.'}
        </p>
      )}
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onCopy(value)}>
          <Copy className="mr-2 h-4 w-4" />
          {lang === 'fr' ? 'Copier' : 'Copy'}
        </Button>
        {edited && (
          <Button size="sm" variant="ghost" onClick={() => setEdited(false)}>
            {lang === 'fr' ? 'Réinitialiser' : 'Reset'}
          </Button>
        )}
      </div>
    </div>
  );
}
