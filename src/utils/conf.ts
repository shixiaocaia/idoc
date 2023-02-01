import { parse } from 'yaml';
import fs from 'fs-extra';
import path from 'path';
import micromatch from 'micromatch';
import { fileURLToPath } from 'url';
import image2uri from 'image2uri';
import readdirFiles, { IFileDirStat, getStat } from 'recursive-readdir-files';
import { logo } from './logo.js';
import { PageConfig, Toc } from '../markdown/markdown.js';
import { isAbsoluteURL, isOutReadme } from '../markdown/utils.js';
import * as log from '../utils/log.js';
import { cacheFile } from './cacheFileStat.js';

export type LogoOrFavicon = {
  href?: string;
  raw?: string;
  path?: string;
  base64?: string;
  /** svg code */
  code?: string;
};

export interface SiteGlobalConfig {
  /** site name */
  site?: string;
  title?: string;
  keywords?: string;
  /** The url to the project homepage. */
  homepage?: string;
  description?: string;
  scope?: string[];
  scopePrivate?: string[];
  tocs?: Toc[] | boolean;
  /** website logo icon */
  logo?: LogoOrFavicon;
  /** website favicon icon */
  favicon?: LogoOrFavicon;
  editButton?: {
    label?: string;
    url?: string;
  };
  openSource?:
    | string
    | {
        type: string;
        url: string;
      };
  footer?: string;
  menus?: Record<
    string,
    | string
    | {
        url: string;
        active: boolean;
        target: string;
      }
  >;
  /**
   * https://github.com/jaywcjlove/idoc/issues/58
   */
  cacheFileStat?: boolean;
  copyAssets?: string | string[];
  /** minify HTML */
  minify?: boolean;
  /** Template Data */
  data?: Record<string, any>;
  theme?: string;
  sideEffectFiles?: Array<string>;
}

export interface Config extends SiteGlobalConfig {
  root: string;
  dir: string;
  output: string;
  chapters: Array<Record<string, string>>;
  asset: IFileDirStat[];
  config?: Partial<Record<'conf' | 'chapters', string>>;
  /** `<process.cwd()>/README.md` */
  readme?: string;
  /** project version */
  version?: string;
  /** idoc version */
  idocVersion?: string;
  global?: IdocConfig;
  page?: PageConfig;
}

export interface IdocConfig extends Omit<Config, 'logo' | 'favicon'> {
  /** website logo icon */
  logo?: string | LogoOrFavicon;
  /** website favicon icon */
  favicon?: string | LogoOrFavicon;
}

export type MenuData = {
  name: string;
  url?: string;
  raw?: string;
  active?: boolean;
  target?: string;
};

export const cacheCopyiedFiles: string[] = [];

