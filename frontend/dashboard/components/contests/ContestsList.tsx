import {
  Group,
  Loader,
  Paper,
  ScrollArea,
  Skeleton,
  Stack,
} from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ContestCard from "./ContestCard";
import axios from "axios";
import { API_URL } from "../../Constants";
import { showNotification } from "@mantine/notifications";

const ContestsList: NextPage = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [contests, setContests] = useState<any[]>([]);

  async function loadContests() {
    const response = await axios.get(`${API_URL}/contests`).catch(() => {
      showNotification({
        color: "red",
        title: "Error",
        message: "Unexpected error has occurred while loading contests",
      });
    });

    if (response) {
      setContests(response.data);
      setShowSkeleton(false);
    }
  }

  useEffect(() => {
    loadContests();
  }, []);

  return (
    <ScrollArea style={{ height: "calc(100vh - 100px)" }}>
      {showSkeleton ? (
        <Stack>
          {[1, 2, 3, 4, 5].map((i) => (
            <Paper p={8} py={18} key={i}>
              <Skeleton height={10} width="40%" />
            </Paper>
          ))}
          <Group position="center" mt={10}>
            <Loader variant="dots" />
          </Group>
        </Stack>
      ) : (
        <Stack>
          {contests.map((c) => (
            <ContestCard name={c.name} tag={c.tag} key={c.tag} />
          ))}
        </Stack>
      )}
    </ScrollArea>
  );
};

export default ContestsList;
