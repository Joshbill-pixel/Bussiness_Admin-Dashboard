import { Home, User, ShoppingBag, Menu as MenuIcon, Users, BarChart3, MessageSquare, Wallet, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export default function sidebar({ activeTab, onTabChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'edit-profile', icon: User, label: 'Edit profile' },
    { id: 'orders', icon: ShoppingBag, label: 'Orders', badge: '25' },
    { id: 'menus', icon: MenuIcon, label: 'Menus' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'reviews', icon: MessageSquare, label: 'Reviews' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
      >
        <MenuIcon size={24} className="text-gray-700" />
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white h-screen border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
            <span className="text-xl font-bold text-gray-800">Ree</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 size={20} />
          <span>Delete Account</span>
        </button>
      </div>
      </div>
    </>
  );
}
