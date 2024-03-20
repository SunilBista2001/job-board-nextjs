import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterJobs } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { jobTypes } from "@/lib/types";
import { jobFilterType } from "@/lib/validations";
import SubmitButton from "@/components/shared/submit-btn";

interface JobFilterSidebarProps {
  defaultValues: jobFilterType;
}

export default async function JobFilterSidebar({
  defaultValues: { q, location, remote, type },
}: JobFilterSidebarProps) {
  const distinctLocations = await prisma.job
    .findMany({
      where: {
        approved: true,
      },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    );

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px] max-sm:mx-4">
      <form
        action={filterJobs}
        key={JSON.stringify({ q, location, remote, type })}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select name="type" defaultValue={type}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select name="location" defaultValue={location}>
              <SelectTrigger className="max-w-full">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {distinctLocations.map((location) => (
                  <SelectItem key={location} value={location as string}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <SubmitButton
            variant={"default"}
            intialText="Filter Jobs"
            loadingText="Filtering Jobs"
          />
        </div>
      </form>
    </aside>
  );
}
