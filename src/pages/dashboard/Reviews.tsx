import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Reviews = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
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
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews?.map((review) => (
            <div key={review.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between">
                <div>Rating: {review.rating}/5</div>
                <div>{new Date(review.created_at).toLocaleDateString()}</div>
              </div>
              <p className="mt-2">{review.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;