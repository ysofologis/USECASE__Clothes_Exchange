import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rw-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <span class="text-2xl">👗</span>
              <span class="text-xl font-bold text-emerald-600">Rewear</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" routerLinkActive="text-emerald-600" [routerLinkActiveOptions]="{exact: true}"
               class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              Feed
            </a>
            <a routerLink="/closet" routerLinkActive="text-emerald-600"
               class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              My Closet
            </a>
            <a routerLink="/swaps" routerLinkActive="text-emerald-600"
               class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              Swaps
            </a>
            <a routerLink="/chat" routerLinkActive="text-emerald-600"
               class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              Chat
            </a>
            <a routerLink="/impact" routerLinkActive="text-emerald-600"
               class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              Impact
            </a>
          </div>

          <!-- Right side -->
          <div class="flex items-center space-x-4">
            <!-- Notification bell placeholder -->
            <button class="relative p-2 text-gray-500 hover:text-emerald-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <!-- Unread badge placeholder -->
              <span class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center hidden">
                0
              </span>
            </button>

            <!-- Auth buttons -->
            <a routerLink="/login"
               class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              Log in
            </a>
            <a routerLink="/register"
               class="btn-primary">
              Sign up
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button (click)="toggleMobileMenu()"
                    class="p-2 text-gray-500 hover:text-emerald-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path *ngIf="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path *ngIf="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div *ngIf="mobileMenuOpen" class="md:hidden border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a routerLink="/" (click)="closeMobileMenu()"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
            Feed
          </a>
          <a routerLink="/closet" (click)="closeMobileMenu()"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
            My Closet
          </a>
          <a routerLink="/swaps" (click)="closeMobileMenu()"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
            Swaps
          </a>
          <a routerLink="/chat" (click)="closeMobileMenu()"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
            Chat
          </a>
          <a routerLink="/impact" (click)="closeMobileMenu()"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
            Impact
          </a>
          <a routerLink="/login" (click)="closeMobileMenu()"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
            Log in
          </a>
          <a routerLink="/register" (click)="closeMobileMenu()"
             class="block px-3 py-2 rounded-md text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700">
            Sign up
          </a>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
