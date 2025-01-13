import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, Users, ShoppingCart, Settings, Menu, 
  LogOut, Sun, Moon, Loader, Store, LineChart as CampaignIcon, 
  List, Tag, Star, Package, HeadphonesIcon, BarChart3, CreditCard, Bike,
  Shield 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStats, toggleDarkMode, toggleSidebar, setLoading } from "@/store/slices/dashboardSlice";
import { supabase } from "@/integrations/supabase/client";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { PredictiveAnalytics } from "@/components/dashboard/PredictiveAnalytics";

const Index = () => {
  const dispatch = useAppDispatch();
  const { stats, isDarkMode, isSidebarOpen, isLoading } = useAppSelector(state => state.dashboard);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Store, label: 'Stores', path: '/stores' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { icon: CampaignIcon, label: 'Campaigns', path: '/campaigns' },
    { icon: List, label: 'Categories', path: '/categories' },
    { icon: List, label: 'Platform Categories', path: '/platform-categories' },
    { icon: Tag, label: 'Promotions', path: '/promotions' },
    { icon: Star, label: 'Reviews', path: '/reviews' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: HeadphonesIcon, label: 'Support Tickets', path: '/support-tickets' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
    { icon: Bike, label: 'Delivery Partners', path: '/delivery-partners' },
    { icon: Shield, label: 'Roles', path: '/roles' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/login');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        dispatch(setLoading(true));
        
        // Fetch orders count
        const { count: ordersCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact' });

        // Fetch users count
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' });

        // Calculate total revenue
        const { data: orders } = await supabase
          .from('orders')
          .select('total_amount')
          .eq('status', 'delivered');

        const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

        dispatch(setStats({
          totalOrders: ordersCount || 0,
          totalUsers: usersCount || 0,
          revenue: totalRevenue
        }));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive"
        });
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} 
          transition-all duration-300 bg-white dark:bg-gray-800 border-r 
          border-gray-200 dark:border-gray-700 flex flex-col`}>
          <div className="flex items-center justify-between p-4 border-b 
            border-gray-200 dark:border-gray-700">
            <h1 className={`font-bold text-xl text-gray-800 dark:text-white 
              ${!isSidebarOpen && 'hidden'}`}>
              Admin Panel
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleSidebar())}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="space-y-2 px-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                    className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Button>
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Dashboard Overview
              </h2>
              <Button variant="ghost" size="icon" onClick={() => dispatch(toggleDarkMode())}>
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

            {location.pathname === '/' ? (
              <div className="space-y-6">
                <PerformanceMetrics />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AIInsights />
                  <PredictiveAnalytics />
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;