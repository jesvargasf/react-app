import { expect, afterEach, vi, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock de localStorage mejorado
let localStorageData = {};

const localStorageMock = {
  getItem: (key) => localStorageData[key] || null,
  setItem: (key, value) => {
    localStorageData[key] = value;
  },
  removeItem: (key) => {
    delete localStorageData[key];
  },
  clear: () => {
    localStorageData = {};
  },
};

global.localStorage = localStorageMock;

// Cleanup después de cada test
afterEach(() => {
  cleanup();
  localStorageData = {};
});

// Mock de window.alert
global.alert = vi.fn();

// Mock de window.confirm
global.confirm = vi.fn(() => true);
