-- CreateEnum
CREATE TYPE "SchoolStatus" AS ENUM ('APPROVED', 'REJECT');

-- CreateEnum
CREATE TYPE "AcademicStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'GRADUATED', 'TRANSFERRED', 'SUSPENDED', 'DROPPED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('WRITING', 'PRACTICAL', 'ORAL');

-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('FIRSTTERM', 'SECONDTERM', 'FINAL');

-- CreateTable
CREATE TABLE "Schools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "principal" TEXT,
    "establishedYear" INTEGER,
    "contactInfo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "SchoolStatus" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 40,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "currentClassId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "fatherName" VARCHAR(100) NOT NULL,
    "motherName" VARCHAR(100) NOT NULL,
    "phone" TEXT,
    "age" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "studentCode" TEXT NOT NULL,
    "rollNumber" INTEGER,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "admissionDate" TEXT NOT NULL,
    "academicStatus" "AcademicStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subjects" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "classesId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "description" TEXT,
    "type" "SubjectType" NOT NULL DEFAULT 'WRITING',
    "maxMark" TEXT NOT NULL,
    "minMark" TEXT NOT NULL,
    "passMark" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exams" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "examType" "ExamType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "examYear" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "classesId" TEXT NOT NULL,

    CONSTRAINT "Exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "classesId" TEXT NOT NULL,
    "studentsId" TEXT NOT NULL,
    "subjectsId" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "obtainedMarks" INTEGER NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Schools_status_idx" ON "Schools"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Classes_name_key" ON "Classes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Classes_schoolId_key" ON "Classes"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "Students_studentCode_key" ON "Students"("studentCode");

-- CreateIndex
CREATE INDEX "Students_schoolId_currentClassId_studentCode_idx" ON "Students"("schoolId", "currentClassId", "studentCode");

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_schoolId_key" ON "Subjects"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_subjectCode_key" ON "Subjects"("subjectCode");

-- AddForeignKey
ALTER TABLE "Schools" ADD CONSTRAINT "Schools_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "Schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "Schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_currentClassId_fkey" FOREIGN KEY ("currentClassId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "Schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "Schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_subjectsId_fkey" FOREIGN KEY ("subjectsId") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
