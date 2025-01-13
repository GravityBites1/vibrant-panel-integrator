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
import { Pencil, Trash2, Search } from "lucide-react";

interface PlatformCategory {
  id: string;
  name: string;
  commission_rate: number;
  platform_fee: number;
  gst_rate: number;
  points_rate: number;
  points_expiry_days: number | null;
  icon_url: string | null;
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
  icon: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PlatformCategories() {
  const [categories, setCategories] = useState<PlatformCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<PlatformCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<FormValues>({
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

  useEffect(() => {
    if (editingCategory) {
      form.reset({
        name: editingCategory.name,
        commission_rate: editingCategory.commission_rate.toString(),
        platform_fee: editingCategory.platform_fee.toString(),
        gst_rate: editingCategory.gst_rate.toString(),
        points_rate: editingCategory.points_rate.toString(),
        points_expiry_days: editingCategory.points_expiry_days?.toString() || "",
      });
    }
  }, [editingCategory, form]);

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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("platform_categories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Platform category deleted successfully",
      });

      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete platform category",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category: PlatformCategory) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const uploadIcon = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('platform_categories')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('platform_categories')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading icon:", error);
      return null;
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      let iconUrl = editingCategory?.icon_url || null;

      if (values.icon && values.icon.length > 0) {
        iconUrl = await uploadIcon(values.icon[0]);
      }

      const categoryData = {
        name: values.name,
        commission_rate: Number(values.commission_rate),
        platform_fee: Number(values.platform_fee),
        gst_rate: Number(values.gst_rate),
        points_rate: Number(values.points_rate),
        points_expiry_days: values.points_expiry_days ? Number(values.points_expiry_days) : null,
        icon_url: iconUrl,
      };

      if (editingCategory) {
        const { error } = await supabase
          .from("platform_categories")
          .update(categoryData)
          .eq("id", editingCategory.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Platform category updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("platform_categories")
          .insert([categoryData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Platform category created successfully",
        });
      }

      form.reset();
      setIsDialogOpen(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description: "Failed to save platform category",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.commission_rate.toString().includes(searchTerm) ||
    category.platform_fee.toString().includes(searchTerm) ||
    category.gst_rate.toString().includes(searchTerm)
  );

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <CardTitle>Platform Categories</CardTitle>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full md:w-[250px]"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add Category</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCategory ? 'Edit' : 'Add New'} Platform Category</DialogTitle>
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
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Icon</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => onChange(e.target.files)}
                                {...field}
                              />
                              {editingCategory?.icon_url && (
                                <img 
                                  src={editingCategory.icon_url} 
                                  alt="Current icon" 
                                  className="w-8 h-8 object-cover"
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">{editingCategory ? 'Update' : 'Create'} Category</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Platform Fee</TableHead>
                <TableHead>GST Rate</TableHead>
                <TableHead>Points Rate</TableHead>
                <TableHead>Points Expiry Days</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {category.icon_url ? (
                      <img 
                        src={category.icon_url} 
                        alt={category.name} 
                        className="w-8 h-8 object-cover rounded"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded" />
                    )}
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.commission_rate}%</TableCell>
                  <TableCell>${category.platform_fee}</TableCell>
                  <TableCell>{category.gst_rate}%</TableCell>
                  <TableCell>{category.points_rate}</TableCell>
                  <TableCell>{category.points_expiry_days || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
