import { Paper, Text, UnstyledButton } from "@mantine/core";
import type { NextPage } from "next";
import Link from "next/link";

interface ContestProps {
  name: string;
  tag: string;
}

const ContestCard: NextPage<ContestProps> = ({ name, tag }) => {
  return (
    <Link href={`/contest/${tag}`} passHref>
      <Paper
        className="contest-card"
        p={12}
        sx={(theme) => ({
          display: "block",
          width: "100%",
          cursor: "pointer",

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Text>{name}</Text>
      </Paper>
    </Link>
  );
};

export default ContestCard;
