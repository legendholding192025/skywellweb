'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Phone, Car, Calculator, Mail, FileText, Wrench } from 'lucide-react';
import Cookies from 'js-cookie';
import AdminLayout from '@/components/admin/AdminLayout';

interface LeadCounts {
  contacts: number;
  testDrives: number;
  quotes: number;
  newsletter: number;
  blogs: number;
  services: number;
}

const statCards = [
  {
    title: 'Service Bookings',
    href: '/admin/services',
    icon: Wrench,
    color: 'bg-orange-500',
    key: 'services'
  },
  {
    title: 'Contact Leads',
    href: '/admin/contacts',
    icon: Phone,
    color: 'bg-blue-500',
    key: 'contacts'
  },
  {
    title: 'Test Drive Requests',
    href: '/admin/test-drive',
    icon: Car,
    color: 'bg-green-500',
    key: 'testDrives'
  },
  {
    title: 'Quote Requests',
    href: '/admin/quotes',
    icon: Calculator,
    color: 'bg-purple-500',
    key: 'quotes'
  },
  {
    title: 'Newsletter Subscribers',
    href: '/admin/newsletter',
    icon: Mail,
    color: 'bg-yellow-500',
    key: 'newsletter'
  },
  {
    title: 'Blog Posts',
    href: '/admin/blogs',
    icon: FileText,
    color: 'bg-red-500',
    key: 'blogs'
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [leadCounts, setLeadCounts] = useState<LeadCounts>({
    contacts: 0,
    testDrives: 0,
    quotes: 0,
    newsletter: 0,
    blogs: 0,
    services: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchCounts = async () => {
      try {
        const response = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        if (data.success) {
          setLeadCounts(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [router]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${card.color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                    <card.icon className={`h-6 w-6 ${card.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{card.title}</h3>
                    <p className="text-2xl font-semibold text-[#4a9cd6]">
                      {leadCounts[card.key as keyof LeadCounts]}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-gray-600">
            Coming soon: Activity feed showing recent form submissions and updates.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
} 