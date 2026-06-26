-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW_WITH_TAGS', 'LIKE_NEW', 'GOOD', 'FAIR', 'WORN');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('SWAP', 'SELL', 'DONATE');

-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('TOPS', 'BOTTOMS', 'DRESSES', 'OUTERWEAR', 'SHOES', 'ACCESSORIES', 'ACTIVEWEAR', 'FORMAL', 'SWIMWEAR', 'SLEEPWEAR', 'OTHER');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SPRING', 'SUMMER', 'FALL', 'WINTER', 'ALL_SEASON');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('WOMEN', 'MEN', 'UNISEX', 'KIDS');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('ACTIVE', 'SOLD', 'DONATED', 'SWAPPED', 'EXPIRED', 'DELISTED');

-- CreateEnum
CREATE TYPE "SwapStatus" AS ENUM ('PROPOSED', 'ACCEPTED', 'REJECTED', 'COUNTERED', 'MEETUP_SCHEDULED', 'COMPLETED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SWAP_PROPOSED', 'SWAP_ACCEPTED', 'SWAP_REJECTED', 'NEW_MESSAGE', 'ITEM_SAVED', 'REVIEW_RECEIVED', 'SEASONAL_EVENT');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "avatar_url" TEXT,
    "phone_hash" TEXT,
    "location" JSONB,
    "clothing_sizes" JSONB,
    "style_preferences" TEXT[],
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "swap_score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "brand" TEXT,
    "condition" "Condition" NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "season" "Season" NOT NULL DEFAULT 'ALL_SEASON',
    "category" "ItemCategory" NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'UNISEX',
    "images" JSONB NOT NULL,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listings" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "ListingType" NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'ACTIVE',
    "price" DOUBLE PRECISION,
    "message" TEXT,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "save_count" INTEGER NOT NULL DEFAULT 0,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swap_proposals" (
    "id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "giver_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "offer_item_id" TEXT NOT NULL,
    "message" TEXT,
    "status" "SwapStatus" NOT NULL DEFAULT 'PROPOSED',
    "counter_of_id" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "swap_proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swap_proposal_items" (
    "id" TEXT NOT NULL,
    "proposal_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "swap_proposal_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swaps" (
    "id" TEXT NOT NULL,
    "proposal_id" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "swaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "swap_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_participants" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "conversation_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "MessageType" NOT NULL DEFAULT 'TEXT',
    "image_url" TEXT,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_items" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetups" (
    "id" TEXT NOT NULL,
    "swap_id" TEXT NOT NULL,
    "proposer_id" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "proposed_time" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PROPOSED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meetups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "items_owner_id_idx" ON "items"("owner_id");

-- CreateIndex
CREATE INDEX "items_category_idx" ON "items"("category");

-- CreateIndex
CREATE INDEX "items_size_idx" ON "items"("size");

-- CreateIndex
CREATE INDEX "items_condition_idx" ON "items"("condition");

-- CreateIndex
CREATE UNIQUE INDEX "listings_item_id_key" ON "listings"("item_id");

-- CreateIndex
CREATE INDEX "listings_user_id_idx" ON "listings"("user_id");

-- CreateIndex
CREATE INDEX "listings_status_idx" ON "listings"("status");

-- CreateIndex
CREATE INDEX "listings_type_idx" ON "listings"("type");

-- CreateIndex
CREATE INDEX "listings_created_at_idx" ON "listings"("created_at" DESC);

-- CreateIndex
CREATE INDEX "swap_proposals_giver_id_idx" ON "swap_proposals"("giver_id");

-- CreateIndex
CREATE INDEX "swap_proposals_receiver_id_idx" ON "swap_proposals"("receiver_id");

-- CreateIndex
CREATE INDEX "swap_proposals_status_idx" ON "swap_proposals"("status");

-- CreateIndex
CREATE UNIQUE INDEX "swap_proposal_items_proposal_id_item_id_key" ON "swap_proposal_items"("proposal_id", "item_id");

-- CreateIndex
CREATE UNIQUE INDEX "swaps_proposal_id_key" ON "swaps"("proposal_id");

-- CreateIndex
CREATE INDEX "reviews_target_id_idx" ON "reviews"("target_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_swap_id_author_id_key" ON "reviews"("swap_id", "author_id");

-- CreateIndex
CREATE UNIQUE INDEX "conversation_participants_conversation_id_user_id_key" ON "conversation_participants"("conversation_id", "user_id");

-- CreateIndex
CREATE INDEX "messages_conversation_id_created_at_idx" ON "messages"("conversation_id", "created_at");

-- CreateIndex
CREATE INDEX "notifications_user_id_read_created_at_idx" ON "notifications"("user_id", "read", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "saved_items_user_id_listing_id_key" ON "saved_items"("user_id", "listing_id");

-- CreateIndex
CREATE UNIQUE INDEX "meetups_swap_id_key" ON "meetups"("swap_id");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap_proposals" ADD CONSTRAINT "swap_proposals_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap_proposals" ADD CONSTRAINT "swap_proposals_giver_id_fkey" FOREIGN KEY ("giver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap_proposals" ADD CONSTRAINT "swap_proposals_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap_proposals" ADD CONSTRAINT "swap_proposals_offer_item_id_fkey" FOREIGN KEY ("offer_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap_proposals" ADD CONSTRAINT "swap_proposals_counter_of_id_fkey" FOREIGN KEY ("counter_of_id") REFERENCES "swap_proposals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap_proposal_items" ADD CONSTRAINT "swap_proposal_items_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "swap_proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap_proposal_items" ADD CONSTRAINT "swap_proposal_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swaps" ADD CONSTRAINT "swaps_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "swap_proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_swap_id_fkey" FOREIGN KEY ("swap_id") REFERENCES "swaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetups" ADD CONSTRAINT "meetups_swap_id_fkey" FOREIGN KEY ("swap_id") REFERENCES "swaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetups" ADD CONSTRAINT "meetups_proposer_id_fkey" FOREIGN KEY ("proposer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
