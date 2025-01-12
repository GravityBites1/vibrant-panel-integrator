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

const formSchema = z.object({
  city_name: z.string().min(1, "City name is required"),
  default_radius_km: z.number().min(1, "Radius must be at least 1km").max(50, "Radius cannot exceed 50km"),
});

type AddCityFormValues = z.infer<typeof formSchema>;

export default function AddCity() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<AddCityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city_name: "",
      default_radius_km: 5,
    }
  });

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

      <Card>
        <CardHeader>
          <CardTitle>City Details</CardTitle>
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
                Add City
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}