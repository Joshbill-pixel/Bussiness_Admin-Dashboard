import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);

  const orders = [
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'No4, gregory str.', amount: '#20,000', status: 'New Order' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'Sam close, Kubwa', amount: '#20,000', status: 'On Delivery' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'No4, gregory str.', amount: '#20,000', status: 'On Delivery' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'Sam close, Kubwa', amount: '#20,000', status: 'New Order' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'No4, gregory str.', amount: '#20,000', status: 'New Order' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'Sam close, Kubwa', amount: '#20,000', status: 'New Order' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'No4, gregory str.', amount: '#20,000', status: 'New Order' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'Sam close, Kubwa', amount: '#20,000', status: 'On Delivery' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'No4, gregory str.', amount: '#20,000', status: 'On Delivery' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'Sam close, Kubwa', amount: '#20,000', status: 'New Order' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'No4, gregory str.', amount: '#20,000', status: 'New Order' },
    { id: '#346224', date: '21st May 2024, 8:25 AM', customer: 'Mathew Jennings', location: 'Sam close, Kubwa', amount: '#20,000', status: 'New Order' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New Order':
        return 'bg-red-50 text-red-600';
      case 'On Delivery':
        return 'bg-blue-50 text-blue-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-500 text-sm sm:text-base">Here is your order list data</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* DESKTOP / TABLET: Table (visible sm+) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span>Order ID</span>
                    <ArrowUpDown size={16} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span>Date</span>
                    <ArrowUpDown size={16} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.location}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE: Card list (visible on small screens) */}
        <div className="sm:hidden divide-y divide-gray-100">
          {orders.map((order, idx) => (
            <div key={idx} className="px-4 py-4">
              <div className="flex items-start justify-between space-x-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-semibold text-gray-800 truncate">{order.id}</p>
                      <span className={`text-xs font-medium ${getStatusStyle(order.status)} px-2 py-0.5 rounded-full`}>{order.status}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{order.amount}</p>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 truncate">{order.customer} • <span className="hidden xs:inline"> {order.date}</span></p>

                  <p className="text-xs text-gray-500 mt-1 truncate">{order.location}</p>

                  {/* Date (second line for very small screens) */}
                  <p className="text-xs text-gray-400 mt-1 sm:hidden">{order.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-200">
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              <ChevronLeft size={18} />
              <span className="text-sm">Previous</span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-medium ${
                    currentPage === page ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
            <button className="flex items-center space-x-2 px-3 py-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors">
              <span className="text-sm">Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}