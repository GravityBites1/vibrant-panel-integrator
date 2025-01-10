import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Loader, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface PlatformCategory {
  id: string;
  name: string;
  commission_rate: number;
  platform_fee: number;
  gst_rate: number;
  points_rate: number;
  points_expiry_days: number;
  created_at: string;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  commission_rate: z.number().min(0).max(100),
  platform_fee: z.number().min(0),
  gst_rate: z.number().min(0).max(100),
  points_rate: z.number().min(0),
  points_expiry_days: z.number().min(0).int()
});

const PlatformCategories = () => {
  const [categories, setCategories] = useState<PlatformCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      commission_rate: 0,
      platform_fee: 0,
      gst_rate: 0,
      points_rate: 0,
      points_expiry_days: 30
    }
  });

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('platform_categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching platform categories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch platform categories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting values:", values);
      const { error } = await supabase
        .from('platform_categories')
        .insert([values]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Platform category created successfully"
      });

      setOpen(false);
      form.reset();
      fetchCategories();
    } catch (error) {
      console.error('Error creating platform category:', error);
      toast({
        title: "Error",
        description: "Failed to create platform category",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Platform Categories</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Platform Category</DialogTitle>
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
                        <Input 
                          type="number" 
                          step="0.01"
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                          value={field.value}
                        />
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
                        <Input 
                          type="number"
                          step="0.01"
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                          value={field.value}
                        />
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
                        <Input 
                          type="number"
                          step="0.01"
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                          value={field.value}
                        />
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
                        <Input 
                          type="number"
                          step="0.01"
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                          value={field.value}
                        />
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
                      <FormLabel>Points Expiry Days</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          onChange={e => field.onChange(parseInt(e.target.value))}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Create Category</Button>
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
              <TableHead>Commission Rate (%)</TableHead>
              <TableHead>Platform Fee</TableHead>
              <TableHead>GST Rate (%)</TableHead>
              <TableHead>Points Rate</TableHead>
              <TableHead>Points Expiry (Days)</TableHead>
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
                <TableCell>{category.points_expiry_days}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PlatformCategories;