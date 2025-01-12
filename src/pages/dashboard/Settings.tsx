import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Loader2, Settings2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  language: z.string(),
  currency: z.string(),
  theme: z.string(),
  delivery_preferences: z.object({
    defaultTip: z.number().min(0),
    noContactDelivery: z.boolean()
  }),
  max_concurrent_orders: z.number().min(1).max(100),
  auto_accept_orders: z.boolean(),
  preparation_buffer_time: z.number().min(0).max(60),
  delivery_radius: z.number().min(1).max(50)
});

type SettingsFormValues = z.infer<typeof formSchema>;

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "en",
      currency: "INR",
      theme: "system",
      delivery_preferences: {
        defaultTip: 0,
        noContactDelivery: false
      },
      max_concurrent_orders: 5,
      auto_accept_orders: false,
      preparation_buffer_time: 15,
      delivery_radius: 10
    }
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
          await loadSettings(user.id);
        }
      } catch (error) {
        console.error("Error getting current user:", error);
        toast({
          title: "Error",
          description: "Failed to load user data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  const loadSettings = async (uid: string) => {
    try {
      const { data: settings, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', uid)
        .single();

      if (error) throw error;

      if (settings) {
        const delivery_preferences = typeof settings.delivery_preferences === 'string' 
          ? JSON.parse(settings.delivery_preferences)
          : settings.delivery_preferences || {
              defaultTip: 0,
              noContactDelivery: false
            };

        form.reset({
          language: settings.language,
          currency: settings.currency,
          theme: settings.theme,
          delivery_preferences,
          max_concurrent_orders: settings.max_concurrent_orders,
          auto_accept_orders: settings.auto_accept_orders,
          preparation_buffer_time: settings.preparation_buffer_time,
          delivery_radius: settings.delivery_radius
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      });
    }
  };

  const onSubmit = async (values: SettingsFormValues) => {
    if (!userId) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: userId,
          ...values
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Settings updated successfully"
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
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
      <div className="mb-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Settings2 className="mr-2 h-4 w-4" />
                Settings
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <Link to="/settings" className={navigationMenuTriggerStyle()}>
                      General Settings
                    </Link>
                  </li>
                  <li className="row-span-3">
                    <Link to="/radius-settings" className={navigationMenuTriggerStyle()}>
                      Radius Settings
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Preferences</CardTitle>
              <CardDescription>Configure your delivery settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="delivery_preferences.defaultTip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Tip Amount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Default tip amount for delivery partners</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="delivery_preferences.noContactDelivery"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>No Contact Delivery</FormLabel>
                      <FormDescription>Enable contactless delivery by default</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Store Settings</CardTitle>
              <CardDescription>Configure your store operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="max_concurrent_orders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Concurrent Orders</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Maximum number of orders you can handle simultaneously</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="auto_accept_orders"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Auto Accept Orders</FormLabel>
                      <FormDescription>Automatically accept incoming orders</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preparation_buffer_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preparation Buffer Time (minutes)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Additional time buffer for order preparation</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="delivery_radius"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Radius (km)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Maximum delivery distance from your location</FormDescription>
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