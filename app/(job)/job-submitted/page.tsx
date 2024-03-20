import CustomHeading from "@/components/ui/h1";

const JobSubmitted = () => {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
      <CustomHeading title="Job submitted" />
      <p>Your job posting has been submitted and is pending approval.</p>
    </main>
  );
};

export default JobSubmitted;
