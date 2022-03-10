-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "mfa" BOOLEAN NOT NULL DEFAULT false,
    "privilege" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Contest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UsersOnContests" (
    "userId" INTEGER NOT NULL,
    "contestId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "contestId"),
    CONSTRAINT "UsersOnContests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnContests_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contestId" INTEGER NOT NULL,
    CONSTRAINT "Problem_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serverId" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "resultsAvailable" BOOLEAN NOT NULL DEFAULT false,
    "resultsId" INTEGER,
    CONSTRAINT "Submission_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Submission_resultsId_fkey" FOREIGN KEY ("resultsId") REFERENCES "Results" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Results" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ProblemTest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "input" TEXT NOT NULL,
    "expectedOut" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "problemId" INTEGER NOT NULL,
    CONSTRAINT "ProblemTest_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score" INTEGER NOT NULL,
    "problemTestId" INTEGER NOT NULL,
    "resultsId" INTEGER,
    CONSTRAINT "TestResult_resultsId_fkey" FOREIGN KEY ("resultsId") REFERENCES "Results" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TestResult_problemTestId_fkey" FOREIGN KEY ("problemTestId") REFERENCES "ProblemTest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Contest_tag_key" ON "Contest"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_serverId_key" ON "Submission"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_resultsId_key" ON "Submission"("resultsId");
