-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "secretSanta" TEXT[],
    "recipients" TEXT[],
    "listOwner" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_listOwner_fkey" FOREIGN KEY ("listOwner") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
