import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    // Action pour le login
    async login(infos) {
      try {
        const response = await $fetch(`/api/auth/login`, {
          method: 'POST',
          body: infos,
          credentials: 'include', // Inclure les cookies HttpOnly
        });

        if (response.success) {
          this.isAuthenticated = true;
          console.log(response.user)
          this.user = response.user;
          console.log('Login successful:', this.user);
          navigateTo("/member")
        } else {
          throw new Error(response.message || 'Login failed');
        }
      } catch (err) {
        throw err;
      }
    },

    // Action pour le logout
    async logout() {
      try {
        const response = await $fetch(`/api/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });

        if (response.success) {
          this.isAuthenticated = false;
          this.user = null;
          navigateTo("/");
        } else {
          throw new Error(response.message || 'Logout failed');
        }
      } catch (err) {
        throw err;
      }
    },

    // Action pour rafraîchir le token
    async refreshAccessToken() {
      try {
        const response = await $fetch(`/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (response.success) {
          console.log('Token refreshed successfully');
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
          this.user = null;
        }
      } catch (err) {
        this.isAuthenticated = false;
        this.user = null;
      }
    },

    // Action pour récupérer les informations utilisateur
    async fetchUser() {
      try {
        const response = await $fetch(`/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.success) {
          this.isAuthenticated = true;
          this.user = response.user;
          console.log('User fetched successfully:');
          console.log(response.user)
        } else {
          throw new Error(response.message || 'Failed to fetch user');
        }
      } catch (err) {
        this.isAuthenticated = false;
        this.user = null;
        throw err;
      }
    },
  },
});
