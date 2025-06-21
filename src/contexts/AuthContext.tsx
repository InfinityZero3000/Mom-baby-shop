import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'customer' | 'seller' | 'admin';

interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  addresses?: Address[];
  preferences?: UserPreferences;
}

interface Address {
  id: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

interface UserPreferences {
  newsletter: boolean;
  promotions: boolean;
  orderUpdates: boolean;
  language: string;
  currency: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role?: UserRole) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Simulate API calls - Replace with real API endpoints
  const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('mombabyshop-user');
        const savedToken = localStorage.getItem('mombabyshop-token');
        
        if (savedUser && savedToken) {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuthStatus();
  }, []);
  const login = async (email: string, password: string, role: UserRole = 'customer'): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate API call
      await simulateDelay(1000);
      
      // Mock demo accounts for different roles
      const demoAccounts = {
        customer: {
          email: 'customer@example.com',
          password: '123456',
          user: {
            id: 1,
            email: 'customer@example.com',
            name: 'Nguyễn Văn Khách',
            role: 'customer' as UserRole,
            phone: '0123456789',
            avatar: '/default-avatar.png',
            addresses: [
              {
                id: 1,
                name: 'Actor Khách Hàng',
                phone: '0123456789',
                address: '123 Đường ABC',
                city: 'Hồ Chí Minh',
                district: 'Quận 1',
                ward: 'Phường Bến Nghé',
                isDefault: true,
              }
            ],
            preferences: {
              newsletter: true,
              promotions: true,
              orderUpdates: true,
              language: 'vi',
              currency: 'VND',
            }
          }
        },
        seller: {
          email: 'seller@example.com',
          password: '123456',
          user: {
            id: 2,
            email: 'seller@example.com',
            name: 'Actor Bán Hàng',
            role: 'seller' as UserRole,
            phone: '0987654321',
            avatar: '/seller-avatar.png',
            addresses: [
              {
                id: 2,
                name: 'Cửa hàng ABC',
                phone: '0987654321',
                address: '456 Đường XYZ',
                city: 'Hà Nội',
                district: 'Quận Ba Đình',
                ward: 'Phường Cống Vị',
                isDefault: true,
              }
            ],
            preferences: {
              newsletter: true,
              promotions: false,
              orderUpdates: true,
              language: 'vi',
              currency: 'VND',
            }
          }
        },
        admin: {
          email: 'admin@example.com',
          password: '123456',
          user: {
            id: 3,
            email: 'admin@example.com',
            name: 'Actor Quản Trị',
            role: 'admin' as UserRole,
            phone: '0555666777',
            avatar: '/admin-avatar.png',
            addresses: [
              {
                id: 3,
                name: 'Văn phòng MomBabyShop',
                phone: '0555666777',
                address: '789 Đường Admin',
                city: 'Đà Nẵng',
                district: 'Quận Hải Châu',
                ward: 'Phường Thạch Thang',
                isDefault: true,
              }
            ],
            preferences: {
              newsletter: false,
              promotions: false,
              orderUpdates: true,
              language: 'vi',
              currency: 'VND',
            }
          }
        }
      };

      // Check for demo accounts or legacy test account
      const account = demoAccounts[role];
      const isLegacyAccount = email === 'test@example.com' && password === '123456';
      
      if ((account && email === account.email && password === account.password) || isLegacyAccount) {
        let user: User;
        
        if (isLegacyAccount) {
          // Legacy account defaults to customer role
          user = {
            ...demoAccounts.customer.user,
            email: 'test@example.com',
            name: 'Nguyễn Văn Test'
          };
        } else {
          user = account.user;
        }

        const token = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('mombabyshop-user', JSON.stringify(user));
        localStorage.setItem('mombabyshop-token', token);
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Email hoặc mật khẩu không chính xác cho vai trò đã chọn' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Đã xảy ra lỗi trong quá trình đăng nhập' 
      };
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate API call
      await simulateDelay(1000);
      
      // Mock validation - Replace with real API call
      if (data.email && data.password && data.name) {        const user: User = {
          id: Date.now(), // Mock ID
          email: data.email,
          name: data.name,
          role: 'customer', // New registrations default to customer role
          phone: data.phone,
          avatar: '/default-avatar.png',
          addresses: [],
          preferences: {
            newsletter: true,
            promotions: false,
            orderUpdates: true,
            language: 'vi',
            currency: 'VND',
          }
        };

        const token = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('mombabyshop-user', JSON.stringify(user));
        localStorage.setItem('mombabyshop-token', token);
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Vui lòng điền đầy đủ thông tin' 
        };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: 'Đã xảy ra lỗi trong quá trình đăng ký' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('mombabyshop-user');
    localStorage.removeItem('mombabyshop-token');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('mombabyshop-user', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate API call
      await simulateDelay(1000);
      
      // Mock implementation
      return { 
        success: true, 
        message: 'Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hộp thư của bạn.' 
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return { 
        success: false, 
        message: 'Đã xảy ra lỗi trong quá trình gửi email khôi phục' 
      };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate API call
      await simulateDelay(1000);
      
      // Mock validation
      if (currentPassword === '123456') {
        return { 
          success: true, 
          message: 'Mật khẩu đã được thay đổi thành công' 
        };
      } else {
        return { 
          success: false, 
          message: 'Mật khẩu hiện tại không chính xác' 
        };
      }
    } catch (error) {
      console.error('Change password error:', error);
      return { 
        success: false, 
        message: 'Đã xảy ra lỗi trong quá trình thay đổi mật khẩu' 
      };
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateUser,
    resetPassword,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
