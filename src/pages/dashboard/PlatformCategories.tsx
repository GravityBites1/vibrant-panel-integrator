import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

const PlatformCategories = () => {
  const [categories, setCategories] = useState<PlatformCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Categories</CardTitle>
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