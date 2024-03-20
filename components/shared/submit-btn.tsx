"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  loadingText: string;
  intialText: string;
  variant: string | null;
};

const SubmitButton = ({
  loadingText,
  intialText,
  variant,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      // @ts-ignore
      variant={variant}
      type="submit"
      className="w-full"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin mr-1" /> {loadingText}
        </>
      ) : (
        <>{intialText}</>
      )}
    </Button>
  );
};

export default SubmitButton;
