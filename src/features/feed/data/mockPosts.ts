import type { Post } from '../../../types/post';
import { RoleEnum } from '../../../api/generated/schema';

const annie = {
  id: 'user-annie',
  displayName: 'Annie',
  username: 'annie',
  avatarUrl: 'https://i.pravatar.cc/150?u=annie',
  role: RoleEnum.USER,
  name: 'Annie',
  surname: 'Muernova',
  email: 'annie@gmail.com',
  phoneNumber: '+375256994957',
};

const jorge = {
  id: 'user-jorge',
  displayName: 'Jorge Mckinney',
  username: 'traviswade',
  avatarUrl: 'https://i.pravatar.cc/150?u=jorge',
  role: RoleEnum.USER,
  name: 'Jorge',
  surname: 'Mckinney',
  email: 'jorge.mckinney@gmail.com',
  phoneNumber: '+375291234567',
};

const serenity = {
  id: 'user-serenity',
  displayName: 'Serenity Jones',
  username: 'crystalrobinson',
  avatarUrl: 'https://i.pravatar.cc/150?u=serenity',
  role: RoleEnum.USER,
  name: 'Serenity',
  surname: 'Jones',
  email: 'serenity.jones@gmail.com',
  phoneNumber: '+375293456789',
};

const marcus = {
  id: 'user-marcus',
  displayName: 'Marcus Lee',
  username: 'marcuslee',
  avatarUrl: 'https://i.pravatar.cc/150?u=marcus',
  role: RoleEnum.USER,
  name: 'Marcus',
  surname: 'Lee',
  email: 'marcus.lee@gmail.com',
  phoneNumber: '+375297654321',
};

const elena = {
  id: 'user-elena',
  displayName: 'Elena Petrova',
  username: 'elena_p',
  avatarUrl: 'https://i.pravatar.cc/150?u=elena',
  role: RoleEnum.USER,
  name: 'Elena',
  surname: 'Petrova',
  email: 'elena.petrova@gmail.com',
  phoneNumber: '+375251112233',
};

export const subscriptionFeedPosts: Post[] = [
  {
    id: 'sub-1',
    author: annie,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: new Date(Date.now() - 14_000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/innoter-pink/600/340',
    likes: 42,
  },
  {
    id: 'sub-2',
    author: jorge,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    likes: 3,
  },
  {
    id: 'sub-3',
    author: serenity,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    createdAt: new Date(Date.now() - 172_800_000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/innoter-stripes/600/340',
    likes: 156,
  },
];

export const globalFeedPosts: Post[] = [
  {
    id: 'global-1',
    author: marcus,
    content:
      'Just shipped a new feature. Excited to hear what everyone thinks about the updated feed experience.',
    createdAt: new Date(Date.now() - 120_000).toISOString(),
    likes: 89,
  },
  {
    id: 'global-2',
    author: elena,
    content:
      'Weekend hike photos are up! The trail was incredible and the weather could not have been better.',
    createdAt: new Date(Date.now() - 360_000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/innoter-hike/600/340',
    likes: 214,
  },
  {
    id: 'global-3',
    author: annie,
    content:
      'Reading through the design docs tonight. Love how clean the new sidebar layout feels on mobile.',
    createdAt: new Date(Date.now() - 720_000).toISOString(),
    likes: 12,
  },
  {
    id: 'global-4',
    author: jorge,
    content: 'Hot take: sticky composers make posting feel much more natural than a separate page.',
    createdAt: new Date(Date.now() - 1_800_000).toISOString(),
    likes: 0,
  },
];
