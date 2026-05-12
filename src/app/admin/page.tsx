'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './dashboard.css';

interface DashboardStats {
  projects: number;
  messages: number;
  visitors: number;
}

interface VisitorData {
  timestamp: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    messages: 0,
    visitors: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartMode, setChartMode] = useState<'daily' | 'monthly'>('daily');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch counts
        const [projectsSnap, contactsSnap, visitorsSnap] = await Promise.all([
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'contacts')),
          getDocs(collection(db, 'visitors')),
        ]);

        setStats({
          projects: projectsSnap.size,
          messages: contactsSnap.size,
          visitors: visitorsSnap.size,
        });

        // Process visitors for chart
        const visitors: VisitorData[] = [];
        visitorsSnap.forEach((doc) => {
          visitors.push(doc.data() as VisitorData);
        });

        processChartData(visitors, chartMode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [chartMode]);

  const processChartData = (visitors: VisitorData[], mode: 'daily' | 'monthly') => {
    const dataMap: Record<string, number> = {};
    const now = new Date();

    if (mode === 'daily') {
      // Last 14 days
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        const key = d.toISOString().split('T')[0];
        dataMap[key] = 0;
      }

      visitors.forEach((v) => {
        if (!v.timestamp) return;
        const key = v.timestamp.split('T')[0];
        if (dataMap[key] !== undefined) {
          dataMap[key]++;
        }
      });
    } else {
      // Last 12 months
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        dataMap[key] = 0;
      }

      visitors.forEach((v) => {
        if (!v.timestamp) return;
        const d = new Date(v.timestamp);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (dataMap[key] !== undefined) {
          dataMap[key]++;
        }
      });
    }

    const formattedData = Object.keys(dataMap).map((key) => ({
      name: key,
      Ziyaretci: dataMap[key],
    }));

    setChartData(formattedData);
  };

  if (loading) {
    return <div className="dash-loader">Yükleniyor...</div>;
  }

  return (
    <div className="dash-wrapper">
      <div className="dash-header">
        <div>
          <h2 className="dash-title">Yönetim Özeti</h2>
          <p className="dash-subtitle">Sitenizin genel istatistikleri ve ziyaretçi trafiği.</p>
        </div>
      </div>

      <div className="dash-metrics">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Toplam Ziyaretçi</span>
            <div className="metric-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <div className="metric-value">{stats.visitors}</div>
          <div className="metric-subtitle">Tüm zamanlar</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Toplam Proje</span>
            <div className="metric-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
          </div>
          <div className="metric-value">{stats.projects}</div>
          <div className="metric-subtitle">Portfolyoda yayınlanan</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Gelen Mesajlar</span>
            <div className="metric-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </div>
          <div className="metric-value">{stats.messages}</div>
          <div className="metric-subtitle">İletişim formu üzerinden</div>
        </div>
      </div>

      <div className="dash-charts">
        <div className="chart-header">
          <span className="chart-title">Ziyaretçi Trafiği</span>
          <div className="chart-toggles">
            <button
              className={`chart-toggle-btn ${chartMode === 'daily' ? 'active' : ''}`}
              onClick={() => setChartMode('daily')}
            >
              Günlük
            </button>
            <button
              className={`chart-toggle-btn ${chartMode === 'monthly' ? 'active' : ''}`}
              onClick={() => setChartMode('monthly')}
            >
              Aylık
            </button>
          </div>
        </div>
        
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                dx={-10}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }} 
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area 
                type="monotone" 
                dataKey="Ziyaretci" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVisits)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}