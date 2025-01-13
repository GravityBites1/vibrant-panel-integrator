import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface InsightMetric {
  id: string;
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'success';
  created_at: string;
  metrics: {
    current_value: number;
    previous_value: number;
    change_percentage: number;
    trend: 'up' | 'down' | 'stable';
  };
}

export function AIInsights() {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['aiInsights'],
    queryFn: async () => {
      // Demo insights data
      const demoInsights: InsightMetric[] = [
        {
          id: '1',
          type: 'revenue',
          message: 'Revenue growth has increased by 25% in the northern region',
          severity: 'success',
          created_at: new Date().toISOString(),
          metrics: {
            current_value: 125000,
            previous_value: 100000,
            change_percentage: 25,
            trend: 'up'
          }
        },
        {
          id: '2',
          type: 'orders',
          message: 'Order cancellation rate is above average in downtown area',
          severity: 'warning',
          created_at: new Date().toISOString(),
          metrics: {
            current_value: 15,
            previous_value: 8,
            change_percentage: 87.5,
            trend: 'up'
          }
        },
        {
          id: '3',
          type: 'partners',
          message: 'Partner satisfaction score has improved this week',
          severity: 'success',
          created_at: new Date().toISOString(),
          metrics: {
            current_value: 4.5,
            previous_value: 4.2,
            change_percentage: 7.14,
            trend: 'up'
          }
        },
        {
          id: '4',
          type: 'delivery',
          message: 'Average delivery time has decreased by 12%',
          severity: 'success',
          created_at: new Date().toISOString(),
          metrics: {
            current_value: 28,
            previous_value: 32,
            change_percentage: -12.5,
            trend: 'down'
          }
        }
      ];
      return demoInsights;
    }
  });

  if (isLoading) {
    return <div>Loading insights...</div>;
  }

  const getInsightIcon = (severity: string, trend?: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  };

  const getInsightColor = (severity: string) => {
    switch (severity) {
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Driven Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights?.map((insight) => (
            <div 
              key={insight.id}
              className="flex items-start space-x-3 p-3 rounded-lg border"
            >
              {getInsightIcon(insight.severity, insight.metrics?.trend)}
              <div>
                <p className={`font-medium ${getInsightColor(insight.severity)}`}>
                  {insight.message}
                </p>
                {insight.metrics && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Change: {insight.metrics.change_percentage}% from previous period
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}