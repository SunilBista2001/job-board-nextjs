import JobFilterSidebar from "@/components/shared/job/job-filter-sidebar";
import { JobList } from "@/components/shared/job/job-list";
import CustomHeading from "@/components/ui/h1";
import { jobFilterType } from "@/lib/validations";
import { Box, Stack } from "@chakra-ui/react";
import { Metadata } from "next";
import Head from "next/head";

interface PageProps {
  searchParams: {
    q?: string;
    location?: string;
    type?: string;
    remote?: string;
  };
}

const getTitle = ({ q, location, type, remote }: jobFilterType) => {
  const prefixTitle = q
    ? `${q} jobs`
    : type
    ? `${type} developer jobs`
    : remote
    ? `Remote developer jobs`
    : "All developer jobs";

  const suffixTitle = location ? ` in ${location}` : " ";

  return `${prefixTitle}${suffixTitle}`;
};

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Job Board`,
  };
}

export default function Home({
  searchParams: { q, location, type, remote },
}: PageProps) {
  const filterValues: jobFilterType = {
    q,
    location,
    type,
    remote: remote === "true",
  };

  return (
    <main className="max-w-5xl m-auto my-8">
      <Box>
        <Stack mb="8">
          <CustomHeading title={getTitle(filterValues)} />
        </Stack>
        <section className="flex flex-col md:flex-row space-x-4 ">
          <JobFilterSidebar defaultValues={filterValues} />
          <JobList jobFilterValues={filterValues} />
        </section>
      </Box>
    </main>
  );
}
