"use client";

import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Dataset } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function RecentDatasets() {
  const { data: datasets, error, isLoading } = useSWR<Dataset[]>("/api/datasets/recent", fetcher);

  if (error) return <div>Failed to load recent datasets.</div>;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!datasets || datasets.length === 0) {
    return <div className="text-center text-muted-foreground">No datasets have been minted yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {datasets.map((dataset) => (
        <Link href={`/dataset/${dataset.tokenId}`} key={dataset.id}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="truncate">{dataset.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{dataset.domain}</Badge>
                {dataset.tags.split(',').map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
