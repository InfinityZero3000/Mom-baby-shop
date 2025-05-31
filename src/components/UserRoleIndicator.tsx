import React from 'react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { User, Store, Shield } from 'lucide-react';

export const UserRoleIndicator: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const getRoleInfo = (role: UserRole) => {
    switch (role) {
      case 'customer':
        return {
          icon: User,
          label: 'Khách hàng',
          bgColor: 'bg-gradient-to-r from-pink-100 to-blue-100',
          textColor: 'text-[#ef62f9]',
          borderColor: 'border-[#ef62f9]'
        };
      case 'seller':
        return {
          icon: Store,
          label: 'Người bán',
          bgColor: 'bg-gradient-to-r from-blue-100 to-cyan-100',
          textColor: 'text-[#0bbdf8]',
          borderColor: 'border-[#0bbdf8]'
        };
      case 'admin':
        return {
          icon: Shield,
          label: 'Quản trị viên',
          bgColor: 'bg-gradient-to-r from-gray-100 to-slate-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-400'
        };
      default:
        return {
          icon: User,
          label: 'Người dùng',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-300'
        };
    }
  };

  const roleInfo = getRoleInfo(user.role);
  const IconComponent = roleInfo.icon;

  return (
    <div className={`inline-flex items-center px-3 py-1.5 rounded-full border ${roleInfo.bgColor} ${roleInfo.borderColor} ${roleInfo.textColor}`}>
      <IconComponent className="h-4 w-4 mr-2" />
      <span className="text-sm font-medium">{user.name}</span>
      <span className="ml-2 text-xs opacity-75">({roleInfo.label})</span>
    </div>
  );
};

export default UserRoleIndicator;
