import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

const DonutChart = ({ data, totalLabel }) => {
  const COLORS = ['#7c3aed', '#ef4444', '#f59e0b'];

  return (
    <div className="h-64 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-heading font-extrabold text-white">{totalLabel}</span>
        <span className="text-[10px] text-text-muted font-black uppercase tracking-widest">Would Use</span>
      </div>
    </div>
  );
};

export default DonutChart;
