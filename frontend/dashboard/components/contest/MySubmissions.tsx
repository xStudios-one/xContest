import { Accordion, Badge, Button, Group, Text, MediaQuery } from "@mantine/core";
import type { NextPage } from "next";
import Link from "next/link";
import SubmissionDetails from "./SubmissionDetails";

interface MySubmissionsProps {
    contestTag: string;
}

const MySubmissions: NextPage<MySubmissionsProps> = ({ contestTag }) => {

    const devItems = [
        {
            id: 0, submittedAt: new Date(), problemName: 'Haker', problemTag: 'hak1', kind: 'normal', status: 'OK', score: 100,
            tests: [
                { name: '1a', status: 'OK', time: 0, maxTime: 1, score: 3, maxScore: 3 },
                { name: '1b', status: 'OK', time: 0.2, maxTime: 1, score: 2, maxScore: 2 },
                { name: '1c', status: 'OK', time: 0.01, maxTime: 1, score: 95, maxScore: 95 }
            ],
            initialTests: [
                { name: 0, status: 'OK', time: 0, maxTime: 1 }
            ]
        },
        {
            id: 1, submittedAt: new Date(), problemName: 'Podciąg', problemTag: 'pod1', kind: 'normal', status: 'OK', score: 100,
            tests: [
                { name: '1a', status: 'OK', time: 0, maxTime: 1, score: 2, maxScore: 2 },
                { name: '1b', status: 'OK', time: 0.2, maxTime: 1, score: 6, maxScore: 6 },
                { name: '2a', status: 'OK', time: 0.01, maxTime: 1, score: 50, maxScore: 50 },
                { name: '2b', status: 'OK', time: 0.01, maxTime: 1, score: 42, maxScore: 42 }
            ],
            initialTests: [
                { name: 0, status: 'OK', time: 0.51, maxTime: 1 }
            ]
        },
        {
            id: 2, submittedAt: new Date(), problemName: 'Haker', problemTag: 'hak1', kind: 'normal', status: 'TIMEOUT', score: 50,
            tests: [
                { name: '1a', status: 'OK', time: 0.94, maxTime: 1, score: 50, maxScore: 50 },
                { name: '1b', status: 'TIMEOUT', time: 1, maxTime: 1, score: 0, maxScore: 50 },
            ],
            initialTests: [
                { name: 0, status: 'OK', time: 0.8, maxTime: 1 }
            ]
        },
        {
            id: 3, submittedAt: new Date(), problemName: 'Gąsienica', problemTag: 'gas', kind: 'normal', status: 'OK', score: 100,
            tests: [
                { name: '1a', status: 'OK', time: 0, maxTime: 1, score: 20, maxScore: 20 },
                { name: '1b', status: 'OK', time: 0.2, maxTime: 1, score: 20, maxScore: 20 },
                { name: '1c', status: 'OK', time: 0.01, maxTime: 1, score: 20, maxScore: 20 },
                { name: '2a', status: 'OK', time: 0.6, maxTime: 1, score: 20, maxScore: 20 },
                { name: '3a', status: 'OK', time: 0.2, maxTime: 1, score: 20, maxScore: 20 },
            ],
            initialTests: [
                { name: 0, status: 'OK', time: 0.04, maxTime: 1 }
            ]
        },
        {
            id: 3, submittedAt: new Date(), problemName: 'Gąsienica', problemTag: 'gas', kind: 'normal', status: 'ERROR', score: 66,
            tests: [
                { name: '1a', status: 'OK', time: 0, maxTime: 1, score: 33, maxScore: 33 },
                { name: '1b', status: 'ERROR', time: 0, maxTime: 1, score: 0, maxScore: 34 },
                { name: '1c', status: 'OK', time: 0.01, maxTime: 1, score: 33, maxScore: 33 }
            ],
            initialTests: [
                { name: 0, status: 'OK', time: 0.21, maxTime: 1 }
            ]
        },
    ]

    const centerDiv = {
        display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'
    }

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

    const getScoreColor = (score: number) => {
        if (score == 0) return 'red';
        else if (score < 100) return 'yellow';
        else return 'green';
    }

    return (<>
        <Accordion iconPosition="right">
            {devItems.map(submission =>
                <Accordion.Item label={<div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-evenly' }}>
                    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                        <Text style={{ width: '100%' }} align="center">{submission.submittedAt.toUTCString()}</Text>
                    </MediaQuery>

                    <div style={centerDiv}>
                        <Link href={`/contest/${contestTag}/problem/${submission.problemTag}`} passHref>
                            <Button component="a" variant="subtle" compact>{submission.problemName} ({submission.problemTag})</Button>
                        </Link>
                    </div>

                    <div style={centerDiv}>
                        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                            <Badge>{submission.kind}</Badge>
                        </MediaQuery>
                    </div>

                    <div style={centerDiv}><Badge color={getStatusColor(submission.status)} mx={6}>{submission.status}</Badge></div>

                    <div style={centerDiv}><Badge color={getScoreColor(submission.score)} mx={6}>{submission.score}</Badge></div>
                </div>} key={submission.id} >
                    <SubmissionDetails tests={submission.tests} initialTests={submission.initialTests} />
                </Accordion.Item >
            )
            }

        </Accordion >
    </>
    );
};

export default MySubmissions;
