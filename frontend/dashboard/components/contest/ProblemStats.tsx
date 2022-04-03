import { NextPage } from 'next';
import { RingProgress, Text, SimpleGrid, Paper, Center, Group } from '@mantine/core';
interface ProblemStatsProps {
    memory: number;
    time: number;
    submissionsLeft: number;
    maxSubmissions: number;
}

const ProblemStats: NextPage<ProblemStatsProps> = ({ memory, time, submissionsLeft, maxSubmissions }) => {

    const data = [
        {id: 'mem', label: 'Memory Limit', stats: `${memory} YB`},
        {id: 'time', label: 'Time Limit', stats: `${time} light years`},
        {id: 'subl', label: 'Submissions Left', stats: `${submissionsLeft} * 10^8`},
        {id: 'msub', label: 'Max Submissions', stats: `${maxSubmissions} * 10^69`}
    ];

  return (
    <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {data.map(e => 
        <Paper withBorder radius="md" p="xs" key={e.id}>
            <Group position="center">
                <div>
                    <Text color="dimmed" size="xs" transform="uppercase" weight={700} align="center">
                        {e.label}
                    </Text>
                    <Text weight={700} size="xl" align="center">
                        {e.stats}
                    </Text>
                </div>
            </Group>
        </Paper>
      )}
    </SimpleGrid>
  );
}

export default ProblemStats;