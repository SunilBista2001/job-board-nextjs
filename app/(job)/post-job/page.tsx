import type { Metadata } from "next";
import NewJobForm from "./new-job-form";

export const metadata: Metadata = {
  title: "Post a Job | Job Board",
};

export default function JobPage() {
  return <NewJobForm />;
}
