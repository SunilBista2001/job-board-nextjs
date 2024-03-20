import { Stack } from "@chakra-ui/react";
import { JobCard } from "./card";
import prisma from "@/lib/prisma";
import { jobFilterType } from "@/lib/validations";
import { Prisma } from "@prisma/client";

interface JobListProps {
  jobFilterValues: jobFilterType;
}

export async function JobList({
  jobFilterValues: { q, location, type, remote },
}: JobListProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          {
            title: { search: searchString },
            companyName: { search: searchString },
            type: { search: searchString },
            locationType: { search: searchString },
            location: { search: searchString },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const data = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <Stack spacing="4">
      {data?.map((job, index) => (
        <JobCard key={index} data={job} />
      ))}
      {data?.length === 0 && (
        <p className="text-xl font-semibold text-gray-500">No jobs found</p>
      )}
    </Stack>
  );
}
