import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../store/financeSlice';
import { Trash2, Edit2 } from 'lucide-react';
import './TransactionTable.css';

export default function TransactionTable() {
  const { transactions, currentRole, searchQuery } = useSelector((state) => state.finance);
  const dispatch = useDispatch();

  const filteredData = transactions.filter(t => 
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card-container">
      <div className="card-header">
        <h3>Recent Transactions</h3>
      </div>
      <table className="custom-table">
        <tbody>
          {filteredData.map(tx => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td><strong>{tx.category}</strong></td>
              <td><span className={`tag ${tx.type.toLowerCase()}`}>{tx.type}</span></td>
              <td className="amount">₹{tx.amount}</td>
              {currentRole === 'Admin' && (
                <td>
                  {/* <button className="action-btn edit"><Edit2 size={16}/></button> */}
                  <button 
                    className="action-btn delete" 
                    onClick={() => dispatch(deleteTransaction(tx.id))}
                  >
                    <Trash2 size={16}/>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}