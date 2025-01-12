import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Loader2, PlusCircle, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  city_name: z.string().min(1, "City name is required"),
  default_radius_km: z.number().min(1, "Radius must be at least 1km").max(50, "Radius cannot exceed 50km"),
});

type RadiusFormValues = z.infer<typeof formSchema>;

interface CityRadius {
  id: string;
  city_name: string;
  default_radius_km: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export default function RadiusSettings() {
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<CityRadius[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RadiusFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city_name: "",
      default_radius_km: 5,
    }
  });

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

  const onSubmit = async (values: RadiusFormValues) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error("Not authenticated");
      }

      const { error } = await supabase
        .from('city_radius')
        .insert({
          city_name: values.city_name,
          default_radius_km: values.default_radius_km,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "City radius settings added successfully"
      });

      form.reset();
      loadCities();
    } catch (error) {
      console.error("Error saving radius settings:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save radius settings. Please make sure you're logged in with admin privileges.",
        variant: "destructive"
      });
    }
  };

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
            Manage delivery coverage by setting radius limits for each city
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New City</CardTitle>
          <CardDescription>Set up delivery radius for a new city</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter the name of the city</FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="default_radius_km"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Radius (km)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Set the default delivery radius in kilometers</FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add City
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>City Radius Settings</CardTitle>
          <CardDescription>View and manage delivery radius for all cities</CardDescription>
        </CardHeader>
        <CardContent>
          {cities.length === 0 ? (
            <Alert>
              <AlertDescription>
                No cities have been added yet. Use the form above to add your first city.
              </AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City Name</TableHead>
                  <TableHead>Current Radius (km)</TableHead>
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
    </div>
  );
}