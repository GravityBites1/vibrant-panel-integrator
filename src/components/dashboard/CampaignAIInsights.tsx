import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, TrendingUp, TrendingDown, Zap, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    recommendation?: string;
  };
}

export function CampaignAIInsights() {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['campaignAIInsights'],
    queryFn: async () => {
      console.log('Fetching AI insights...');
      
      // In production, this would come from the ai_insights table
      // For demo, using static insights
      const demoInsights: InsightMetric[] = [
        {
          id: '1',
          type: 'performance',
          message: 'Click-through rate has increased significantly in the evening hours',
          severity: 'success',
          created_at: new Date().toISOString(),
          metrics: {
            current_value: 2.8,
            previous_value: 1.9,
            change_percentage: 47.3,
            trend: 'up',
            recommendation: 'Consider allocating more budget to evening time slots (6 PM - 10 PM)'
          }
        },
        {
          id: '2',
          type: 'anomaly',
          message: 'Unusual drop in conversion rate detected in urban areas',
          severity: 'warning',
          created_at: new Date().toISOString(),
          metrics: {
            current_value: 1.2,
            previous_value: 2.1,
            change_percentage: -42.8,
            trend: 'down',
            recommendation: 'Review targeting settings and creative assets for urban demographics'
          }
        },
        {
          id: '3',
          type: 'optimization',
          message: 'Opportunity identified in untapped market segment',
          severity: 'info',
          created_at: new Date().toISOString(),
          metrics: {
            current_value: 0,
            previous_value: 0,
            change_percentage: 0,
            trend: 'stable',
            recommendation: 'Expand targeting to include suburban areas showing high engagement potential'
          }
        }
      ];
      return demoInsights;
    }
  });

  if (isLoading) {
    return <div>Analyzing campaign data...</div>;
  }

  const getInsightIcon = (type: string, trend?: string) => {
    if (type === 'performance' && trend === 'up') return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (type === 'performance' && trend === 'down') return <TrendingDown className="h-5 w-5 text-red-500" />;
    if (type === 'anomaly') return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    if (type === 'optimization') return <Target className="h-5 w-5 text-blue-500" />;
    return <Zap className="h-5 w-5 text-purple-500" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          AI-Driven Campaign Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights?.map((insight) => (
            <div 
              key={insight.id}
              className="flex flex-col space-y-3 p-4 rounded-lg border bg-card"
            >
              <div className="flex items-start space-x-3">
                {getInsightIcon(insight.type, insight.metrics?.trend)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getSeverityColor(insight.severity)}>
                      {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                    </Badge>
                    {insight.metrics?.change_percentage !== 0 && (
                      <span className={`text-sm ${insight.metrics?.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {insight.metrics?.change_percentage > 0 ? '+' : ''}
                        {insight.metrics?.change_percentage.toFixed(1)}%
                      </span>
                    )}
                  </div>
                  <p className="font-medium mt-1">
                    {insight.message}
                  </p>
                  {insight.metrics?.recommendation && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <span className="font-medium">Recommendation:</span> {insight.metrics.recommendation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}