import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Define the allowed store types
type StoreType = "restaurant" | "grocery" | "pet_food" | "beverages" | "other";

const Categories = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    store_type: "restaurant" as StoreType,
    is_active: true,
    commission_rate: 0,
    platform_fee: 0,
    gst_rate: 0,
    points_rate: 0,
    points_expiry_days: 30
  });

  // Fetch total categories count
  const { data: categoriesCount } = useQuery({
    queryKey: ['categoriesCount'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("store_categories")
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Submitting category:", formData);
      
      // First create platform category
      const { data: platformData, error: platformError } = await supabase
        .from("platform_categories")
        .insert([{
          name: formData.name,
          commission_rate: formData.commission_rate,
          platform_fee: formData.platform_fee,
          gst_rate: formData.gst_rate,
          points_rate: formData.points_rate,
          points_expiry_days: formData.points_expiry_days
        }])
        .select()
        .single();

      if (platformError) throw platformError;

      // Then create store category
      const { data: storeData, error: storeError } = await supabase
        .from("store_categories")
        .insert([{
          name: formData.name,
          description: formData.description,
          store_type: formData.store_type,
          is_active: formData.is_active
        }])
        .select()
        .single();

      if (storeError) throw storeError;

      console.log("Categories created:", { platformData, storeData });
      
      toast({
        title: "Success",
        description: "Categories have been created successfully",
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        store_type: "restaurant",
        is_active: true,
        commission_rate: 0,
        platform_fee: 0,
        gst_rate: 0,
        points_rate: 0,
        points_expiry_days: 30
      });
    } catch (error) {
      console.error("Error creating categories:", error);
      toast({
        title: "Error",
        description: "Failed to create categories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Category</CardTitle>
          <div className="text-sm text-muted-foreground">
            Total Categories: {categoriesCount || 0}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter category name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter category description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="store_type">Store Type</Label>
              <Select
                value={formData.store_type}
                onValueChange={(value: StoreType) =>
                  setFormData({ ...formData, store_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select store type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="grocery">Grocery</SelectItem>
                  <SelectItem value="pet_food">Pet Food</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commission_rate">Commission Rate (%)</Label>
              <Input
                id="commission_rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                required
                value={formData.commission_rate}
                onChange={(e) =>
                  setFormData({ ...formData, commission_rate: parseFloat(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform_fee">Platform Fee</Label>
              <Input
                id="platform_fee"
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.platform_fee}
                onChange={(e) =>
                  setFormData({ ...formData, platform_fee: parseFloat(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gst_rate">GST Rate (%)</Label>
              <Input
                id="gst_rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                required
                value={formData.gst_rate}
                onChange={(e) =>
                  setFormData({ ...formData, gst_rate: parseFloat(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="points_rate">Points Rate</Label>
              <Input
                id="points_rate"
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.points_rate}
                onChange={(e) =>
                  setFormData({ ...formData, points_rate: parseFloat(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="points_expiry_days">Points Expiry Days</Label>
              <Input
                id="points_expiry_days"
                type="number"
                min="0"
                required
                value={formData.points_expiry_days}
                onChange={(e) =>
                  setFormData({ ...formData, points_expiry_days: parseInt(e.target.value) })
                }
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Category"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;