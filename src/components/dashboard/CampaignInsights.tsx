import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface InsightMetric {
  id: string;
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'success';
  metrics: {
    current_value: number;
    previous_value: number;
    change_percentage: number;
    trend: 'up' | 'down' | 'stable';
  };
}

export function CampaignInsights() {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['campaignInsights'],
    queryFn: async () => {
      console.log('Fetching campaign insights...');
      const { data, error } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('type', 'campaign')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching insights:', error);
        throw error;
      }

      return data as InsightMetric[];
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