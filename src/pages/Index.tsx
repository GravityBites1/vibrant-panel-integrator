import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  LayoutDashboard, Users, ShoppingCart, Settings, Menu, 
  LogOut, Sun, Moon 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });

  // Sample data for chart
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 }
  ];

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/login');
      }
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/login');
      }
    });

    // Fetch dashboard stats
    fetchStats();

    return () => subscription.unsubscribe();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch total orders
      const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact' });

      // Fetch total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // Fetch total revenue
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount');

      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

      setStats({
        totalOrders: orderCount || 0,
        totalUsers: userCount || 0,
        revenue: totalRevenue
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="flex-1 py-4">
              <nav className="space-y-2 px-2">
                {[
                  { icon: LayoutDashboard, label: 'Dashboard', active: true },
                  { icon: Users, label: 'Users' },
                  { icon: ShoppingCart, label: 'Orders' },
                  { icon: Settings, label: 'Settings' },
                ].map((item) => (
                  <Button
                    key={item.label}
                    variant={item.active ? 'secondary' : 'ghost'}
                    className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Button>
                ))}
              </nav>
            </ScrollArea>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                {isSidebarOpen && <span>Logout</span>}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Dashboard Overview
              </h2>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;