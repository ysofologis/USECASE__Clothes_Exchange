import { PrismaClient, UserRole, Condition, ListingType, ListingStatus, ItemCategory, Season, Gender, SwapStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password for all users
  const passwordHash = await bcrypt.hash('password123', 10);

  // ─── Users ───────────────────────────────────────────
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      passwordHash,
      name: 'Alice Papadopoulou',
      bio: 'Fashion lover from Athens. Love swapping vintage finds!',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      location: { lat: 37.9838, lng: 23.7275 },
      clothingSizes: { tops: 'S', bottoms: 'M', shoes: '38', dresses: 'S' },
      stylePreferences: ['Vintage', 'Minimalist', 'Bohemian'],
      role: UserRole.USER,
      swapScore: 4.8,
      verified: true,
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      passwordHash,
      name: 'Bob Konstantinou',
      bio: 'Minimalist wardrobe enthusiast. Quality over quantity.',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      location: { lat: 37.9755, lng: 23.7348 },
      clothingSizes: { tops: 'L', bottoms: 'L', shoes: '42' },
      stylePreferences: ['Minimalist', 'Streetwear'],
      role: UserRole.USER,
      swapScore: 4.5,
      verified: true,
    },
  });

  const carol = await prisma.user.create({
    data: {
      email: 'carol@example.com',
      passwordHash,
      name: 'Carol Dimitriou',
      bio: 'Love colorful clothes and unique patterns!',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
      location: { lat: 37.9715, lng: 23.7257 },
      clothingSizes: { tops: 'M', bottoms: 'S', shoes: '37' },
      stylePreferences: ['Colorful', 'Eclectic', 'Bohemian'],
      role: UserRole.USER,
      swapScore: 4.2,
      verified: false,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@rewear.gr',
      passwordHash,
      name: 'ReWear Admin',
      bio: 'Platform administrator',
      role: UserRole.ADMIN,
      verified: true,
    },
  });

  console.log(`✅ Created ${4} users`);

  // ─── Items ────────────────────────────────────────────
  const items = await Promise.all([
    // Alice's items
    prisma.item.create({
      data: {
        ownerId: alice.id,
        title: 'Vintage Levi\'s Denim Jacket',
        description: 'Classic 90s denim jacket from Levi\'s. Slightly faded for that perfect worn-in look.',
        brand: "Levi's",
        condition: Condition.LIKE_NEW,
        size: 'M',
        color: 'Blue',
        season: Season.FALL,
        category: ItemCategory.OUTERWEAR,
        gender: Gender.UNISEX,
        images: [{ url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0', isPrimary: true, order: 0 }],
        tags: ['vintage', 'denim', '90s'],
      },
    }),
    prisma.item.create({
      data: {
        ownerId: alice.id,
        title: 'White Linen Summer Dress',
        description: 'Breathable linen dress, perfect for hot Athens summers.',
        condition: Condition.GOOD,
        size: 'S',
        color: 'White',
        season: Season.SUMMER,
        category: ItemCategory.DRESSES,
        gender: Gender.WOMEN,
        images: [{ url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', isPrimary: true, order: 0 }],
        tags: ['summer', 'linen', 'casual'],
      },
    }),
    prisma.item.create({
      data: {
        ownerId: alice.id,
        title: 'Black Ankle Boots',
        description: 'Chelsea-style ankle boots, comfortable for everyday wear.',
        brand: 'Dr. Martens',
        condition: Condition.GOOD,
        size: '38',
        color: 'Black',
        season: Season.ALL_SEASON,
        category: ItemCategory.SHOES,
        gender: Gender.WOMEN,
        images: [{ url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2', isPrimary: true, order: 0 }],
        tags: ['boots', 'chelsea', 'leather'],
      },
    }),
    // Bob's items
    prisma.item.create({
      data: {
        ownerId: bob.id,
        title: 'Merino Wool Sweater',
        description: 'Soft merino wool sweater in charcoal grey. Never worn.',
        brand: 'Uniqlo',
        condition: Condition.NEW_WITH_TAGS,
        size: 'L',
        color: 'Charcoal',
        season: Season.WINTER,
        category: ItemCategory.TOPS,
        gender: Gender.MEN,
        images: [{ url: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a0d', isPrimary: true, order: 0 }],
        tags: ['wool', 'sweater', 'new'],
      },
    }),
    prisma.item.create({
      data: {
        ownerId: bob.id,
        title: 'Olive Cargo Pants',
        description: 'Relaxed-fit cargo pants, multiple pockets. Great for hiking or casual wear.',
        condition: Condition.LIKE_NEW,
        size: 'L',
        color: 'Olive',
        season: Season.ALL_SEASON,
        category: ItemCategory.BOTTOMS,
        gender: Gender.MEN,
        images: [{ url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80', isPrimary: true, order: 0 }],
        tags: ['cargo', 'casual', 'utility'],
      },
    }),
    // Carol's items
    prisma.item.create({
      data: {
        ownerId: carol.id,
        title: 'Floral Maxi Skirt',
        description: 'Beautiful flowing maxi skirt with vibrant floral pattern.',
        condition: Condition.GOOD,
        size: 'M',
        color: 'Multi',
        season: Season.SPRING,
        category: ItemCategory.BOTTOMS,
        gender: Gender.WOMEN,
        images: [{ url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj12', isPrimary: true, order: 0 }],
        tags: ['floral', 'maxi', 'bohemian'],
      },
    }),
    prisma.item.create({
      data: {
        ownerId: carol.id,
        title: 'Striped Cotton T-Shirt',
        description: 'Classic Breton stripe t-shirt in soft cotton.',
        brand: 'H&M',
        condition: Condition.FAIR,
        size: 'M',
        color: 'Navy/White',
        season: Season.SUMMER,
        category: ItemCategory.TOPS,
        gender: Gender.UNISEX,
        images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', isPrimary: true, order: 0 }],
        tags: ['stripes', 'cotton', 'classic'],
      },
    }),
  ]);

  console.log(`✅ Created ${items.length} items`);

  // ─── Listings ─────────────────────────────────────────
  const listings = await Promise.all([
    // Alice's listings
    prisma.listing.create({
      data: {
        itemId: items[0].id,
        userId: alice.id,
        type: ListingType.SWAP,
        status: ListingStatus.ACTIVE,
        message: 'Looking for a leather jacket in similar condition',
        viewCount: 45,
        saveCount: 12,
      },
    }),
    prisma.listing.create({
      data: {
        itemId: items[1].id,
        userId: alice.id,
        type: ListingType.SELL,
        status: ListingStatus.ACTIVE,
        price: 35,
        message: 'Perfect for summer in the city',
        viewCount: 23,
        saveCount: 8,
      },
    }),
    prisma.listing.create({
      data: {
        itemId: items[2].id,
        userId: alice.id,
        type: ListingType.DONATE,
        status: ListingStatus.ACTIVE,
        message: 'Free to a good home! Size 38.',
        viewCount: 67,
        saveCount: 25,
      },
    }),
    // Bob's listings
    prisma.listing.create({
      data: {
        itemId: items[3].id,
        userId: bob.id,
        type: ListingType.SWAP,
        status: ListingStatus.ACTIVE,
        message: 'Want a nice button-up shirt in exchange',
        viewCount: 34,
        saveCount: 15,
      },
    }),
    prisma.listing.create({
      data: {
        itemId: items[4].id,
        userId: bob.id,
        type: ListingType.SELL,
        status: ListingStatus.ACTIVE,
        price: 25,
        viewCount: 18,
        saveCount: 6,
      },
    }),
    // Carol's listings
    prisma.listing.create({
      data: {
        itemId: items[5].id,
        userId: carol.id,
        type: ListingType.SWAP,
        status: ListingStatus.ACTIVE,
        message: 'Open to creative swaps!',
        viewCount: 29,
        saveCount: 11,
      },
    }),
    prisma.listing.create({
      data: {
        itemId: items[6].id,
        userId: carol.id,
        type: ListingType.SELL,
        status: ListingStatus.ACTIVE,
        price: 10,
        viewCount: 52,
        saveCount: 18,
      },
    }),
  ]);

  console.log(`✅ Created ${listings.length} listings`);

  // ─── Swap Proposals ───────────────────────────────────
  const proposal = await prisma.swapProposal.create({
    data: {
      listingId: listings[0].id, // Alice's denim jacket (SWAP)
      giverId: bob.id,
      receiverId: alice.id,
      offerItemId: items[3].id, // Bob's merino sweater
      message: 'Would you swap your denim jacket for my new wool sweater?',
      status: SwapStatus.PROPOSED,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });

  console.log('✅ Created 1 swap proposal');

  // ─── Conversations ────────────────────────────────────
  const conversation = await prisma.conversation.create({
    data: {
      participants: {
        create: [
          { userId: alice.id },
          { userId: bob.id },
        ],
      },
    },
  });

  const messages = await Promise.all([
    prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: bob.id,
        content: 'Hey Alice! I saw your denim jacket listing. Would you be interested in swapping?',
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: alice.id,
        content: 'Hi Bob! What do you have in mind?',
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: bob.id,
        content: 'I have a brand new merino wool sweater from Uniqlo. Never worn, still has tags!',
      },
    }),
  ]);

  console.log(`✅ Created 1 conversation with ${messages.length} messages`);

  // ─── Notifications ────────────────────────────────────
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        userId: alice.id,
        type: 'SWAP_PROPOSED',
        title: 'New Swap Proposal',
        message: 'Bob wants to swap his wool sweater for your denim jacket',
        link: '/swaps/' + proposal.id,
      },
    }),
    prisma.notification.create({
      data: {
        userId: bob.id,
        type: 'NEW_MESSAGE',
        title: 'New Message',
        message: 'Alice replied to your swap inquiry',
        link: '/chat/' + conversation.id,
      },
    }),
  ]);

  console.log(`✅ Created ${notifications.length} notifications`);

  // ─── Saved Items ──────────────────────────────────────
  const savedItems = await Promise.all([
    prisma.savedItem.create({
      data: { userId: alice.id, listingId: listings[3].id }, // Alice saved Bob's sweater
    }),
    prisma.savedItem.create({
      data: { userId: bob.id, listingId: listings[0].id }, // Bob saved Alice's jacket
    }),
    prisma.savedItem.create({
      data: { userId: carol.id, listingId: listings[2].id }, // Carol saved Alice's boots
    }),
  ]);

  console.log(`✅ Created ${savedItems.length} saved items`);

  console.log('\n🎉 Seed completed successfully!');
  console.log(`
📊 Summary:
   • 4 users (Alice, Bob, Carol, Admin)
   • 7 items across different categories
   • 7 listings (3 SWAP, 3 SELL, 1 DONATE)
   • 1 swap proposal
   • 1 conversation with 3 messages
   • 2 notifications
   • 3 saved items
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
