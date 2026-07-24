import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'node:util';

Object.defineProperty(globalThis, 'TextDecoder', { value: TextDecoder });
Object.defineProperty(globalThis, 'TextEncoder', { value: TextEncoder });
