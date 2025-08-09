import { useQuery } from "@tanstack/react-query";
import { fetchTribes, type Tribe } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const TribesPage = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["tribes-page"], queryFn: fetchTribes });
  const { toast } = useToast();
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Tribes</h1>
      {isLoading && <p>Loading…</p>}
      {error && <p className="text-destructive">Failed to load</p>}
      <div className="grid gap-6 md:grid-cols-2">
        {(data || []).map((t: Tribe) => (
          <Card key={t.id}>
            <CardHeader>
              <CardTitle>{t.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{t.description}</p>
              <Button onClick={() => toast({ title: "Joined", description: `You joined ${t.name}` })}>Join Tribe</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TribesPage;


