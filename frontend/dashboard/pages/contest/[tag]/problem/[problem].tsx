import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProblemStats from "../../../../components/contest/ProblemStats";
import { showNotification } from "@mantine/notifications";
import { API_URL } from "../../../../Constants";
import { Button, Group, LoadingOverlay, Paper, ScrollArea, Text } from "@mantine/core";
import { ArrowBack } from "tabler-icons-react";
import Link from "next/link";

const ProblemData: NextPage = () => {

  const router = useRouter();
  const { query } = router;

  const [problem, setProblem] = useState({
      name: 'Loading...',
      tag: '***',
      memoryLimit: -1,
      timeLimit: -1,
      maxSubmissions: -1,
      difficulty: '-'
  });
  const [isLoading, setIsLoading] = useState(true);

  function getProblemInfo(ctag: any, tag: any) {
    if (ctag == undefined || tag == undefined) return;

    axios.get(`${API_URL}/contests/${ctag}/${tag}`)
    .then(res => {
      setProblem(res.data)
      setIsLoading(false);
    })
    .catch(() => showNotification({
        color: 'red',
        title: 'Error',
        message: 'Could not load problem, please try again later'
    }))
  }

  useEffect(() => {
    getProblemInfo(query.tag, query.problem);
  }, [router.isReady, query.problem, query.tag]);

  return (
    <div style={{ position: "relative", height: '100%'}}>
      <LoadingOverlay visible={isLoading} />

      <Paper p={8} mb={8}>
        <Group position="apart">
            <Text size="lg" ml={8}>{query.tag} - {problem.name} ({problem.tag})</Text>
            <Link href={`/contest/${query.tag}`} passHref>
              <Button component="a" variant="subtle"><ArrowBack size={22} /></Button>
            </Link>
        </Group>
      </Paper>

      <ProblemStats memory={problem.memoryLimit} time={problem.timeLimit} submissionsLeft={1-problem.maxSubmissions} maxSubmissions={problem.maxSubmissions} difficulty={problem.difficulty}/>
    
      <div style={{ height: '1rem' }}></div>
      <embed 
        src="https://pl.usembassy.gov/wp-content/uploads/sites/23/2017/07/Official-Photo-Contest-Rules.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
      </embed>
    </div>
  );
};

export default ProblemData;
