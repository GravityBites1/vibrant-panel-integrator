import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RadiusPrediction {
  city_id: string;
  current_radius: number;
  suggested_radius: number;
  confidence: number;
  reason: string;
  metrics: {
    order_volume_trend: number;
    delivery_success_rate: number;
    avg_delivery_time: number;
  };
}

export function RadiusPredictions({ cityId }: { cityId: string }) {
  const { data: prediction, isLoading } = useQuery({
    queryKey: ['radiusPrediction', cityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('radius_predictions')
        .select('*')
        .eq('city_id', cityId)
        .single();

      if (error) throw error;
      return data as RadiusPrediction;
    }
  });

  if (isLoading) {
    return <div>Loading predictions...</div>;
  }

  if (!prediction) {
    return <div>No predictions available</div>;
  }

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return <Badge className="bg-green-500">High Confidence ({confidence}%)</Badge>;
    if (confidence >= 70) return <Badge className="bg-yellow-500">Medium Confidence ({confidence}%)</Badge>;
    return <Badge className="bg-red-500">Low Confidence ({confidence}%)</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            AI Radius Prediction
            {getConfidenceBadge(prediction.confidence)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Radius</p>
                <p className="text-2xl font-bold">{prediction.current_radius} km</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suggested Radius</p>
                <p className="text-2xl font-bold">{prediction.suggested_radius} km</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Decline</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Reason for Suggestion</p>
              <p className="text-sm text-muted-foreground">{prediction.reason}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="auto-adjust" />
              <label htmlFor="auto-adjust" className="text-sm">
                Enable automatic radius adjustment
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Last Week', success: prediction.metrics.delivery_success_rate, time: prediction.metrics.avg_delivery_time, volume: prediction.metrics.order_volume_trend },
                // Add more historical data points here
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="success" stroke="#8884d8" name="Success Rate" />
                <Line type="monotone" dataKey="time" stroke="#82ca9d" name="Delivery Time" />
                <Line type="monotone" dataKey="volume" stroke="#ffc658" name="Order Volume" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}