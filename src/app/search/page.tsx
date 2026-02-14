'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// ================= TYPES =================
type Company = {
  id: number
  name: string
  city?: string
  speciality?: string
  email?: string
  phone?: string
  website?: string
  priority?: string
  description?: string
}

// ================= HELPERS =================
function getPriorityBadge(priority?: string) {
  if (!priority) return '🟡 Normal'
  if (priority === 'high') return '🟢 High'
  if (priority === 'medium') return '🟡 Medium'
  return '🔴 Low'
}

function loadFavorites(): number[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
  } catch {
    return []
  }
}

function saveFavorites(favs: number[]) {
  localStorage.setItem('favorites', JSON.stringify(favs))
}

// ================= PAGE =================
export default function SearchPage() {
  const [data, setData] = useState<Company[]>([])
  const [query, setQuery] = useState('')

  // filters
  const [city, setCity] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [priority, setPriority] = useState('')

  const [dark, setDark] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  // ================= LOAD =================
  useEffect(() => {
    fetch('/companies.json')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData([]))

    setFavorites(loadFavorites())
  }, [])

  // ================= FAVORITES =================
  function toggleFavorite(id: number) {
    setFavorites((prev) => {
      const exists = prev.includes(id)
      const updated = exists ? prev.filter((x) => x !== id) : [...prev, id]
      saveFavorites(updated)
      return updated
    })
  }

  // ================= FILTER =================
  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchesQuery =
        !query ||
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.speciality?.toLowerCase().includes(query.toLowerCase())

      const matchesCity = !city || item.city === city
      const matchesSpec = !speciality || item.speciality === speciality
      const matchesPriority = !priority || item.priority === priority

      return matchesQuery && matchesCity && matchesSpec && matchesPriority
    })
  }, [data, query, city, speciality, priority])

  // ================= UNIQUE VALUES =================
  const cities = [...new Set(data.map((d) => d.city).filter(Boolean))]
  const specialities = [...new Set(data.map((d) => d.speciality).filter(Boolean))]
  const priorities = [...new Set(data.map((d) => d.priority).filter(Boolean))]

  // ================= RENDER =================
  return (
    <div className={dark ? 'dark bg-slate-950 text-white min-h-screen' : 'bg-slate-50 min-h-screen'}>
      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">IT Internships Morocco</h1>
            <p className="text-sm opacity-70">Find companies offering internships in Morocco</p>
          </div>

          <Button onClick={() => setDark(!dark)}>
            {dark ? '☀️ Light' : '🌙 Dark'}
          </Button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{data.length}+</div>
              <div className="text-sm opacity-70">Companies indexed</div>
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
              <div className="text-2xl font-bold">🇲🇦</div>
              <div className="text-sm opacity-70">Helping Moroccan students</div>
            </CardContent>
          </Card>
        </div>

        {/* SEARCH */}
        <input
          className="w-full p-3 rounded-xl border"
          placeholder="Search company or speciality..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* FILTERS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select className="p-2 rounded-lg border" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            className="p-2 rounded-lg border"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
            <option value="">All Domains</option>
            {specialities.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            className="p-2 rounded-lg border"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priority</option>
            {priorities.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <Button
            onClick={() => {
              setCity('')
              setSpeciality('')
              setPriority('')
              setQuery('')
            }}
          >
            Reset
          </Button>
        </div>

        {/* RESULTS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isFav = favorites.includes(item.id)

            return (
              <Card
                key={item.id}
                className="rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200"
              >
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className="text-xs whitespace-nowrap">
                      {getPriorityBadge(item.priority)}
                    </span>
                  </div>

                  {item.city && <p className="text-sm">📍 {item.city}</p>}
                  {item.speciality && <p className="text-sm">💻 {item.speciality}</p>}

                  {item.description && (
                    <p className="text-xs opacity-70 line-clamp-3">{item.description}</p>
                  )}

                  <div className="flex gap-2 pt-2">
                    {item.website && (
                      <a href={item.website} target="_blank">
                        <Button className="w-full">Visit</Button>
                      </a>
                    )}

                    <Button
                      variant={isFav ? 'default' : 'outline'}
                      onClick={() => toggleFavorite(item.id)}
                    >
                      {isFav ? '❤️ Saved' : '🤍 Save'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center opacity-60 py-10">
            No companies found 😢
          </div>
        )}

        {/* SUBMIT CTA */}
        <div className="text-center pt-10">
          <a href="/submit">
            <Button className="px-8 py-3 text-lg rounded-2xl">
              ➕ Submit Internship
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
