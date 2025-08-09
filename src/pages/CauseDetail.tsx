import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCause, createDonationCheckoutSession } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const CauseDetail = () => {
  const { id } = useParams();
  const causeId = Number(id);
  const { data: cause, isLoading, error } = useQuery({ queryKey: ["cause", causeId], queryFn: () => fetchCause(causeId) });
  if (isLoading) return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="animate-pulse rounded-lg border p-6 space-y-4">
        <div className="h-6 w-1/2 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-2/3 bg-muted rounded" />
        <div className="h-2 w-full bg-muted rounded" />
      </div>
    </div>
  );
  if (error || !cause) return <div className="p-6 text-destructive">Not found</div>;
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{cause.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{cause.mission}</p>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Funding</span>
              <span>
                ${cause.funds_raised.toLocaleString()} / ${cause.funding_goal.toLocaleString()}
              </span>
            </div>
            <Progress value={(cause.funds_raised / Math.max(cause.funding_goal, 1)) * 100} />
          </div>
          <Button onClick={async () => {
            const amountStr = prompt("Amount (USD)", "25");
            if (!amountStr) return;
            const amount = Number(amountStr);
            if (Number.isNaN(amount) || amount <= 0) return;
            const session = await createDonationCheckoutSession(cause.id, amount);
            window.location.href = session.url;
          }}>Donate</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CauseDetail;


