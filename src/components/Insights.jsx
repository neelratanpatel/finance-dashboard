import { useSelector } from 'react-redux';
import { TrendingUp, Zap, CalendarDays } from 'lucide-react';
import './Insights.css'; // Don't forget to import!

export default function Insights() {
  const transactions = useSelector((state) => state.finance.transactions);

  const expenseCategories = transactions
    .filter(tx => tx.type === 'Expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const highestSpendingCategory = Object.entries(expenseCategories).reduce((a, b) => a[1] > b[1] ? a : b, [null, 0]);

  const insights = [
    {
      title: 'Highest Spending',
      description: highestSpendingCategory[0] 
        ? `You spent ₹${highestSpendingCategory[1].toLocaleString('en-IN')} on ${highestSpendingCategory[0]}.` 
        : 'No expenses yet.',
      icon: TrendingUp,
      color: 'amber',
    },
    {
      title: 'Savings Potential',
      description: 'Reducing recurring expenses could boost your balance by 15%.',
      icon: Zap,
      color: 'blue',
    },
    {
      title: 'Monthly Goal',
      description: 'You are on track to save ₹5,000 more than last month.',
      icon: CalendarDays,
      color: 'emerald',
    },
  ];

  return (
    <div className="insights-container">
      <h3 className="insights-header">Financial Insights</h3>
      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className={`insight-card ${insight.color}`}>
            <div className="insight-icon-wrapper">
              <insight.icon size={24} />
            </div>
            <div className="insight-text">
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}