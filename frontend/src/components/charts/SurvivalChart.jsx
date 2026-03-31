import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SurvivalChart = ({ data }) => {
  const chartData = data.map((val, i) => ({
    name: `Year ${i + 1}`,
    value: val
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 'bold' }} 
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
            contentStyle={{ backgroundColor: '#161d2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`rgba(245, 158, 11, ${1 - (index * 0.15)})`} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SurvivalChart;
