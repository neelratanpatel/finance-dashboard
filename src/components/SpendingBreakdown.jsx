// src/components/SpendingBreakdown.jsx
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function SpendingBreakdown({ transactions }) {
  const expenseData = transactions
    .filter(tx => tx.type === 'Expense')
    .reduce((acc, tx) => {
      const existing = acc.find(item => item.name === tx.category);
      if (existing) {
        existing.value += tx.amount;
      } else {
        acc.push({ name: tx.category, value: tx.amount });
      }
      return acc;
    }, []);

  return (
    <div className="chart-container p-6 rounded-2xl no-border" >
      <h3 className="text-lg font-semibold mb-2">Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expenseData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            cornerRadius={8}
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '10px' }}
            formatter={(value) => `${value.toFixed(2)}`}
          />
          <Legend 
            iconType="circle" 
            wrapperStyle={{ fontSize: '12px', color: '#6b7280' }}
            formatter={(value, entry) => <span className="text-gray-600 ml-2">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}