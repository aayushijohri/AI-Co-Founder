import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const RevenueChart = ({ data, revenue }) => {
  const chartData = data.map((val, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    users: val,
    revenue: revenue[i]
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 'bold' }} 
          />
          <YAxis hide />
          <Tooltip 
            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
            contentStyle={{ backgroundColor: '#161d2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#06b6d4" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTeal)" 
            dot={false}
            activeDot={{ r: 6, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
