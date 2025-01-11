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
import { NotificationChannels, NotificationTypes, UserSettings, NotificationPreferences } from "@/types/settings";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  language: z.string(),
  currency: z.string(),
  theme: z.string(),
  notification_preferences: z.object({
    email_enabled: z.boolean(),
    push_enabled: z.boolean(),
    sms_enabled: z.boolean(),
    notification_types: z.object({
      payout: z.boolean(),
      rating: z.boolean(),
      low_stock: z.boolean(),
      new_order: z.boolean()
    })
  }),
  backend_settings: z.object({
    max_concurrent_orders: z.number().min(1).max(100),
    auto_accept_orders: z.boolean(),
    preparation_buffer_time: z.number().min(0).max(60),
    delivery_radius: z.number().min(1).max(50)
  })
});

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "en",
      currency: "INR",
      theme: "system",
      notification_preferences: {
        email_enabled: true,
        push_enabled: true,
        sms_enabled: false,
        notification_types: {
          payout: true,
          rating: true,
          low_stock: true,
          new_order: true
        }
      },
      backend_settings: {
        max_concurrent_orders: 5,
        auto_accept_orders: false,
        preparation_buffer_time: 15,
        delivery_radius: 10
      }
    }
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        loadSettings(user.id);
      }
    };
    getCurrentUser();
  }, []);

  const loadSettings = async (uid: string) => {
    try {
      const { data: userSettings, error: settingsError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', uid)
        .single();

      if (settingsError) throw settingsError;

      const { data: notifPrefs, error: notifError } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', uid)
        .single();

      if (notifError) throw notifError;

      if (userSettings) {
        const channels = notifPrefs?.channels as unknown as NotificationChannels | undefined;
        const types = notifPrefs?.types as unknown as NotificationTypes | undefined;

        form.reset({
          language: userSettings.language,
          currency: userSettings.currency,
          theme: userSettings.theme,
          notification_preferences: {
            email_enabled: channels?.email ?? true,
            push_enabled: channels?.push ?? true,
            sms_enabled: channels?.sms ?? false,
            notification_types: types ?? {
              payout: true,
              rating: true,
              low_stock: true,
              new_order: true
            }
          },
          backend_settings: {
            max_concurrent_orders: userSettings.max_concurrent_orders ?? 5,
            auto_accept_orders: userSettings.auto_accept_orders ?? false,
            preparation_buffer_time: userSettings.preparation_buffer_time ?? 15,
            delivery_radius: userSettings.delivery_radius ?? 10
          }
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: SettingsFormValues) => {
    if (!userId) return;

    try {
      // Update user settings
      const { error: settingsError } = await supabase
        .from("user_settings")
        .upsert({
          user_id: userId,
          language: values.language,
          currency: values.currency,
          theme: values.theme,
          max_concurrent_orders: values.backend_settings.max_concurrent_orders,
          auto_accept_orders: values.backend_settings.auto_accept_orders,
          preparation_buffer_time: values.backend_settings.preparation_buffer_time,
          delivery_radius: values.backend_settings.delivery_radius
        });

      if (settingsError) throw settingsError;

      // Update notification preferences
      const notificationPrefs = {
        channels: {
          email: values.notification_preferences.email_enabled,
          push: values.notification_preferences.push_enabled,
          sms: values.notification_preferences.sms_enabled
        },
        types: values.notification_preferences.notification_types
      };

      const { error: notifError } = await supabase
        .from("notification_preferences")
        .upsert({
          user_id: userId,
          channels: notificationPrefs.channels,
          types: notificationPrefs.types
        });

      if (notifError) throw notifError;

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
              <CardTitle>Backend Settings</CardTitle>
              <CardDescription>Configure operational parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="backend_settings.max_concurrent_orders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Concurrent Orders</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select max orders" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 10, 15, 20].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Maximum number of orders you can handle simultaneously</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="backend_settings.auto_accept_orders"
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
                name="backend_settings.preparation_buffer_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preparation Buffer Time (minutes)</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select buffer time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[5, 10, 15, 20, 30, 45, 60].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Additional time buffer for order preparation</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="backend_settings.delivery_radius"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Radius (km)</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select delivery radius" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 40, 50].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Maximum delivery distance from your location</FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="notification_preferences.email_enabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Email Notifications</FormLabel>
                      <FormDescription>Receive notifications via email</FormDescription>
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
                name="notification_preferences.push_enabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Push Notifications</FormLabel>
                      <FormDescription>Receive push notifications</FormDescription>
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
                name="notification_preferences.sms_enabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>SMS Notifications</FormLabel>
                      <FormDescription>Receive notifications via SMS</FormDescription>
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

              <div className="space-y-4 mt-4">
                <h4 className="text-sm font-medium">Notification Types</h4>
                {Object.entries({
                  payout: "Payout Updates",
                  rating: "New Ratings",
                  low_stock: "Low Stock Alerts",
                  new_order: "New Orders"
                }).map(([key, label]) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={`notification_preferences.notification_types.${key}` as any}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
