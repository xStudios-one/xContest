import * as uniqid from 'uniqid';
import * as fs from 'fs';
import { exec } from 'child_process';
import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { ProblemTest } from '@prisma/client';

interface workerReturn {
  status: number;
  msg: string;
  ansLink: string;
  ansMethod: string;
  estTime: number;
}

// CONTEST (ID)
//  Name (string)
//  ...
//  Questions (OBJ)
//    NAME (string)
//    MAXSCORE (int)
//    tests (optional ...)
//    participants ...
@Injectable()
export class ExecService {
  constructor(private prismaService: PrismaService) {}
  async getContest(tag: string) {
    return await this.prismaService.contest.findUnique({
      where: {
        tag: tag,
      },
    });
  }
  async getProblem(tag: string, contestId: number) {
    return await this.prismaService.problem.findMany({
      where: {
        AND: {
          tag: {
            equals: tag,
          },
          contestId: {
            equals: contestId,
          },
        },
      },
    });
  }

  async getProblemTests(problemId: number): Promise<ProblemTest[]> {
    return await this.prismaService.problemTest.findMany({
      where: {
        problemId: problemId,
      },
    });
  }

  async getSubmission(submissionId: string): Promise<any> {
    return await this.prismaService.submission.findMany({
      where: {
        serverId: submissionId,
      },
    });
  }

  async createResults(submissionId: number) {
    return await this.prismaService.results.create({
      data: {
        Submission: {
          connect: {
            id: submissionId,
          },
        },
      },
    });
  }

  async addTestResult(score: number, resultsId: number, testId: number) {
    return await this.prismaService.testResult.create({
      data: {
        score: score,
        results: {
          connect: {
            id: resultsId,
          },
        },
        test: {
          connect: {
            id: testId,
          },
        },
      },
    });
  }

  async startWorker(
    code: string,
    contestTag: string,
    problemTag: string,
    user: any,
  ): Promise<workerReturn> {
    // TODO: get tests and other things for this contest
    const uid = user.userId;
    const contest = await this.getContest(contestTag);
    if (!contest) return;
    const problem = await this.getProblem(problemTag, contest.id);
    if (!problem[0]) return;
    const tests = await this.getProblemTests(problem[0].id);
    const workerID = uniqid();
    console.log(problem[0].id);
    console.log(uid);
    const submission = await this.prismaService.submission.create({
      data: {
        serverId: workerID,
        problemId: problem[0].id,
        authorId: uid,
      },
    });
    fs.writeFile(
      `./src/exec/service/runtime/code/${workerID}.cpp`,
      code,
      function (err) {
        if (err) return console.log(err);
        console.log(
          `Successfully created a code file named: "${workerID}.cpp" with contents: ${code}`,
        );
      },
    );

    const results = await this.createResults(submission.id);

    let i = 0;
    const countNext = async () => {
      ++i;
      if (i >= tests.length) {
        await this.prismaService.submission.update({
          where: {
            id: submission.id,
          },
          data: {
            resultsAvailable: true,
          },
        });
      }
    };

    console.log(`Worker spawned with ID: ${workerID}`);
    exec(
      `clang++ ./src/exec/service/runtime/code/${workerID}.cpp -o ./src/exec/service/runtime/${workerID}-OC.out`,
    ).once('exit', (exitCode) => {
      if (exitCode != 0) {
        console.log('notok');
        return;
      } // TODO: Notify user about compilation error?
      for (const test of tests) {
        fs.copyFileSync(
          `./src/exec/service/runtime/${workerID}-OC.out`,
          `./src/exec/service/runtime/${workerID}-${test.id}.out`,
        );
        exec(
          `cd ./src/exec/service/runtime/ && touch ${workerID}-${test.id}.i && sudo sh createWorker.sh ${workerID}-${test.id} ${process.env.TIMEOUT}`,
        ).once('exit', async () => {
          await this.addTestResult(
            Math.floor(Math.random() * 100),
            results.id,
            test.id,
          );
          countNext();
        });
      }
      fs.unlinkSync(`./src/exec/service/runtime/${workerID}-OC.out`);
    });

    return {
      status: 200,
      msg: 'Worker started',
      ansLink: `${process.env.URL}/exec/${workerID}`,
      ansMethod: 'GET',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      estTime: process.env.TIMEOUT * 1000,
    };
  }

  async retrieveAns(id: string): Promise<any> {
    if (!id) {
      return 'NID';
    }
    const submission = await this.getSubmission(id);
    if (!submission[0]) return undefined;
    if (!submission[0].resultsAvailable) return { resultsAvailable: false };
    const result = await this.prismaService.results.findUnique({
      where: {
        id: submission[0].resultsId,
      },
    });
    try {
      const data = fs.readFileSync(
        `./src/exec/service/runtime/out/${id}-1.o`,
        'utf8',
      );
      if (data == `TIMEOUT-${id}-1\n`)
        return {
          resultsAvailable: false,
          id: id,
          points: 0,
          data: `TIMEOUT: ${id}`,
        };
      return {
        resultsAvailable: true,
        id: id,
        points: result.score,
        data: data,
      };
    } catch (e) {
      return undefined;
    }
  }
}
