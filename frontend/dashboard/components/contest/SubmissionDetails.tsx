import { Badge, Stack, Table, Text } from "@mantine/core";
import type { NextPage } from "next";

interface SubmissionProps {
    tests: any[];
    initialTests: any[];
}

const SubmissionDetails: NextPage<SubmissionProps> = ({ tests, initialTests }) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OK':
                return 'green';
            case 'TIMEOUT':
                return 'yellow';
            case 'ERROR':
                return 'red';
            default:
                return 'blue';
        }
    }

    return (
        <Stack>
            <Stack>
                <Text>Final testing report</Text>
                <Table>
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Result</th>
                            <th>Time</th>
                            <th>Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tests.map(test =>
                            <tr key={test.name}>
                                <td>{test.name}</td>
                                <td><Badge color={getStatusColor(test.status)}>{test.status}</Badge></td>
                                <td>{test.time}s/{test.maxTime}s</td>
                                <td>{test.score}/{test.maxScore}</td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </Stack >

            <Stack>
                <Text>Initial testing report</Text>
                <Table>
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Result</th>
                            <th>Time</th>
                            <th>Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {initialTests.map(test =>
                            <tr key={test.name}>
                                <td>{test.name}</td>
                                <td><Badge color={getStatusColor(test.status)}>{test.status}</Badge></td>
                                <td>{test.time}s/{test.maxTime}s</td>
                                <td>0/0</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Stack>
        </Stack >
    );
};

export default SubmissionDetails;
