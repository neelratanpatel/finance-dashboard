import { useSelector, useDispatch } from 'react-redux';
import { setCurrentRole, setSearchQuery } from '../store/financeSlice';
import { Bell, Search, UserCircle } from 'lucide-react';
import './Header.css';

export default function Header() {
  const currentRole = useSelector((state) => state.finance.currentRole);
  const dispatch = useDispatch();

  return (
    <header className="main-header">
      <div className="header-left">
        <h1 className="header-title">Main Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search..." 
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
        <select 
          className="role-selector"
          value={currentRole} 
          onChange={(e) => dispatch(setCurrentRole(e.target.value))}
        >
          <option value="Admin">Admin Mode</option>
          <option value="Viewer">Viewer Mode</option>
        </select>
        <button className="icon-btn"><Bell size={20}/></button>
        <UserCircle size={35} className="profile-icon" />
      </div>
    </header>
  );
}