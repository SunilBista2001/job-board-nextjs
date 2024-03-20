"use client";

import SubmitButton from "@/components/shared/submit-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/lib/actions";
import { jobTypes, locationTypes } from "@/lib/types";

const NewJobForm = () => {
  return (
    <div className="w-full flex justify-center">
      <form
        className="shadow-md rounded-md w-full sm:w-1/2 md:w-1/3 p-4 my-10 space-y-3"
        action={createJob}
      >
        <div>
          <h1 className="font-bold">Job details</h1>
          <p className="text-sm text-gray-600">
            Provide a job description and details
          </p>
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="e.g. Frontend Developer"
          />
        </div>
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            name="companyName"
            type="text"
            placeholder="e.g. Acid Integration"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" />
        </div>

        <div>
          <Label htmlFor="type">Job Type</Label>
          <Select name="type">
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

        <div className="flex items-center justify-between gap-4">
          <div className="w-1/2">
            <Label htmlFor="location">Location</Label>

            <Select name="location">
              <SelectTrigger>
                <SelectValue placeholder="Choose location" />
              </SelectTrigger>
              <SelectContent>
                {["Lagos", "Abuja", "Port Harcourt"].map((location) => (
                  <SelectItem value={location} key={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2">
            <Label htmlFor="locationType">Location Type</Label>
            <Select name="locationType">
              <SelectTrigger>
                <SelectValue placeholder="Choose location type" />
              </SelectTrigger>
              <SelectContent>
                {locationTypes.map((location) => (
                  <SelectItem value={location} key={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="salary">Salary</Label>
          <Input type="number" placeholder="e.g. 100000" name="salary" />
        </div>

        <SubmitButton
          variant={"default"}
          intialText="Submit"
          loadingText="Submitting"
        />
      </form>
    </div>
  );
};

export default NewJobForm;
