import { User } from '../models/user';

export const seedUsers = async () => {
  console.log('🌱 Seeding users...');

  const usersToSeed = [
    { username: 'JollyGuru', password: 'password123' },
    { username: 'SunnyScribe', password: 'sunny123' },
    { username: 'RadiantComet', password: 'comet123' }
  ];

  // debug log
  console.log('🧪 Users:', usersToSeed);

  await User.bulkCreate(usersToSeed, { individualHooks: true });
};
