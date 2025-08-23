import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RecentDatasets } from "@/components/RecentDatasets";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold">VeriField</h1>
        <p className="text-xl text-muted-foreground mt-4">
          A decentralized marketplace for verifiable datasets.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/upload">
            <Button size="lg">Upload Dataset</Button>
          </Link>
          <Link href="/dataset/1">
            <Button size="lg" variant="secondary">
              View Example Dataset
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Recommended for you
        </h2>
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
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Recent Datasets
        </h2>
        <RecentDatasets />
      </section>
    </div>
  );
}
