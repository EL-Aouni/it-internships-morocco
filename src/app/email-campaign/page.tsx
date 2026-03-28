'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Mail, CheckCircle, Clock, AlertCircle, Send, ArrowLeft, ExternalLink, Upload, User, Paperclip } from 'lucide-react';

type Company = {
  id: number;
  name: string;
  city: string;
  speciality: string;
  email?: string;
  phone: string | null;
  website?: string | null;
  address: string;
  priority: 'high' | 'medium' | 'low';
  description: string | null;
};

type SendStatus = 'idle' | 'opened' | 'skipped';

function EmailCampaignContent() {
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [senderName, setSenderName] = useState("Mohammed El-Aouni");
  const [senderEmail, setSenderEmail] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [subject, setSubject] = useState(
    "Candidature Stage {PFA/PFE} - {Votre Domaine}"
  );
  const [bodyTemplate, setBodyTemplate] = useState(
    "Bonjour,\n\nJe me permets de vous contacter en tant qu'etudiant en {2eme/3eme} annee cycle ingenieur en {domaine} a l'{ecole}, actuellement a la recherche d'un stage {PFA/PFE} .\n\n{nom_entreprise} m'a particulierement interesse. Seriez-vous disponible pour un echange ? Je serais heureux de vous faire parvenir mon CV.\n\nCordialement,\n{nom}"
  );
  const [statuses, setStatuses] = useState<Record<number, SendStatus>>({});
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ids = searchParams.get('ids');
    const basePath = process.env.NODE_ENV === 'production'
      ? '/it-internships-morocco'
      : '';

    fetch(`${basePath}/companies.json`)
      .then(res => res.json())
      .then((data: Company[]) => {
        if (ids) {
          const selectedIds = new Set(ids.split(',').map(Number));
          setCompanies(data.filter(c => selectedIds.has(c.id) && c.email));
        } else {
          setCompanies(data.filter(c => c.email));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams]);

  const buildBody = (company: Company) =>
    bodyTemplate
      .replace(/{nom_entreprise}/g, company.name)
      .replace(/{nom}/g, senderName);

  const openGmailCompose = (company: Company, index: number) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(company.email!)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody(company))}`;
    window.open(gmailUrl, '_blank');
    setStatuses(prev => ({ ...prev, [company.id]: 'opened' }));
    setCurrentIndex(index + 1 < companies.length ? index + 1 : null);
  };

  const skipCompany = (id: number) => {
    setStatuses(prev => ({ ...prev, [id]: 'skipped' }));
  };

  const openAll = () => {
    companies.forEach((company, i) => {
      setTimeout(() => {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(company.email!)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody(company))}`;
        window.open(gmailUrl, '_blank');
        setStatuses(prev => ({ ...prev, [company.id]: 'opened' }));
      }, i * 600);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvFile(file);
  };

  const openedCount = Object.values(statuses).filter(s => s === 'opened').length;
  const skippedCount = Object.values(statuses).filter(s => s === 'skipped').length;
  const remaining = companies.length - openedCount - skippedCount;

  const getStatusIcon = (status: SendStatus | undefined) => {
    if (status === 'opened') return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (status === 'skipped') return <AlertCircle className="h-4 w-4 text-gray-400" />;
    return <Clock className="h-4 w-4 text-muted-foreground" />;
  };

  const getStatusBadge = (status: SendStatus | undefined) => {
    if (status === 'opened') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'skipped') return 'bg-gray-50 text-gray-500 border-gray-200';
    return 'bg-blue-50 text-blue-600 border-blue-200';
  };

  const getStatusLabel = (status: SendStatus | undefined) => {
    if (status === 'opened') return 'Ouvert';
    if (status === 'skipped') return 'Ignore';
    return 'En attente';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer hover:text-primary/80">
              IT Internships Morocco
            </h1>
          </Link>
          <div className="flex gap-2">
            <Link href="/search">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-1">Campagne d'emails</h2>
          <p className="text-muted-foreground">
            Envoyez votre candidature a chaque entreprise separement via Gmail.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{companies.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{openedCount}</div>
            <div className="text-sm text-green-600">Ouverts</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">{remaining}</div>
            <div className="text-sm text-muted-foreground">Restants</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">

            {/* Sender info card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Vos informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Votre nom</label>
                  <input
                    type="text"
                    placeholder="Mohammed El-Aouni"
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Votre email</label>
                  <input
                    type="email"
                    placeholder="votre.email@gmail.com"
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={senderEmail}
                    onChange={e => setSenderEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Les emails seront envoyes depuis votre compte Gmail connecte.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CV upload card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  Votre CV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    cvFile
                      ? 'border-green-300 bg-green-50'
                      : 'border-border hover:border-primary/50 hover:bg-muted/30'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {cvFile ? (
                    <div>
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-700">{cvFile.name}</p>
                      <p className="text-xs text-green-600 mt-1">
                        {(cvFile.size / 1024).toFixed(0)} KB
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Cliquez pour changer de fichier
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium">Deposez votre CV ici</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX</p>
                    </div>
                  )}
                </div>
                {cvFile && (
                  <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">
                      Gmail ne permet pas les pieces jointes automatiques. Apres l'ouverture de chaque draft, cliquez sur le bouton <strong>trombone</strong> dans Gmail pour joindre votre CV manuellement.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Email template card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Modele d'email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Objet</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message{' '}
                    <span className="text-muted-foreground font-normal text-xs">
                      — utilisez {'{nom_entreprise}'} et {'{nom}'} pour personnaliser
                    </span>
                  </label>
                  <textarea
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    rows={10}
                    value={bodyTemplate}
                    onChange={e => setBodyTemplate(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full"
              size="lg"
              onClick={openAll}
              disabled={companies.length === 0}
            >
              <Send className="mr-2 h-4 w-4" />
              Ouvrir tous les drafts Gmail ({remaining} restants)
            </Button>
            {cvFile && (
              <p className="text-xs text-center text-amber-600 font-medium">
                N'oubliez pas de joindre {cvFile.name} a chaque draft Gmail !
              </p>
            )}
            <p className="text-xs text-center text-muted-foreground">
              Chaque email s'ouvrira dans un onglet Gmail separe, pre-rempli et personnalise.
            </p>
          </div>

          {/* Right: Company list */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Entreprises ({companies.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {companies.length === 0 ? (
                  <div className="px-6 py-8 text-center text-muted-foreground">
                    <Mail className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p>Aucune entreprise avec email trouvee.</p>
                    <Link href="/search">
                      <Button variant="outline" className="mt-3" size="sm">
                        Retour a la recherche
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y max-h-[700px] overflow-y-auto">
                    {companies.map((company, index) => (
                      <div
                        key={company.id}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          currentIndex === index ? 'bg-blue-50' : ''
                        }`}
                      >
                        {getStatusIcon(statuses[company.id])}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{company.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{company.email}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs border ${getStatusBadge(statuses[company.id])}`}>
                          {getStatusLabel(statuses[company.id])}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs"
                            onClick={() => openGmailCompose(company, index)}
                            disabled={statuses[company.id] === 'opened'}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Gmail
                          </Button>
                          {statuses[company.id] !== 'opened' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-xs text-muted-foreground"
                              onClick={() => skipCompany(company.id)}
                            >
                              Ignorer
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmailCampaignPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    }>
      <EmailCampaignContent />
    </Suspense>
  );
}
