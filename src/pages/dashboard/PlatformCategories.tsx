import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PlatformCategory {
  id: string;
  name: string;
  commission_rate: number;
  platform_fee: number;
  gst_rate: number;
  points_rate: number;
  points_expiry_days: number | null;
  created_at: string;
  updated_at: string;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  commission_rate: z.string().min(1, "Commission rate is required"),
  platform_fee: z.string().min(1, "Platform fee is required"),
  gst_rate: z.string().min(1, "GST rate is required"),
  points_rate: z.string().min(1, "Points rate is required"),
  points_expiry_days: z.string().optional(),
});

export default function PlatformCategories() {
  const [categories, setCategories] = useState<PlatformCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      commission_rate: "",
      platform_fee: "",
      gst_rate: "",
      points_rate: "",
      points_expiry_days: "",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("platform_categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch platform categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting values:", values); // Debug log

      const newCategory = {
        name: values.name,
        commission_rate: parseFloat(values.commission_rate),
        platform_fee: parseFloat(values.platform_fee),
        gst_rate: parseFloat(values.gst_rate),
        points_rate: parseFloat(values.points_rate),
        points_expiry_days: values.points_expiry_days ? parseInt(values.points_expiry_days) : null,
      };

      console.log("Formatted category:", newCategory); // Debug log

      const { data, error } = await supabase
        .from("platform_categories")
        .insert(newCategory)
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error); // Debug log
        throw error;
      }

      console.log("Insert response:", data); // Debug log

      toast({
        title: "Success",
        description: "Platform category created successfully",
      });

      form.reset();
      setIsDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
      toast({
        title: "Error",
        description: "Failed to create platform category",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Platform Categories</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Platform Category</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="commission_rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commission Rate (%)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="platform_fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Fee</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gst_rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Rate (%)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="points_rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Points Rate</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="points_expiry_days"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Points Expiry Days (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Create Category</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Platform Fee</TableHead>
                <TableHead>GST Rate</TableHead>
                <TableHead>Points Rate</TableHead>
                <TableHead>Points Expiry Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.commission_rate}%</TableCell>
                  <TableCell>${category.platform_fee}</TableCell>
                  <TableCell>{category.gst_rate}%</TableCell>
                  <TableCell>{category.points_rate}</TableCell>
                  <TableCell>{category.points_expiry_days || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}