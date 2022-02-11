import { Injectable } from '@nestjs/common';
import * as uniqid from 'uniqid';
import * as fs from 'fs';
import { exec } from 'child_process';
import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
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
  async startWorker(
    code: string,
    contest: string,
    question: string,
  ): Promise<workerReturn> {
    const workerID = uniqid();
    console.log(`Worker spawned with ID: ${workerID}`);
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
    exec(
      `clang++ ./src/exec/service/runtime/code/${workerID}.cpp -o ./src/exec/service/runtime/${workerID}.out`,
    ).once('exit', () => {
      exec(
        `cd ./src/exec/service/runtime/ && touch ${workerID}.i && sudo sh createWorker.sh ${workerID} ${process.env.TIMEOUT}`,
      );
    });
    return {
      status: 200,
      msg: 'Worker started',
      ansLink: `${process.env.URL}/${workerID}`,
      ansMethod: 'GET',
      // @ts-ignore
      estTime: process.env.TIMEOUT * 1000,
    };
  }

  retrieveAns(id: string): any {
    if (!id) {
      return null;
    }
    return { id: id };
  }
}
