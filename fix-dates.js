// Script to fix Date type errors in storage.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the storage.ts file
const storageFilePath = path.join(__dirname, 'server', 'storage.ts');
let content = fs.readFileSync(storageFilePath, 'utf8');

// Replace all instances of new Date().toISOString() with new Date()
content = content.replace(/new Date\(\).toISOString\(\)/g, 'new Date()');

// Write the updated content back to the file
fs.writeFileSync(storageFilePath, content, 'utf8');

console.log('Fixed Date type issues in storage.ts');