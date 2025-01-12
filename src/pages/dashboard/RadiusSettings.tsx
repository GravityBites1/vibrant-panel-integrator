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
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  city_name: z.string().min(1, "City name is required"),
  default_radius_km: z.number().min(1, "Radius must be at least 1km").max(50, "Radius cannot exceed 50km"),
  status: z.enum(["active", "inactive"]),
});

type RadiusFormValues = z.infer<typeof formSchema>;

export default function RadiusSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<RadiusFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city_name: "",
      default_radius_km: 5,
      status: "active"
    }
  });

  useEffect(() => {
    const loadRadiusSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('city_radius')
          .select('*')
          .single();

        if (error) throw error;

        if (data) {
          form.reset({
            city_name: data.city_name,
            default_radius_km: data.default_radius_km,
            status: data.status
          });
        }
      } catch (error) {
        console.error("Error loading radius settings:", error);
        toast({
          title: "Error",
          description: "Failed to load radius settings",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadRadiusSettings();
  }, []);

  const onSubmit = async (values: RadiusFormValues) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('city_radius')
        .upsert({
          city_name: values.city_name,
          default_radius_km: values.default_radius_km,
          status: values.status,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Radius settings updated successfully"
      });
    } catch (error) {
      console.error("Error saving radius settings:", error);
      toast({
        title: "Error",
        description: "Failed to save radius settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Radius Settings</CardTitle>
              <CardDescription>Configure delivery radius for your service area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}