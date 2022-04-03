import { Accordion, Badge, Button, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "../../Constants";
import ProblemStats from "./ProblemStats";
import SubmissionDetails from "./SubmissionDetails";

interface ProblemListProps {
    contestTag: string;
}

const ProblemList: NextPage<ProblemListProps> = ({ contestTag }) => {

    const centerDiv = {
        display: 'flex', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center'
    }

    const [problems, setProblems] = useState<any[]>([]);

    const devData = [{id: 'gaz', tag: 'gaz', name: 'Gąsienica'}];

    function getProblems(tag: any) {
        if (tag == undefined) return;
        axios.get(`${API_URL}/problems/${tag}`)
            .then(res => setProblems(res.data))
            .catch(() => showNotification({
                color: 'red',
                title: 'Error',
                message: 'Could not load problems, please try again later'
            }))
    }

    useEffect(() => {
        getProblems(contestTag);
    }, [contestTag]);

    const getScoreColor = (score: number) => {
        if (score == 0) return 'red';
        else if (score < 100) return 'yellow';
        else return 'green';
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'EASY':
                return 'green';
            case 'MEDIUM':
                return 'yellow';
            case 'HARD':
                return 'red';
            case 'INSANE':
                return 'gray';
            default:
                return 'blue';
        }
    }

    return (<>
        <Accordion iconPosition="right">
            {problems.map(problem =>
                <Accordion.Item label={
                    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-evenly' }}>
                        <div style={centerDiv}>
                            <Link href={`/contest/${contestTag}/problem/${problem.tag}`} passHref>
                                <Button component="a" variant="subtle" compact>{problem.name}</Button>
                            </Link>
                        </div>

                        <div style={centerDiv}><Badge mx={6}>{problem.tag}</Badge></div>
                        <div style={centerDiv}><Badge color="cyan" mx={6}>-</Badge></div>
                        <div style={centerDiv}><Badge color={getDifficultyColor(problem.difficulty)} mx={6}>{problem.difficulty}</Badge></div>
                    </div>
                } key={problem.tag} >
                    <ProblemStats memory={problem.memoryLimit} time={problem.timeLimit} submissionsLeft={1-problem.maxSubmissions} maxSubmissions={problem.maxSubmissions}/>
                </Accordion.Item >
            )
            }

        </Accordion >
    </>
    );
};

export default ProblemList;
