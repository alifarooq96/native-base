-- CreateTable
CREATE TABLE "BookingLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookingLead_email_idx" ON "BookingLead"("email");

-- CreateIndex
CREATE INDEX "BookingLead_createdAt_idx" ON "BookingLead"("createdAt");
