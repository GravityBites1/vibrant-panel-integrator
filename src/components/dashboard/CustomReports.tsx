import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CustomReport {
  id: string;
  name: string;
  description: string | null;
  filters: {
    timeRange?: string;
    region?: string;
    partnerId?: string;
  };
  format: 'csv' | 'pdf' | 'excel';
  last_generated: string | null;
}

export function CustomReports() {
  const { data: reports, isLoading } = useQuery({
    queryKey: ['customReports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('custom_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching reports",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      return data as CustomReport[];
    }
  });

  const handleExport = async (report: CustomReport) => {
    try {
      const { data, error } = await supabase
        .from('report_executions')
        .insert({
          report_id: report.id,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Report generation started",
        description: "You will be notified when it's ready"
      });
    } catch (error) {
      toast({
        title: "Error generating report",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Custom Reports</CardTitle>
        <div className="space-x-2">
          <Select defaultValue="daily">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="south">South</SelectItem>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="west">West</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports?.map((report) => (
            <div 
              key={report.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{report.name}</h3>
                {report.description && (
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Last generated: {report.last_generated ? new Date(report.last_generated).toLocaleString() : 'Never'}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExport(report)}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}