import { Search, Bell, MessageSquare, Menu } from 'lucide-react';

export default function Header() {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center flex-1 max-w-xl ml-12 lg:ml-0">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="hidden sm:block relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="hidden md:block relative p-2 hover:bg-gray-100 rounded-lg">
            <MessageSquare size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="hidden md:block relative p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2">
            <span className="hidden sm:inline">Uncle Tee</span>
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
