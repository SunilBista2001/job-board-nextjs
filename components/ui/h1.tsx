import { Heading } from "@chakra-ui/react";

const CustomHeading = ({ title }: { title: string }) => {
  return <Heading textAlign={"center"}>{title}</Heading>;
};

export default CustomHeading;
