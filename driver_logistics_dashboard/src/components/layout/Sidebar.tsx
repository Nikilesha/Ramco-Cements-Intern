import { NavLink } from 'react-router-dom';
import { 
  BarChart, 
  Truck, 
  MapPin, 
  Users, 
  Settings, 
  FileText,
  Bell,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart },
    { name: 'Live Tracking', href: '/tracking', icon: MapPin },
    { name: 'Fleet Management', href: '/fleet', icon: Truck },
    { name: 'Driver Management', href: '/drivers', icon: Users },
    { name: 'Reports & Analytics', href: '/reports', icon: FileText },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Support', href: '/support', icon: HelpCircle },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}>
      <div className="flex items-center justify-center h-16 bg-blue-600">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">RC</span>
          </div>
          {isOpen && (
            <span className="ml-3 text-white font-semibold text-lg">Ramco Logistics</span>
          )}
        </div>
      </div>

      <nav className="mt-8 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {isOpen && <span className="ml-3 font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        {isOpen ? (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-xs text-orange-800 font-medium">Need Help?</p>
                <p className="text-xs text-orange-600">Contact IT Support</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <HelpCircle className="w-5 h-5 text-orange-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
