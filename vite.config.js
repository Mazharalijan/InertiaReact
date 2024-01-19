import { defineConfig } from 'vite';
import React from "@vitejs/plugin-react"
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    React(),
    laravel({
      input: [
        'resources/css/app.scss',
        'resources/js/app.jsx'],
      refresh: true,
    }),
  ],
});
