"use server";

import { redirect } from "next/navigation";
import { createJobSchema, jobFilterSchema } from "./validations";
import { isAdmin, toSlug } from "./utils";
import prisma from "./prisma";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const filterJobs = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
};

export const createJob = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const {
    description,
    companyName,
    location,
    locationType,
    salary: salary,
    type,
    title,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${new Date().getSeconds()}`;

  await prisma.job.create({
    data: {
      title: title.trim(),
      slug,
      description,
      companyName: companyName.trim(),
      location,
      locationType,
      // @ts-ignore
      salary: parseInt(salary),
      type,
    },
  });
  redirect("/job-submitted");
};

// @ts-ignore
export const approveJob = async (prevState: FormState, formData: FormData) => {
  try {
    const id = formData.get("jobId");
    console.log("id ->", id);
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Unauthorized");
    }

    await prisma.job.update({
      where: {
        id: parseInt(id as string),
      },
      data: {
        approved: true,
      },
    });
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
  }
};

export const unapproveJob = async (
  // @ts-ignore
  prevState: FormState,
  formData: FormData
) => {
  try {
    const id = formData.get("jobId");

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Unauthorized");
    }

    await prisma.job.delete({
      where: {
        id: parseInt(id as string),
      },
    });
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
  }
  redirect("/admin");
};
