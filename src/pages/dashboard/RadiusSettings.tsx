import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Loader2, PlusCircle, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { CityAnalytics } from "@/components/dashboard/CityAnalytics";

interface CityRadius {
  id: string;
  city_name: string;
  default_radius_km: number;
  status: 'active' | 'inactive';
  total_deliveries: number;
  avg_delivery_time: number;
  delivery_success_rate: number;
  total_revenue: number;
  created_at: string;
  updated_at: string;
}

export default function RadiusSettings() {
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<CityRadius[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loadCities = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from('city_radius')
        .select('*')
        .order('city_name');

      if (error) throw error;

      setCities(data || []);
    } catch (error) {
      console.error("Error loading cities:", error);
      toast({
        title: "Error",
        description: "Failed to load cities. Please make sure you're logged in with admin privileges.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCities();
  }, []);

  const updateCityRadius = async (id: string, radius: number) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error("Not authenticated");
      }

      const { error } = await supabase
        .from('city_radius')
        .update({ default_radius_km: radius })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Radius updated successfully"
      });

      setEditingId(null);
      loadCities();
    } catch (error) {
      console.error("Error updating radius:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update radius. Please make sure you're logged in with admin privileges.",
        variant: "destructive"
      });
    }
  };

  const filteredCities = cities.filter(city => 
    city.city_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">City-Wise Delivery Radius Management</h1>
          <p className="text-muted-foreground">
            Manage delivery coverage and analyze performance by setting radius limits for each city
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={() => navigate("/add-city")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add City
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>City Radius Settings</CardTitle>
          <CardDescription>View and manage delivery radius for all cities</CardDescription>
        </CardHeader>
        <CardContent>
          {cities.length === 0 ? (
            <Alert>
              <AlertDescription>
                No cities have been added yet. Click the "Add City" button to add your first city.
              </AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City Name</TableHead>
                  <TableHead>Current Radius (km)</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Avg Time</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCities.map((city) => (
                  <TableRow key={city.id}>
                    <TableCell className="font-medium">{city.city_name}</TableCell>
                    <TableCell>
                      {editingId === city.id ? (
                        <Input
                          type="number"
                          defaultValue={city.default_radius_km}
                          className="w-24"
                          min={1}
                          max={50}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value !== city.default_radius_km) {
                              updateCityRadius(city.id, value);
                            } else {
                              setEditingId(null);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.currentTarget.blur();
                            }
                            if (e.key === 'Escape') {
                              setEditingId(null);
                            }
                          }}
                        />
                      ) : (
                        <span 
                          className="cursor-pointer hover:text-primary"
                          onClick={() => setEditingId(city.id)}
                        >
                          {city.default_radius_km}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{city.delivery_success_rate.toFixed(1)}%</TableCell>
                    <TableCell>{city.avg_delivery_time} min</TableCell>
                    <TableCell>₹{city.total_revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        city.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {city.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(city.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              Detailed metrics and trends for {cities.find(c => c.id === editingId)?.city_name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CityAnalytics cityId={editingId} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}