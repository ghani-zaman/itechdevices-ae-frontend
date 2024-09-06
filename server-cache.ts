import 'zone.js/node';
import * as express from 'express';
import { join } from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as fs from 'fs';
import Redis from 'ioredis';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';

const redisClient = new Redis({
  host: 'localhost', // Redis server host
  port: 6379, // Redis server port
  // Add any other relevant Redis configuration options here
});

const distFolder = join(process.cwd(), 'dist/salsoftfront/browser');
const indexHtml = fs.readFileSync(join(distFolder, 'index.html'), 'utf-8');

const server = express();

server.engine('html', async (filePath: string, options: Record<string, any>, callback: (err?: Error | null, html?: string) => void) => {
  const cacheKey = options['req']?.url ?? ''; // Use the request URL as the cache key

  try {
    // Check if the page is available in the Redis cache
    const cachedPage = await redisClient.get(cacheKey);

    if (cachedPage) {
      // If the page is cached, return it directly
      return callback(null, cachedPage);
    } else {
      // If the page is not cached, render the page using Angular Express Engine
      const reqWithUrl = { ...options, url: options['req']?.url }; // Attach the URL to the options object
      const html = await ngExpressEngine(reqWithUrl);

      // Save the rendered page to Redis for future use
      redisClient.set(cacheKey, html);
      // Optionally, set an expiry time for the cached page (e.g., 1 hour)
      redisClient.expire(cacheKey, 3600);

      // Send the rendered page to the client
      return callback(null, html);
    }
  } catch (error) {
    console.error('Error occurred while rendering or caching the page:', error);
    return callback(error);
  }
});

server.set('view engine', 'html');
server.set('views', distFolder);

server.get('*.*', express.static(distFolder, { maxAge: '1y' }));

server.get('*', (req, res) => {
  res.render(indexHtml, { req });
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
