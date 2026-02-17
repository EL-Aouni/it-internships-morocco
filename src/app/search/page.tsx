'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, Briefcase, Mail, Phone, Globe, Copy, Home } from 'lucide-react';

type Company = {
  id: number;
  name: string;
  city: string;
  speciality: string;
  email?: string;
  phone: string | null;
  website?: string | null;
  linkedin?: string;
  address: string;
  priority: 'high' | 'medium' | 'low';
  description: string | null;
};

export default function SearchPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [city, setCity] = useState<string>('all');
  const [speciality, setSpeciality] = useState<string>('all');
  const [priority, setPriority] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePath = process.env.NODE_ENV === 'production' 
      ? '/it-internships-morocco' 
      : '';
    
    fetch(`${basePath}/companies.json`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load companies');
        return res.json();
      })
      .then(data => {
        console.log('Loaded companies:', data.length);
        console.log('First company:', data[0]);
        setCompanies(data);
        setFilteredCompanies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading companies:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = companies;

    if (city !== 'all') {
      filtered = filtered.filter(c => c.city === city);
    }

    if (speciality !== 'all') {
      filtered = filtered.filter(c => c.speciality === speciality);
    }

    if (priority !== 'all') {
      filtered = filtered.filter(c => c.priority === priority);
    }

    setFilteredCompanies(filtered);
  }, [city, speciality, priority, companies]);

  const cities = [...new Set(companies.map(c => c.city))].sort();
  const specialities = [...new Set(companies.map(c => c.speciality))].sort();

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    alert('Email copié!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer hover:text-primary/80">
              IT Internships Morocco
            </h1>
          </Link>
          <Link href="/">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Search for Internships</h2>
          <p className="text-muted-foreground mb-6">
            Filter by city, specialty, and priority
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Specialty</label>
              <Select value={speciality} onValueChange={setSpeciality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialities.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!loading && (
            <div className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredCompanies.length}</span> companies
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(company.priority)}`}>
                      {company.priority}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {company.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* ADRESSE - NOUVELLE! */}
                  <div className="flex items-start text-sm bg-slate-50 p-2 rounded">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs leading-relaxed">{company.address}</span>
                  </div>

                  {/* Ville */}
                  <div className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">{company.city}</span>
                  </div>

                  {/* Spécialité */}
                  <div className="flex items-center text-sm">
                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{company.speciality}</span>
                  </div>

                  {/* LinkedIn - TOUJOURS AFFICHÉ */}
                  {company.linkedin && (
                    <div className="flex items-center text-sm">
                      <svg className="h-4 w-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 truncate text-xs hover:underline text-blue-600 font-medium">
                        LinkedIn - Postuler
                      </a>
                    </div>
                  )}

                  {/* Email - En option si disponible */}
                  {company.email && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-3 w-3 mr-2" />
                      <span className="flex-1 truncate text-xs italic">
                        (Email: {company.email})
                      </span>
                    </div>
                  )}

                  {/* Téléphone */}
                  {company.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-xs">{company.phone}</span>
                    </div>
                  )}
                </CardContent>
                
                {/* Site Web */}
                {company.website && (
                  <CardFooter>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="outline" className="w-full" size="sm">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </Button>
                    </a>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No companies found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
