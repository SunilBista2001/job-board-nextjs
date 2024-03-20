import { JobCard } from "@/components/shared/job/card";
import CustomHeading from "@/components/ui/h1";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const unapprovedJobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <CustomHeading title="Admin Dashboard" />
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved jobs:</h2>
        {unapprovedJobs.map((job) => (
          <Link key={job.id} href={`/admin/job/${job?.slug}`} className="block">
            <JobCard data={job} />
          </Link>
        ))}
        {unapprovedJobs.length === 0 && (
          <p className="text-muted-foreground">No unapproved jobs</p>
        )}
      </section>
    </main>
  );
}