export class Conf {
  constructor() {
    this.initConf();
  }
  data: Config = {
    root: process.cwd(),
    dir: '',
    output: '',
    // dir: path.resolve(process.cwd(), 'docs'),
    // output: path.resolve(process.cwd(), 'dist'),
    chapters: [],
    config: {},
    asset: [],
    scope: [],
    scopePrivate: [],
    data: {},
    site: 'idoc',
    logo: {
      base64: logo,
    },
    favicon: {
      base64: logo,
    },
    keywords: '',
    footer: '',
    global: {} as Config,
    page: {},
  };
  get all() {
    return this.data;
  }
  set footer(str: string) {
    this.data.footer = str.replace('{{idocVersion}}', this.data.idocVersion).replace('{{version}}', this.data.version);
  }
  set logo(src: string) {
    this.data.logo = transformLogoOrFavicon(src) as unknown as Config['logo'];
  }
  set favicon(src: string) {
    this.data.favicon = transformLogoOrFavicon(src) as unknown as Config['favicon'];
  }
  set all(data: Config) {
    Object.keys(data).forEach((key: keyof Config) => {
      if (key === 'favicon') {
        this.favicon = data[key] as string;
      } else if (key === 'logo') {
        this.logo = data[key] as string;
      } else if (key === 'footer') {
        this.footer = data[key] || '';
      } else {
        this.data[key] = data[key] as never;
      }
    });
  }
  async initConf() {
    const pkgpath = path.resolve(this.data.root, 'package.json');
    if (fs.existsSync(pkgpath)) {
      const pkg = await fs.readJSON(pkgpath);
      this.data.version = pkg.version;
      this.data.site = pkg.title || pkg.name || '';
      this.data.keywords = pkg.keywords && Array.isArray(pkg.keywords) ? pkg.keywords.join(',') : '';
      if (pkg.repository && pkg.repository.url) {
        pkg.repository.url = pkg.repository.url.replace(/^git\+/, '');
      }
      this.data.openSource = pkg.repository || '';
      this.data.homepage = pkg.homepage || '';
    }
    const confPath = path.resolve(this.data.root, 'idoc.yml');
    const defaultDocsPath = path.resolve(process.cwd(), 'docs');
    const defaultOutputPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(confPath)) {
      this.data.config.conf = confPath;
      const conf = await fs.readFile(confPath, 'utf8');
      const data: IdocConfig = parse(conf);
      config.data.global = { ...data };
      data.dir = this.data.dir || (data.dir ? path.resolve(process.cwd(), data.dir) : defaultDocsPath);
      data.output = this.data.output || (data.output ? path.resolve(process.cwd(), data.output) : defaultOutputPath);
      // console.log('config.data.data', data, this.data)
      this.data.tocs = data.tocs === false ? data.tocs : undefined;
      this.data = Object.assign(this.data, data);
      this.logo = (data.logo || logo) as string;
      this.favicon = (data.favicon || logo) as string;
      this.data.sideEffectFiles = (data.sideEffectFiles || []).map((filepath) => path.resolve(filepath));
      if (data.minify) this.data.minify = data.minify;
      if (data.homepage) this.data.homepage = data.homepage;
      this.initScope();
    } else {
      if (!this.data.dir) {
        this.data.dir = defaultDocsPath;
      }
      if (!this.data.output) {
        this.data.output = defaultOutputPath;
      }
    }
    await cacheFile.init(this.data.cacheFileStat);
    await cacheFile.load();
    if (this.data.theme === 'default' || !this.data.theme) {
      this.data.theme = fileURLToPath(new URL('../../themes/default', import.meta.url));
    }

    const pkgIdoc = await fs.readJSON(fileURLToPath(new URL('../../package.json', import.meta.url)));
    this.data.idocVersion = pkgIdoc.version;
    if (this.data.footer) {
      this.footer = this.data.footer;
    }
    return this.data;
  }
  async getChaptersConf() {
    const chaptersPath = path.resolve(this.data.root, 'idoc.chapters.yml');
    if (fs.existsSync(chaptersPath)) {
      const chapters = await fs.promises.readFile(chaptersPath, 'utf8');
      this.data.config.chapters = chaptersPath;
      this.data.chapters = parse(chapters) || [];
      config.data.global.chapters = [...this.data.chapters];
    }
  }
  async getFiles() {
    const { copyAssets = '' } = this.data;
    let files: IFileDirStat[] = [];
    if (fs.existsSync(this.data.dir)) {
      files = await readdirFiles(this.data.dir, {
        ignored: /\/(node_modules|\.git)/,
        filter: (filestat) => {
          if (/.(md|markdown)$/.test(filestat.path)) {
            cacheFile.add(filestat);
          }
          return /.(md|markdown)$/.test(filestat.path) || (copyAssets && micromatch.isMatch(filestat.path, copyAssets));
        },
      });
    }
    this.data.asset = files;
    const { sideEffectFiles = [] } = this.data;
    await Promise.all(
      sideEffectFiles.map(async (filename) => {
        if (!fs.existsSync(filename)) {
          log.log('\x1b[31;1mcreate\x1b[0m')(filename);
          console.log(
            `    ╰┈\x1b[31;1m FAIL\x1b[0m ->`,
            `Markdown file \x1b[33;1m${filename}\x1b[0m does not exist. \n`,
            `              Please check your configuration.`,
          );
          return;
        }
        const stat = await getStat(path.resolve(filename));
        if (/.(md|markdown)$/.test(stat.path)) {
          cacheFile.add(stat);
        }
        this.data.asset.push(stat);
      }),
    );
  }
  async getReadme() {
    const readmePath = path.resolve(this.data.root, 'README.md');
    const readmeDirPath = path.resolve(this.data.dir, 'README.md');
    const existsReadmeDir = this.data.asset.find((item) => item.path === readmeDirPath);
    const existsReadme = this.data.asset.find((item) => isOutReadme(item.path));
    if (existsReadmeDir) {
      this.data.readme = existsReadmeDir.path;
    } else if (fs.existsSync(readmePath) && !existsReadme) {
      this.data.readme = readmePath;
      const stat = await getStat(readmePath);
      this.data.asset.push(stat);
      config.data.global.asset = [...this.data.asset];
    }
  }
  initScope() {
    const { menus = {} } = this.data;
    Object.keys(menus).forEach((key) => {
      const url = menus[key];
      const urlhref = typeof url === 'object' ? url.url : url;
      const [_, scope] = urlhref
        .split(' ')
        .map((val: string) => (val || '').trim())
        .filter(Boolean);
      if (scope && !this.data.scope.includes(scope)) {
        this.data.scope.push(scope.trim());
      }
    });
  }
  getRelativePath(toPath: string) {
    const rel = path.relative(path.dirname(toPath), config.data.output).split(path.sep).join('/');
    return rel ? rel + '/' : '';
  }
  getMenuData(toPath: string) {
    const data: MenuData[] = [];
    const scope = [...this.data.scope].find((item) => isScope(toPath, item));
    if (this.data.menus) {
      Object.keys(this.data.menus).forEach((key) => {
        const url = this.data.menus[key];
        const urlhref = typeof url === 'object' ? url.url : url;
        const [value] = (urlhref || '')
          .split(' ')
          .map((val: string) => (val || '').trim())
          .filter(Boolean);
        const menu: MenuData = { name: key, raw: value, target: '' };
        if (typeof url === 'object' && url.target) {
          menu.target = url.target;
        }
        const current = path.join(this.data.output, value);
        menu.active = isScope(current, scope) || isActive(current, toPath);
        if (isAbsoluteURL(value)) {
          menu.url = value;
        } else if (toPath === current) {
          menu.url = path.basename(current);
        } else {
          const rel = path.relative(path.dirname(toPath), path.dirname(path.join(this.data.output, value)));
          if (!rel) {
            menu.url = path.basename(value);
          } else if (rel.startsWith('..')) {
            menu.url = path.join(rel, path.basename(value)).split(path.sep).join('/');
          } else if (rel) {
            menu.url = path.relative(path.dirname(toPath), current).split(path.sep).join('/');
          } else {
            menu.url = value;
          }
        }
        data.push(menu);
      });
    }
    return data;
  }
}

