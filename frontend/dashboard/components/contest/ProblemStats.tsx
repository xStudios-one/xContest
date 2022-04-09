import { NextPage } from 'next';
import { RingProgress, Text, SimpleGrid, Paper, Center, Group } from '@mantine/core';
interface ProblemStatsProps {
    memory: number;
    time: number;
    submissionsLeft: number;
    maxSubmissions: number;
    difficulty?: string;
}

const ProblemStats: NextPage<ProblemStatsProps> = ({ memory, time, submissionsLeft, maxSubmissions, difficulty }) => {

    const data = [
        {id: 'mem', label: 'Memory Limit', stats: `${(memory < 0 ? '-' : memory)} MB`},
        {id: 'time', label: 'Time Limit', stats: `${(time < 0 ? '-' : time)} seconds`},
        {id: 'subl', label: 'Submissions Left', stats: `${(submissionsLeft < 0 ? '-' : submissionsLeft)}`},
        {id: 'msub', label: 'Max Submissions', stats: `${(maxSubmissions < 0 ? '-' : maxSubmissions)}`}
    ];

    if (difficulty) {
      data.push({id: 'diff', label: 'Difficulty', stats: `${difficulty}`})
    }

  return (
    <SimpleGrid cols={(difficulty ? 5 : 4)} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
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