import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, DollarSign, FileText, Users } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  Chart,
  DoughnutController,
  LineController,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Filler,
} from 'chart.js';

// Register required Chart.js components
Chart.register(
  DoughnutController,
  LineController,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartTooltip,
  Filler
);

export default function DashboardChartJS() {
  const donutRef = useRef(null);
  const revenueRef = useRef(null);
  const donutChartRef = useRef(null);
  const revenueChartRef = useRef(null);

  const [donutCenter, setDonutCenter] = useState('100%');
  const [hoveredItem, setHoveredItem] = useState(null);

  const stats = [
    { icon: ShoppingBag, label: "Total Menu's", value: '30', change: 'all varieties', changeColor: 'text-gray-500', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    { icon: DollarSign, label: 'Total Revenue', value: '160K', change: 'this week', changeColor: 'text-emerald-600', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    { icon: FileText, label: 'Total Orders', value: '30', change: 'this week', changeColor: 'text-red-600', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    { icon: Users, label: 'Total Customers', value: '40', change: 'all time', changeColor: 'text-gray-500', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  ];

  const orderSummaryData = [
    { label: 'On Delivery', value: 45, color: '#10b981', caption: '45%', description: 'Currently in progress' },
    { label: 'Delivered', value: 40, color: '#fb923c', caption: '40%', description: 'Successfully delivered' },
    { label: 'Cancelled', value: 14, color: '#ef4444', caption: '14%', description: 'Orders cancelled by users' },
  ];

  const customerData = [
    { name: 'Mon', customers: 30 },
    { name: 'Tue', customers: 45 },
    { name: 'Wed', customers: 35 },
    { name: 'Thu', customers: 55 },
    { name: 'Fri', customers: 40 },
    { name: 'Sat', customers: 60 },
    { name: 'Sun', customers: 50 },
  ];

  // --- Chart.js Donut Chart ---
  useEffect(() => {
    if (donutChartRef.current) {
      donutChartRef.current.destroy();
      donutChartRef.current = null;
    }

    const chart = new Chart(donutRef.current, {
      type: 'doughnut',
      data: {
        labels: orderSummaryData.map(d => d.label),
        datasets: [
          {
            data: orderSummaryData.map(d => d.value),
            backgroundColor: orderSummaryData.map(d => d.color),
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: '70%',
        responsive: true,
        plugins: { tooltip: { enabled: true }, legend: { display: false } },
        animation: { animateRotate: true, duration: 1500, easing: 'easeOutCubic' },
        onHover: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const percent = orderSummaryData[index].caption;
            setDonutCenter(percent);
          } else {
            setDonutCenter('100%');
          }
        },
      },
    });

    donutChartRef.current = chart;
    return () => chart.destroy();
  }, []);

  // --- Chart.js Revenue Line/Area Chart ---
  useEffect(() => {
    if (revenueChartRef.current) {
      revenueChartRef.current.destroy();
      revenueChartRef.current = null;
    }

    const ctx = revenueRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
    gradient.addColorStop(0, 'rgba(16,185,129,0.3)');
    gradient.addColorStop(1, 'rgba(16,185,129,0)');

    const chart = new Chart(revenueRef.current, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [40, 55, 48, 52, 59, 53, 60, 62, 64, 58, 68, 54],
            borderColor: '#10b981',
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (ctx) => ` $${(ctx.parsed.y * 1000).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: { ticks: { color: '#6b7280' }, grid: { display: false } },
          y: {
            ticks: {
              color: '#6b7280',
              callback: (v) => `$${(v * 1000).toLocaleString()}`,
            },
            grid: { color: '#f3f4f6' },
          },
        },
        interaction: { intersect: false, mode: 'index' },
      },
    });

    revenueChartRef.current = chart;
    return () => chart.destroy();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm sm:text-base">Welcome to Uncle Tee's Admin</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm mb-2">{stat.label}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className={`text-xs sm:text-sm ${stat.changeColor}`}>{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-2 sm:p-3 rounded-full`}>
                  <Icon className={stat.iconColor} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders + Revenue Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Orders Summary (Chart.js Donut) */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm relative">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Orders Summary</h2>
            <div className="flex space-x-2 text-xs sm:text-sm">
              <button className="text-gray-400">Monthly</button>
              <button className="text-gray-400">Weekly</button>
              <button className="text-gray-800 font-semibold">Today</button>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40">
              <canvas ref={donutRef} className="w-full h-full" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-lg sm:text-xl font-semibold text-gray-700">{donutCenter}</p>
              </div>
            </div>
          </div>

          {/* Summary text section under donut */}
          <div className="space-y-3 mt-2">
            {orderSummaryData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between relative group cursor-pointer"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 truncate">{item.label}</p>
                    <p className="text-xs text-gray-400 truncate">{item.description}</p>
                  </div>
                </div>

                <div className="flex-1 mx-4 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    className="h-2 rounded-full"
                  />
                </div>

                <span className="text-sm font-semibold text-gray-800">{item.caption}</span>

                {/* Tooltip on hover */}
                {hoveredItem === item && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                    {item.label}: {item.value} Orders
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Revenue (Chart.js Line/Area) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Revenue</h2>
            <p className="text-xs sm:text-sm text-gray-500">Last seven year revenue</p>
          </div>

          <div className="h-48 sm:h-64">
            <canvas ref={revenueRef} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Customer Detail Section (Recharts) */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Customer Detail</h2>
            <p className="text-xs sm:text-sm text-gray-500">Customer statistics overview</p>
          </div>
          <div className="flex space-x-2 text-xs sm:text-sm">
            <button className="text-gray-400 px-2 sm:px-3 py-1">Monthly</button>
            <button className="text-gray-400 px-2 sm:px-3 py-1">Weekly</button>
            <button className="text-emerald-600 font-semibold px-2 sm:px-3 py-1 bg-emerald-50 rounded-lg">Today</button>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="customers" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


// import { ShoppingBag, DollarSign, FileText, Users } from 'lucide-react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';

// export default function Dashboard() {
//   const stats = [
//     { icon: ShoppingBag, label: "Total Menu's", value: '30', change: 'all varieties', changeColor: 'text-gray-500', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
//     { icon: DollarSign, label: 'Total Revenue', value: '160K', change: 'this week', changeColor: 'text-emerald-600', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
//     { icon: FileText, label: 'Total Orders', value: '30', change: 'this week', changeColor: 'text-red-600', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
//     { icon: Users, label: 'Total Customers', value: '40', change: 'all time', changeColor: 'text-gray-500', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
//   ];

//   const orderSummaryData = [
//     { label: 'On Delivery (45%)', value: 45, color: 'bg-emerald-500' },
//     { label: 'Delivered (40%)', value: 75, color: 'bg-orange-400' },
//     { label: 'Cancelled (14%)', value: 8, color: 'bg-red-500' },
//   ];

//   const customerData = [
//     { name: 'Mon', customers: 30 },
//     { name: 'Tue', customers: 45 },
//     { name: 'Wed', customers: 35 },
//     { name: 'Thu', customers: 55 },
//     { name: 'Fri', customers: 40 },
//     { name: 'Sat', customers: 60 },
//     { name: 'Sun', customers: 50 },
//   ];

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6 text-center sm:text-left">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
//         <p className="text-gray-500 text-sm sm:text-base">Welcome to Uncle Tee's Admin</p>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-gray-500 text-xs sm:text-sm mb-2">{stat.label}</p>
//                   <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
//                   <p className={`text-xs sm:text-sm ${stat.changeColor}`}>{stat.change}</p>
//                 </div>
//                 <div className={`${stat.bgColor} p-2 sm:p-3 rounded-full`}>
//                   <Icon className={stat.iconColor} size={24} />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Orders + Revenue Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
//         {/* Orders Summary */}
//         <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
//           <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//             <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Orders Summary</h2>
//             <div className="flex space-x-2 text-xs sm:text-sm">
//               <button className="text-gray-400">Monthly</button>
//               <button className="text-gray-400">Weekly</button>
//               <button className="text-gray-800 font-semibold">Today</button>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-3 sm:space-y-0">
//             <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-sm font-semibold flex items-center">
//               <span className="mr-2">22</span>
//               <span>New Orders</span>
//               <span className="ml-2">▲</span>
//             </div>
//             <button className="text-emerald-600 text-sm">Manage orders</button>
//           </div>

//           <div className="grid grid-cols-3 gap-4 mb-6 text-center sm:text-left">
//             <div>
//               <p className="text-xl sm:text-2xl font-bold text-gray-800">45</p>
//               <p className="text-xs text-gray-500">On Delivery</p>
//             </div>
//             <div>
//               <p className="text-xl sm:text-2xl font-bold text-gray-800">75</p>
//               <p className="text-xs text-gray-500">Delivered</p>
//             </div>
//             <div>
//               <p className="text-xl sm:text-2xl font-bold text-gray-800">8</p>
//               <p className="text-xs text-gray-500">Cancelled</p>
//             </div>
//           </div>

//           {/* Donut Chart */}
//           <div className="relative flex justify-center mb-6">
//             <div className="w-28 h-28 sm:w-40 sm:h-40">
//               <svg
//                 viewBox="0 0 160 160"
//                 className="w-full h-full transform -rotate-90"
//                 preserveAspectRatio="xMidYMid meet"
//               >
//                 <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="20" fill="none" />
//                 <circle cx="80" cy="80" r="70" stroke="#10b981" strokeWidth="20" fill="none" strokeLinecap="round" strokeDasharray="440" strokeDashoffset="110" />
//                 <circle cx="80" cy="80" r="70" stroke="#fb923c" strokeWidth="20" fill="none" strokeLinecap="round" strokeDasharray="440" strokeDashoffset="220" />
//                 <circle cx="80" cy="80" r="70" stroke="#ef4444" strokeWidth="20" fill="none" strokeLinecap="round" strokeDasharray="440" strokeDashoffset="380" />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-sm sm:text-base font-semibold text-gray-700">100%</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3">
//             {orderSummaryData.map((item, index) => (
//               <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex items-center space-x-2 mb-2 sm:mb-0">
//                   <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
//                   <span className="text-sm text-gray-600">{item.label}</span>
//                 </div>
//                 <div className="flex-1 mx-0 sm:mx-4 bg-gray-100 rounded-full h-2">
//                   <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
//                 </div>
//                 <span className="text-sm text-gray-800 font-semibold mt-1 sm:mt-0">{item.value}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Revenue Chart */}
//         <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm">
//           <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//             <h2 className="text-base sm:text-lg font-semibold text-gray-800">Revenue</h2>
//             <p className="text-xs sm:text-sm text-gray-500">Last seven year revenue</p>
//           </div>

//           <div className="h-48 sm:h-64">
//             <svg viewBox="0 0 800 200" className="w-full h-full">
//               <defs>
//                 <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                   <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
//                   <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
//                 </linearGradient>
//               </defs>
//               <path d="M 0 150 Q 50 120, 100 130 T 200 110 T 300 90 T 400 100 T 500 85 T 600 75 T 700 65 T 800 55" stroke="#10b981" strokeWidth="3" fill="none" />
//               <path d="M 0 150 Q 50 120, 100 130 T 200 110 T 300 90 T 400 100 T 500 85 T 600 75 T 700 65 T 800 55 L 800 200 L 0 200 Z" fill="url(#gradient)" />
//             </svg>
//           </div>

//           <div className="flex justify-around mt-4 text-[10px] sm:text-xs text-gray-500 flex-wrap">
//             {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m) => (
//               <span key={m}>{m}</span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ✅ Customer Detail Section (Recharts Integrated) */}
//       <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
//         <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//           <div className="mb-2 sm:mb-0">
//             <h2 className="text-base sm:text-lg font-semibold text-gray-800">Customer Detail</h2>
//             <p className="text-xs sm:text-sm text-gray-500">Customer statistics overview</p>
//           </div>
//           <div className="flex space-x-2 text-xs sm:text-sm">
//             <button className="text-gray-400 px-2 sm:px-3 py-1">Monthly</button>
//             <button className="text-gray-400 px-2 sm:px-3 py-1">Weekly</button>
//             <button className="text-emerald-600 font-semibold px-2 sm:px-3 py-1 bg-emerald-50 rounded-lg">Today</button>
//           </div>
//         </div>

//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={customerData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//               <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//               <YAxis tick={{ fontSize: 12 }} />
//               <Tooltip cursor={{ fill: '#f3f4f6' }} />
//               <Bar dataKey="customers" fill="#10b981" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }


// // import { ShoppingBag, DollarSign, FileText, Users } from 'lucide-react';

// // export default function Dashboard() {
// //   const stats = [
// //     { icon: ShoppingBag, label: 'Total Menu\'s', value: '30', change: 'all varieties', changeColor: 'text-gray-500', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
// //     { icon: DollarSign, label: 'Total Revenue', value: '160K', change: 'this week', changeColor: 'text-emerald-600', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
// //     { icon: FileText, label: 'Total Orders', value: '30', change: 'this week', changeColor: 'text-red-600', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
// //     { icon: Users, label: 'Total Customers', value: '40', change: 'all time', changeColor: 'text-gray-500', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
// //   ];

// //   const orderSummaryData = [
// //     { label: 'On Delivery (45%)', value: 45, color: 'bg-emerald-500' },
// //     { label: 'Delivered (40%)', value: 75, color: 'bg-orange-400' },
// //     { label: 'Cancelled (14%)', value: 8, color: 'bg-red-500' },
// //   ];

// //   const customerData = [5, 6, 5, 7, 11, 9, 10, 8, 7, 9, 7, 10, 7, 5, 3, 7, 10, 11, 9, 6, 7, 11, 10, 5, 12];

// //   return (
// //     <div className="p-8 bg-gray-50 min-h-screen">
// //       <div className="mb-6">
// //         <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
// //         <p className="text-gray-500">Welcome to Uncle Tee's Admin</p>
// //       </div>

// //       <div className="grid grid-cols-4 d-md-grid d-sm-grid gap-6 mb-6">
// //         {stats.map((stat, index) => {
// //           const Icon = stat.icon;
// //           return (
// //             <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
// //               <div className="flex items-start justify-between">
// //                 <div>
// //                   <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
// //                   <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
// //                   <p className={`text-xs ${stat.changeColor}`}>{stat.change}</p>
// //                 </div>
// //                 <div className={`${stat.bgColor} p-3 rounded-full`}>
// //                   <Icon className={stat.iconColor} size={24} />
// //                 </div>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       <div className="grid grid-cols-3 gap-6 mb-6">
// //         <div className="col-span-1 bg-white rounded-xl p-6 shadow-sm">
// //           <div className="flex items-center justify-between mb-6">
// //             <h2 className="text-lg font-semibold text-gray-800">Orders Summary</h2>
// //             <div className="flex space-x-2 text-xs">
// //               <button className="text-gray-400">Monthly</button>
// //               <button className="text-gray-400">Weekly</button>
// //               <button className="text-gray-800 font-semibold">Today</button>
// //             </div>
// //           </div>

// //           <div className="flex items-center justify-between mb-6">
// //             <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-sm font-semibold flex items-center">
// //               <span className="mr-2">22</span>
// //               <span>New Orders</span>
// //               <span className="ml-2">▲</span>
// //             </div>
// //             <button className="text-emerald-600 text-sm">Manage orders</button>
// //           </div>

// //           <div className="grid grid-cols-3 gap-4 mb-6">
// //             <div>
// //               <p className="text-2xl font-bold text-gray-800">45</p>
// //               <p className="text-xs text-gray-500">On Delivery</p>
// //             </div>
// //             <div>
// //               <p className="text-2xl font-bold text-gray-800">75</p>
// //               <p className="text-xs text-gray-500">Delivered</p>
// //             </div>
// //             <div>
// //               <p className="text-2xl font-bold text-gray-800">8</p>
// //               <p className="text-xs text-gray-500">Cancelled</p>
// //             </div>
// //           </div>

// //           <div className="relative pt-4">
// //             <div className="flex items-center justify-center">
// //               <div className="relative w-40 h-40">
// //                 <svg className="transform -rotate-90 w-40 h-40">
// //                   <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="20" fill="none" />
// //                   <circle cx="80" cy="80" r="70" stroke="#10b981" strokeWidth="20" fill="none" strokeDasharray="440" strokeDashoffset="110" />
// //                   <circle cx="80" cy="80" r="70" stroke="#fb923c" strokeWidth="20" fill="none" strokeDasharray="440" strokeDashoffset="220" />
// //                   <circle cx="80" cy="80" r="70" stroke="#ef4444" strokeWidth="20" fill="none" strokeDasharray="440" strokeDashoffset="380" />
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="space-y-3 mt-6">
// //             {orderSummaryData.map((item, index) => (
// //               <div key={index} className="flex items-center justify-between">
// //                 <div className="flex items-center space-x-3">
// //                   <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
// //                   <span className="text-sm text-gray-600">{item.label}</span>
// //                 </div>
// //                 <div className="flex-1 mx-4 bg-gray-100 rounded-full h-2">
// //                   <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
// //                 </div>
// //                 <span className="text-sm text-gray-800 font-semibold">{item.value}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
// //           <div className="flex items-center justify-between mb-6">
// //             <h2 className="text-lg font-semibold text-gray-800">Revenue</h2>
// //             <p className="text-sm text-gray-500">Last seven year revenue</p>
// //           </div>

// //           <div className="h-64">
// //             <svg viewBox="0 0 800 200" className="w-full h-full">
// //               <defs>
// //                 <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
// //                   <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
// //                   <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
// //                 </linearGradient>
// //               </defs>
// //               <path
// //                 d="M 0 150 Q 50 120, 100 130 T 200 110 T 300 90 T 400 100 T 500 85 T 600 75 T 700 65 T 800 55"
// //                 stroke="#10b981"
// //                 strokeWidth="3"
// //                 fill="none"
// //               />
// //               <path
// //                 d="M 0 150 Q 50 120, 100 130 T 200 110 T 300 90 T 400 100 T 500 85 T 600 75 T 700 65 T 800 55 L 800 200 L 0 200 Z"
// //                 fill="url(#gradient)"
// //               />
// //             </svg>
// //           </div>

// //           <div className="flex justify-around mt-4 text-xs text-gray-500">
// //             <span>Jan</span>
// //             <span>Feb</span>
// //             <span>Mar</span>
// //             <span>Apr</span>
// //             <span>May</span>
// //             <span>Jun</span>
// //             <span>Jul</span>
// //             <span>Aug</span>
// //             <span>Sep</span>
// //             <span>Oct</span>
// //             <span>Nov</span>
// //             <span>Dec</span>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-xl p-6 shadow-sm">
// //         <div className="flex items-center justify-between mb-6">
// //           <div>
// //             <h2 className="text-lg font-semibold text-gray-800">Customer Detail</h2>
// //             <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
// //           </div>
// //           <div className="flex space-x-2 text-sm">
// //             <button className="text-gray-400 px-3 py-1">Monthly</button>
// //             <button className="text-gray-400 px-3 py-1">Weekly</button>
// //             <button className="text-emerald-600 font-semibold px-3 py-1 bg-emerald-50 rounded-lg">Today</button>
// //           </div>
// //         </div>

// //         <div className="h-64 flex items-end space-x-2">
// //           {customerData.map((value, index) => (
// //             <div key={index} className="flex-1 flex flex-col justify-end">
// //               <div
// //                 className="bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600"
// //                 style={{ height: `${value * 8}%` }}
// //               ></div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="flex justify-around mt-4 text-xs text-gray-500">
// //           {customerData.map((_, index) => (
// //             <span key={index}>{index + 1}</span>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }