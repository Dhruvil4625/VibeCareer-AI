import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
import { prisma } from "@/lib/db/prisma";
import { DashboardClient } from "@/components/shared/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard — Command Center",
};

async function getDashboardData(userId: string) {
  const [applications, resumes, coverLetters, user] = await Promise.all([
    prisma.application.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.resume.count({ where: { userId } }),
    prisma.coverLetter.count({ where: { userId } }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, careerScore: true, targetRole: true, role: true },
    }),
  ]);

  const stats = {
    totalApplications: await prisma.application.count({ where: { userId } }),
    interviews: await prisma.application.count({
      where: { userId, status: "INTERVIEW" },
    }),
    offers: await prisma.application.count({
      where: { userId, status: "OFFER" },
    }),
    careerScore: user?.careerScore ?? 0,
    resumesCreated: resumes,
    coverLettersCreated: coverLetters,
  };

  return { applications, stats, user };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const { applications, stats, user } = await getDashboardData(session.user.id);

  return (
    <DashboardClient
      applications={applications}
      stats={stats}
      userName={user?.name ?? session.user.name ?? ""}
    />
  );
}
