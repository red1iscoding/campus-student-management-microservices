import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Building2, 
  Search, 
  MessageSquare, 
  Settings 
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Students", icon: Users, path: "/students" },
  { name: "Courses", icon: BookOpen, path: "/courses" },
  { name: "Universities", icon: Building2, path: "/universities" },
  { name: "Explorer", icon: Search, path: "/explorer" },
  { name: "Chatbot", icon: MessageSquare, path: "/chatbot" },
  { name: "Settings", icon: Settings, path: "/settings" }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 shadow-sm">
      <div className="p-6">
        <Link to="/">
          <h2 className="text-[#1976D2]">Campus Management</h2>
        </Link>
      </div>
      
      <nav className="px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-colors ${
                isActive 
                  ? "bg-[#1976D2] text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
