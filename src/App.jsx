import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import TrendsChart from './components/TrendsChart';
import SpendingBreakdown from './components/SpendingBreakdown';
import TransactionTable from './components/TransactionTable';
import Insights from './components/Insights';
import './App.css';

export default function App() {
  const transactions = useSelector((state) => state.finance.transactions);

  return (
    <div className="app-container">
      {/* <Sidebar /> */}
      <div className="content-wrapper">
        <Header />
        <main className="dashboard-main">
          <SummaryCards transactions={transactions} />
          <div className="viz-grid">
            <TrendsChart transactions={transactions} />
            <SpendingBreakdown transactions={transactions} />
          </div>
          <TransactionTable />
          <Insights transactions={transactions} />
        </main>
      </div>
    </div>
  );
}