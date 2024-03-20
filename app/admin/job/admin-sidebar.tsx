"use client";

import SubmitButton from "@/components/shared/submit-btn";
import { approveJob, unapproveJob } from "@/lib/actions";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-sm font-semibold text-green-500">Approved</span>
      ) : (
        <ApproveJobs jobId={job.id} />
      )}
      <RejectJobs jobId={job.id} />
    </aside>
  );
}

function ApproveJobs({ jobId }: { jobId: number }) {
  const [formState, formAction] = useFormState(approveJob, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <SubmitButton
        variant={"default"}
        intialText="Approve"
        loadingText="Approving"
      />
    </form>
  );
}

function RejectJobs({ jobId }: { jobId: number }) {
  const [formState, formDelAction] = useFormState(unapproveJob, undefined);

  return (
    <form action={formDelAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <SubmitButton
        variant={"destructive"}
        intialText="Delete"
        loadingText="Deleting "
      />
    </form>
  );
}
