'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// ---- TYPES ----
type Internship = {
  id?: string
  company: string
  title: string
  city?: string
  type?: string
  domain?: string
  mode?: string
  updatedAt?: string
}

// ---- HELPERS ----
function getFreshness(date?: string) {
  if (!date) return '🟡 Recent'
  const days = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
  if (days < 7) return '🟢 New'
  if (days < 30) return '🟡 Recent'
  return '🔴 Old'
}

export default function SearchPage() {
  const [data, setData] = useState<Internship[]>([])
  const [query, setQuery] = useState('')

  // filters
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const [domain, setDomain] = useState('')
  const [mode, setMode] = useState('')

  const [dark, setDark] = useState(false)

  // ---- LOAD DATA ----
  useEffect(() => {
    fetch('/companies.json')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData([]))
  }, [])

  // ---- FILTER LOGIC ----
  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchesQuery =
        !query ||
        item.company?.toLowerCase().includes(query.toLowerCase()) ||
        item.title?.toLowerCase().includes(query.toLowerCase())

      const matchesCity = !city || item.city === city
      const matchesType = !type || item.type === type
      const matchesDomain = !domain || item.domain === domain
      const matchesMode = !mode || item.mode === mode

      return (
        matchesQuery &&
        matchesCity &&
        matchesType &&
        matchesDomain &&
        matchesMode
      )
    })
  }, [data, query, city, type, domain, mode])

  // ---- UNIQUE VALUES ----
  const cities = [...new Set(data.map((d) => d.city).filter(Boolean))]
  const types = [...new Set(data.map((d) => d.type).filter(Boolean))]
  const domains = [...new Set(data.map((d) => d.domain).filter(Boolean))]
  const modes = [...new Set(data.map((d) => d.mode).filter(Boolean))]

  return (
    <div className={dark ? 'dark bg-slate-950 text-white min-h-screen' : 'bg-slate-50 min-h-screen'}>
      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* 🔥 HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">IT Internships Morocco</h1>
            <p className="text-sm opacity-70">Find your PFA, PFE or IT internship faster</p>
          </div>

          <Button onClick={() => setDark(!dark)}>
            {dark ? '☀️ Light' : '🌙 Dark'}
          </Button>
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{data.length}+</div>
              <div className="text-sm opacity-70">Internships indexed</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{cities.length}+</div>
              <div className="text-sm opacity-70">Cities covered</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">Morocco 🇲🇦</div>
              <div className="text-sm opacity-70">Helping students</div>
            </CardContent>
          </Card>
        </div>

        {/* 🔍 SEARCH */}
        <input
          className="w-full p-3 rounded-xl border"
          placeholder="Search company or role..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* 🎯 FILTERS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <select className="p-2 rounded-lg border" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select className="p-2 rounded-lg border" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select className="p-2 rounded-lg border" value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="">All Domains</option>
            {domains.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select className="p-2 rounded-lg border" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="">Work Mode</option>
            {modes.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <Button onClick={() => {
            setCity(''); setType(''); setDomain(''); setMode(''); setQuery('')
          }}>
            Reset
          </Button>
        </div>

        {/* 🧾 RESULTS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, idx) => (
            <Card
              key={idx}
              className="rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200"
            >
              <CardContent className="p-5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <span className="text-xs whitespace-nowrap">
                    {getFreshness(item.updatedAt)}
                  </span>
                </div>

                <p className="text-sm opacity-80">🏢 {item.company}</p>
                {item.city && <p className="text-sm">📍 {item.city}</p>}
                {item.type && <p className="text-sm">🎓 {item.type}</p>}
                {item.domain && <p className="text-sm">💻 {item.domain}</p>}
                {item.mode && <p className="text-sm">🏢 {item.mode}</p>}

                <Button className="w-full mt-2">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center opacity-60 py-10">
            No internships found 😢
          </div>
        )}
      </div>
    </div>
  )
}
