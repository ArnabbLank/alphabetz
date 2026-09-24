'use client';

import { Building2, MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { centers } from '@/lib/dummy-data';
import { Card, CardHeader, CardTitle } from '@/components/shared/Card';

const mainCenter = centers[0];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Institute profile and configuration</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Institute Profile */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="md">
            <CardHeader>
              <CardTitle>Institute Profile</CardTitle>
            </CardHeader>

            <div className="space-y-5">
              {/* Logo placeholder */}
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-white">
                  A
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Alphabetz</h3>
                  <p className="text-sm text-gray-500">Premier Coaching Institute</p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
                    <Building2 size={14} />
                    Institute Name
                  </label>
                  <p className="text-sm font-medium text-gray-900">Alphabetz Coaching Institute</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
                    <Mail size={14} />
                    Email
                  </label>
                  <p className="text-sm font-medium text-gray-900">{mainCenter.email}</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
                    <Phone size={14} />
                    Phone
                  </label>
                  <p className="text-sm font-medium text-gray-900">{mainCenter.phone}</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
                    <Globe size={14} />
                    Website
                  </label>
                  <p className="text-sm font-medium text-gray-900">www.alphabetz.in</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 sm:col-span-2">
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
                    <MapPin size={14} />
                    Address
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {mainCenter.address}, {mainCenter.city}, {mainCenter.state} — {mainCenter.pincode}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Centers */}
          <Card padding="md">
            <CardHeader>
              <CardTitle>Centers</CardTitle>
              <span className="text-xs text-gray-500">{centers.length} centers</span>
            </CardHeader>
            <div className="space-y-3">
              {centers.map((center) => (
                <div key={center.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{center.name}</h4>
                      <p className="mt-1 text-sm text-gray-600">{center.address}, {center.city} — {center.pincode}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone size={12} />
                          {center.phone}
                        </span>
                        {center.email && (
                          <span className="flex items-center gap-1">
                            <Mail size={12} />
                            {center.email}
                          </span>
                        )}
                        <span>Capacity: {center.capacity}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      center.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {center.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <Card padding="md">
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Plan</span>
                <span className="font-medium text-gray-900">Premium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Founded</span>
                <span className="font-medium text-gray-900">2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Total Centers</span>
                <span className="font-medium text-gray-900">{centers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Total Capacity</span>
                <span className="font-medium text-gray-900">{centers.reduce((s, c) => s + c.capacity, 0)}</span>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
            </CardHeader>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-gray-700">Mon – Sat: 6:30 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-gray-700">Sunday: 10:00 AM – 2:00 PM</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
