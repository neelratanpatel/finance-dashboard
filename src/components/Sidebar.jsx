import { LayoutDashboard, Target, PiggyBank, BarChart3, Settings } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const menu = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, active: true },
    { name: 'Accounts', icon: <PiggyBank size={20}/> },
    { name: 'Budgets', icon: <Target size={20}/> },
    { name: 'Reports', icon: <BarChart3 size={20}/> },
    { name: 'Settings', icon: <Settings size={20}/> },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">F</div>
        <span className="brand-name">FinTrack</span>
      </div>
      <nav className="side-nav">
        {menu.map((item) => (
          <div key={item.name} className={`nav-link ₹{item.active ? 'active' : ''}`}>
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}