import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/feed/feed.component').then((m) => m.FeedComponent),
  },
  {
    path: 'closet',
    loadComponent: () =>
      import('./features/closet/closet.component').then((m) => m.ClosetComponent),
  },
  {
    path: 'listings/:id',
    loadComponent: () =>
      import('./features/listings/listing-detail.component').then(
        (m) => m.ListingDetailComponent
      ),
  },
  {
    path: 'swaps',
    loadComponent: () =>
      import('./features/swap/swap.component').then((m) => m.SwapComponent),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'impact',
    loadComponent: () =>
      import('./features/impact/impact.component').then((m) => m.ImpactComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
