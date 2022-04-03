import { Button, Group, LoadingOverlay, Modal, Paper, Tabs, Text } from "@mantine/core";
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
  UserPlus,
  UserMinus,
  Login
} from "tabler-icons-react";
import LoginForm from "../../components/account/LoginForm";
import JoinForm from "../../components/contest/JoinForm";
import MySubmissions from "../../components/contest/MySubmissions";
import ProblemList from "../../components/contest/ProblemList";
import Submit from "../../components/contest/Submit";
import { API_URL } from "../../Constants";

const Contest = () => {
  const router = useRouter();
  const { query } = router;
  const [isLoading, setLoading] = useState(true);
  const [contest, setContest] = useState<any>({
    name: "Loading...",
  });
  const [isOnContest, setIsOnContest] = useState(false);
  const [token, setToken] = useState<null | string>(null);
  const [active, setActive] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);

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

  function leaveContest(tag: any) {
    const token = localStorage.getItem('Authorization')
    if (tag == undefined || token == undefined) return;
    axios
      .post(`${API_URL}/contests/leave/${tag}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
          showNotification({
            color: 'green',
            title: 'Success',
            message: `You've left this contest successfully`
          })
          setIsOnContest(false);
      })
      .catch(() => {
        showNotification({
          color: "red",
          title: "Error",
          message: "Could not leave this contest",
        });
      });
  }

  function checkIfUserIsOnContest(tag: any) {
    const token = localStorage.getItem('Authorization')
    if (tag == undefined || token == undefined) return;
    axios
      .get(`${API_URL}/contests/join/${tag}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
          setIsOnContest(response.data.isUserOnContest);
      })
      .catch(() => {
        showNotification({
          color: "red",
          title: "Error",
          message: "Could not retrieve information about your participation in this contest",
        });
      });
  }

  useEffect(() => {
    loadContestInfo(query.tag);
    checkIfUserIsOnContest(query.tag);
    if (localStorage.getItem('Authorization')) setToken(localStorage.getItem('Authorization'));
  }, [router.isReady, query.tag]);


  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />

      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} withCloseButton={false}>
        <Text size="md" weight={700}>Are you sure?</Text>
        <Text py={10}>After leaving the contest, some data may be lost or unavailable.<br/>Are you sure that you want to leave this contest?</Text>
        <Group position="center" grow>
          <Button color="red" variant="outline" onClick={() => {setModalOpened(false); leaveContest(contest.tag);}}>Yes</Button>
          <Button color="green" onClick={() => { setModalOpened(false); }}>No</Button>
        </Group>
      </Modal>

      <div>
        <Paper p={8} mb={8}>
          <Group position="apart">
            <Text size="lg" ml={8}>{contest.name}</Text>
            {isOnContest && <Button variant="subtle" color="red" onClick={() => setModalOpened(true)}><UserMinus size={20} /></Button>}
          </Group>
        </Paper>

        <Tabs active={active} onTabChange={index => setActive(index)}>
          <Tabs.Tab label="Problems" icon={<Books size={18} />}><ProblemList contestTag={contest.tag} /></Tabs.Tab>
          <Tabs.Tab label="Files" icon={<File size={18} />}></Tabs.Tab>
          <Tabs.Tab label="Ranking" icon={<ListNumbers size={18} />}></Tabs.Tab>

          <Tabs.Tab label="Submit" icon={<FileUpload size={18} />} hidden={!isOnContest}><Submit contestTag={contest.tag} /></Tabs.Tab>
          <Tabs.Tab label="My Submissions" icon={<Send size={18} />} hidden={!isOnContest}><MySubmissions contestTag={contest.tag} /></Tabs.Tab>
          <Tabs.Tab label="Messages" icon={<Mailbox size={18} />} hidden={!isOnContest}></Tabs.Tab>

          <Tabs.Tab label="Join" icon={<UserPlus size={18} />} hidden={isOnContest || token == null}>
            <JoinForm tag={contest.tag} onJoin={() => {
              setIsOnContest(true);
              setActive(0);
            }} />
          </Tabs.Tab>

          <Tabs.Tab label="Login" icon={<Login size={18} />} hidden={token != null}>
            <LoginForm
              onLogin={(token, username, email) => {router.reload()}}
            />
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Contest;