export function transformLogoOrFavicon(opts: string | LogoOrFavicon) {
  const data = typeof opts === 'object' ? { raw: '', ...opts } : ({ raw: opts || '' } as LogoOrFavicon);
  if (/^data:image\//.test(data.raw)) {
    data.base64 = data.raw;
  }
  const filePath = path.resolve(config.data.root, data.raw);
  if (fs.existsSync(filePath) && data.raw) {
    data.path = filePath;
    const output = getOutputCurrentPath(filePath);
    data.href = path.relative(config.data.output, output).split(path.sep).join('/');
    fs.ensureDirSync(path.dirname(output));
    fs.copyFileSync(filePath, output);
    // log.output('\x1b[35;1mcopy:favicon\x1b[0m')(filePath, output);
    if (data.raw.toLocaleLowerCase().endsWith('.svg')) {
      data.code = fs.readFileSync(path.resolve(config.data.root, data.raw)).toString();
    }
    data.base64 = image2uri(filePath) as string;
  }
  return data;
}

export function getOutputCurrentPath(current: string) {
  return path.resolve(config.data.output, path.relative(config.data.root, current));
}

export const isIncludesDocs = (assetPath: string) => assetPath.startsWith(config.data.dir);

export function isScope(toPath: string, scope?: string) {
  if (scope) {
    scope = scope.split(path.sep).join(path.sep);
    let relative = path.relative(config.data.output, toPath).split(path.sep).join(path.sep);
    if (new RegExp(`^${scope.split(path.sep).join(path.sep)}`, 'i').test(relative)) {
      return true;
    }
  }
  return false;
}

export function isActive(from: string, toPath: string) {
  from = from.split(path.sep).join(path.sep);
  toPath = toPath.split(path.sep).join(path.sep);

  if (from === toPath) {
    return true;
  }
  const formatFrom = path.dirname(from).replace(config.data.output, '');
  const formatToPath = toPath.replace(config.data.output, '');
  if (formatFrom && formatToPath.includes(formatFrom)) {
    return true;
  }
  return false;
}

export const config = new Conf();
