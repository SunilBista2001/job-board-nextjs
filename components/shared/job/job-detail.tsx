import { formatMoney } from "@/lib/utils";
import { Avatar } from "@chakra-ui/react";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Markdown from "../markdown";

type JobDetailProps = {
  job: {
    title: string;
    companyName: string | null;
    location: string | null;
    type: string | null;
    locationType: string | null;
    salary: number | null;
    description: string | null;
  };
};

const JobDetail = ({ job }: JobDetailProps) => {
  const {
    title,
    companyName,
    type,
    locationType,
    salary,
    description,
    location,
  } = job;
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        <Avatar size="lg" src={companyName!} />

        <div>
          <div>
            <h1 className="text-xl font-bold">{title!}</h1>
            <p className="font-semibold">
              <span>{companyName!}</span>
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {type!}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationType!}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary!)}
            </p>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
};

export default JobDetail;
