import {
  Avatar,
  Box,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  MdBusiness,
  MdLocationPin,
  MdOutlineAttachMoney,
} from "react-icons/md";
import { friendlyTime } from "@/lib/friendly-time";
import { Job } from "@prisma/client";

type JobCardProps = {
  data: Job;
};

export function JobCard({ data }: JobCardProps) {
  const {
    id,
    title,
    type,
    slug,
    companyName,

    location,
    salary,
    createdAt,
  } = data;

  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      _hover={{ borderColor: "black", boxShadow: "sm" }}
      p="6"
    >
      <LinkBox as="article">
        <Stack direction={{ base: "column", lg: "row" }} spacing="8">
          <Avatar size="lg" name={title} src={""} />
          <Box>
            <LinkOverlay as={NextLink} href={`/job/${slug}`}>
              <Heading size="md">{title}</Heading>
            </LinkOverlay>
            <Text>{companyName}</Text>
            <Stack mt="2" spacing={1}>
              <HStack spacing={1}>
                <MdLocationPin size={14} />
                <Text>{location}</Text>
              </HStack>
              <HStack spacing={1}>
                <MdBusiness size={14} />
                <Text>{type}</Text>
              </HStack>
              <HStack spacing={1}>
                <MdOutlineAttachMoney size={14} />
                <Text>{salary}</Text>
              </HStack>
            </Stack>
          </Box>
          {/* <HStack spacing={2} flex="1">
            {tags.map((tag, index) => (
              <Tag key={index} colorScheme="gray">
                {tag}
              </Tag>
            ))}
          </HStack> */}
          <Text fontSize={"12px"} className="text-right">
            Posted {friendlyTime(new Date(createdAt))}
          </Text>
        </Stack>
      </LinkBox>
    </Box>
  );
}
