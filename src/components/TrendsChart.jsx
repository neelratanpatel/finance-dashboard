import { useSelector } from 'react-redux';
import { 
  ResponsiveContainer, 
  ComposedChart, // Use ComposedChart to combine bars and lines
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import './TrendsChart.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; 

    return (
      <div className="custom-tooltip" style={{
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        border: 'none'
      }}>
        {/* Header: Date */}
        <p style={{ 
          margin: '0 0 10px 0', 
          fontWeight: '700', 
          color: '#1b2559',
          borderBottom: '1px solid #f0f2f5',
          paddingBottom: '5px'
        }}>{data.dateLabel}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {/* Always show Balance */}
          <p style={{ margin: 0, color: '#4318ff', fontWeight: '600', fontSize: '14px' }}>
            Balance: ₹{data.balance.toLocaleString('en-IN')}
          </p>

          {/* ONLY show Income if > 0 */}
          {data.income > 0 && (
            <p style={{ margin: 0, color: '#05cd99', fontSize: '13px' }}>
              Income: +₹{data.income.toLocaleString('en-IN')}
            </p>
          )}

          {/* ONLY show Expense if > 0 */}
          {data.expense > 0 && (
            <p style={{ margin: 0, color: '#ee5d50', fontSize: '13px' }}>
              Expense: -₹{data.expense.toLocaleString('en-IN')}
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function TrendsChart({ className }) {
  const transactions = useSelector((state) => state.finance.transactions);

  const groupedByDate = transactions.reduce((acc, tx) => {
    const date = tx.date;
    if (!acc[date]) acc[date] = { income: 0, expense: 0 };
    if (tx.type === 'Income') acc[date].income += tx.amount;
    else acc[date].expense += tx.amount;
    return acc;
  }, {});

  let runningBalance = 0;
  const chartData = Object.keys(groupedByDate)
    .sort() 
    .map((date) => {
      const dayNet = groupedByDate[date].income - groupedByDate[date].expense;
      runningBalance += dayNet;
      
      return {
        // Use this for the X-Axis
        name: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        // Use this for the Tooltip Header to avoid "1, 2, 3"
        dateLabel: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        balance: runningBalance,
        income: groupedByDate[date].income,
        expense: groupedByDate[date].expense,
      };
    });

  return (
    <div className={`chart-container ${className}`}>
      <div className="chart-header">
        <h3 className="chart-title">Financial Trend</h3>
      </div>
      
      <div style={{ width: '100%', height: '350px' , minWidth: '0'}}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4318ff" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4318ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#a3aed0" fontSize={12} tickMargin={10} />
            <YAxis axisLine={false} tickLine={false} stroke="#a3aed0" fontSize={12} tickMargin={10} tickFormatter={(val) => `₹${val.toLocaleString('en-IN')}`} />
            
            <Tooltip content={<CustomTooltip />} />
   
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#4318ff" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorBalance)" 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}