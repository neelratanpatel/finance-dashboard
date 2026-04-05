import { useSelector } from 'react-redux';
import {IndianRupee, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import './SummaryCards.css';

export default function SummaryCards() {
  const transactions = useSelector((state) => state.finance.transactions);

  // Parse amounts to ensure they are treated as numbers
  const totals = transactions.reduce((acc, tx) => {
    const amount = parseFloat(tx.amount) || 0;
    if (tx.type === 'Income') {
      acc.income += amount;
    } else {
      acc.expense += amount;
    }
    return acc;
  }, { income: 0, expense: 0 });

  const totalBalance = totals.income - totals.expense;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon blue"><IndianRupee size={24} /></div>
        <div className="stat-content">
          <p>Total Balance</p>
          {/* Added minimumFractionDigits for consistent decimal look */}
          <h3>₹{totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon green"><ArrowUpCircle/></div>
        <div className="stat-content">
          <p>Total Income</p>
          <h3 style={{color: 'var(--success)'}}>
            ₹{totals.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon red"><ArrowDownCircle/></div>
        <div className="stat-content">
          <p>Total Expenses</p>
          <h3 style={{color: 'var(--error)'}}>
            {totals.expense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h3>
        </div>
      </div>
    </div>
  );
}