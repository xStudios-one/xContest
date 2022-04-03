import { Group, LoadingOverlay, Paper, Tabs, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Books,
  File,
  FileUpload,
  ListNumbers,
  Mailbox,
  Send,
} from "tabler-icons-react";
import MySubmissions from "../../components/contest/MySubmissions";
import { API_URL } from "../../Constants";

const Contest = () => {
  const router = useRouter();
  const { query } = router;
  const [isLoading, setLoading] = useState(true);
  const [contest, setContest] = useState<any>({
    name: "Loading...",
  });

  function loadContestInfo(tag: any) {
    if (tag == undefined) return;
    axios
      .get(`${API_URL}/contests/${tag}`)
      .then((response) => {
        if (response) {
          setContest(response.data);
          setLoading(false);
        }
      })
      .catch(() => {
        showNotification({
          color: "red",
          title: "Error",
          message: "Could not retrieve any information about this contest",
        });
      });
  }

  useEffect(() => {
    loadContestInfo(query.tag);
  }, [router.isReady, query.tag]);


  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />
      <div>
        <Paper p={8} mb={8}>
          <Group position="center">
            <Text size="lg">{contest.name}</Text>
          </Group>
        </Paper>

        <Tabs>
          <Tabs.Tab label="Problems" icon={<Books size={18} />}></Tabs.Tab>
          <Tabs.Tab label="Files" icon={<File size={18} />}></Tabs.Tab>
          <Tabs.Tab label="Submit" icon={<FileUpload size={18} />}></Tabs.Tab>
          <Tabs.Tab label="My Submissions" icon={<Send size={18} />}><MySubmissions contestTag={contest.tag} /></Tabs.Tab>
          <Tabs.Tab label="Ranking" icon={<ListNumbers size={18} />}></Tabs.Tab>
          <Tabs.Tab label="Messages" icon={<Mailbox size={18} />}></Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Contest;
