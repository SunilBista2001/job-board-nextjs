import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import JobDetail from "@/components/shared/job/job-detail";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface JobDetailPageProps {
  params: {
    slug: string;
  };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job) return notFound();

  return job;
});

export async function generateMetadata({
  params: { slug },
}: JobDetailPageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      slug: true,
    },
  });

  return jobs.map(({ slug }) => slug);
}

const JobDetailPage = async ({ params: { slug } }: JobDetailPageProps) => {
  const job = await getJob(slug);

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetail job={job} />
    </main>
  );
};

export default JobDetailPage;
