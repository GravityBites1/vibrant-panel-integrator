import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Store } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Store {
  id: string;
  name: string;
  total_campaigns: number;
  active_campaigns: number;
  total_spent: number;
}

export function StoresRunningAds() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: stores, isLoading } = useQuery({
    queryKey: ['stores-running-ads'],
    queryFn: async () => {
      console.log('Fetching stores running ads...');
      const { data, error } = await supabase
        .from('stores')
        .select(`
          id,
          name,
          ad_campaigns!inner (
            id,
            spent_amount,
            status
          )
        `)
        .eq('ad_campaigns.status', 'active');

      if (error) {
        console.error('Error fetching stores:', error);
        throw error;
      }

      console.log('Fetched stores:', data);

      return data.map(store => ({
        id: store.id,
        name: store.name,
        total_campaigns: store.ad_campaigns.length,
        active_campaigns: store.ad_campaigns.filter(c => c.status === 'active').length,
        total_spent: store.ad_campaigns.reduce((sum, campaign) => sum + (campaign.spent_amount || 0), 0)
      }));
    }
  });

  const filteredStores = stores?.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Stores Running Ads</span>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStores?.map((store) => (
              <div
                key={store.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {store.active_campaigns} active campaigns
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{store.total_spent.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    Total spent
                  </p>
                </div>
              </div>
            ))}
            {filteredStores?.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No stores found
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}