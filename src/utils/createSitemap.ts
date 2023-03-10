import path from 'path';
import fs from 'fs-extra';
import { config } from './conf.js';
import { getOutput } from '../scripts/build.js';

/**
 * https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap?hl=zh-cn#text
 *
 * ```txt
 * http://www.example.com/file1.html
 * http://www.example.com/file2.html
 * ```
 */
export async function createSitemap() {
  const { asset, homepage, output } = config.data;
  const outputTxt = path.resolve(output, 'sitemap.txt');
  let sitemap: string[] = [];
  if (homepage) {
    sitemap = asset
      .map(({ path: rawPath }) => {
        if (!/\.(md|markdown)/.test(rawPath)) return;
        const myURL = new URL(homepage);
        const outputRaw = path.relative(output, getOutput(rawPath));
        myURL.pathname = path.resolve(myURL.pathname, outputRaw);
        return myURL.href;
      })
      .filter(Boolean);
  }
  await fs.writeFile(outputTxt, sitemap.join('\n'), { encoding: 'utf8' });
}
