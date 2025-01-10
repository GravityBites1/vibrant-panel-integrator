import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  LayoutDashboard, Users, ShoppingCart, Settings, Menu, 
  LogOut, Sun, Moon, Loader, Store, LineChart as CampaignIcon 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStats, toggleDarkMode, toggleSidebar, setLoading } from "@/store/slices/dashboardSlice";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const dispatch = useAppDispatch();
  const { stats, isDarkMode, isSidebarOpen, isLoading } = useAppSelector(state => state.dashboard);
  const location = useLocation();

  // Sample data for chart
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 }
  ];

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Store, label: 'Stores', path: '/stores' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { icon: CampaignIcon, label: 'Campaigns', path: '/campaigns' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

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
          border-gray-200 dark:border-gray-700`}>
          <div className="flex flex-col h-full">
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
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Total Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalOrders}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Total Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ${stats.revenue.toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Chart */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#6e59a5" 
                            strokeWidth={2} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </>
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
