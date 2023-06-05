import { defineConfig } from "cypress";
import admin from 'firebase-admin';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return cypressFirebasePlugin(on, config, admin);
    },
  },
});
