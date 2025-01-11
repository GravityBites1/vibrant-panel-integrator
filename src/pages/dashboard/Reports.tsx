import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Reports = () => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('store_tax_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {reports?.map((report) => (
            <div key={report.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between">
                <div>Type: {report.report_type}</div>
                <div>Status: {report.status}</div>
              </div>
              <div className="mt-2">
                <div>Total Taxable Amount: ${report.total_taxable_amount}</div>
                <div>Total Tax Amount: ${report.total_tax_amount}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;