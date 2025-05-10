-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "auth_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kakeibo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isIncome" BOOLEAN NOT NULL,
    "date" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Kakeibo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_id_key" ON "User"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
