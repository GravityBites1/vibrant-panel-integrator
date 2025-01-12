import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GoogleMap, Circle, useLoadScript } from "@react-google-maps/api";
import { useState, useCallback, useMemo } from "react";

const formSchema = z.object({
  city_name: z.string().min(1, "City name is required"),
  default_radius_km: z.number().min(1, "Radius must be at least 1km").max(50, "Radius cannot exceed 50km"),
});

type AddCityFormValues = z.infer<typeof formSchema>;

const libraries = ["places"];

export default function AddCity() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India's center

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as any,
  });

  const form = useForm<AddCityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city_name: "",
      default_radius_km: 5,
    }
  });

  const radius = form.watch("default_radius_km") * 1000; // Convert km to meters

  const mapOptions = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: true,
    scrollwheel: true,
  }), []);

  const onSubmit = async (values: AddCityFormValues) => {
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

      navigate("/radius-settings");
    } catch (error) {
      console.error("Error saving radius settings:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save radius settings. Please make sure you're logged in with admin privileges.",
        variant: "destructive"
      });
    }
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/radius-settings")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Add New City</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>City Details</CardTitle>
            <CardDescription>Set up delivery radius for a new city</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <Button type="submit">
                  Add City
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>City Location</CardTitle>
            <CardDescription>Click on the map to set the city center</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full rounded-md overflow-hidden">
              <GoogleMap
                options={mapOptions}
                zoom={5}
                center={center}
                mapContainerClassName="w-full h-full"
                onClick={onMapClick}
              >
                <Circle
                  center={center}
                  radius={radius}
                  options={{
                    fillColor: "rgba(66, 133, 244, 0.2)",
                    fillOpacity: 0.4,
                    strokeColor: "#4285F4",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                  }}
                />
              </GoogleMap>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}