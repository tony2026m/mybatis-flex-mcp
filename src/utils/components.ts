import { readFile } from "node:fs/promises";
import {join, dirname} from 'node:path';
import { existsSync } from "node:fs";
import { fileURLToPath } from 'node:url';
import {ApiDocData} from "../typings";
import config from '../../config.json';
import {getCache, hasKey, setCache} from "./cache";

const EXTRACTED_DOCS_DIR = "docs";

const FILE_API_INDEX = 'api-index.json';
const API_INFO = 'api.json';

// 获取当前文件所在目录的绝对路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 从 dist 目录向上一级到达项目根目录，然后拼接 componentDocs 路径
// 编译后的代码在 dist/cli.js，所以 __dirname 是 dist 目录
const DOC_ROOT = join(__dirname, config['js']['doc_root']['flex']);

const CHANGELOG_FILE_NAME = 'changelog.md';
const API_LIST = 'api_list';
const API_CHANGELOG = 'api_changelog';
const API_INFO_KEY = 'api_info';

const CACHE_KEY_PREFIX = 'flex_';

/** 加载ProComponents组件列表 */
export async function loadApisList() {
  const cacheKey = CACHE_KEY_PREFIX + API_LIST;
  try {
    if(hasKey(cacheKey)) {
      return getCache(cacheKey);
    }
    const apiListStr = await readFile(join(DOC_ROOT, FILE_API_INDEX), "utf-8");
    const apiList = JSON.parse(apiListStr) as ApiDocData[];

    setCache(cacheKey, apiList);

    return apiList
  } catch (error) {
    console.error(`加载api列表错误: ${(error as Error).message}`);
    return [];
  }
}

/** 根据组件名称查找组件 */
export async function findApiByName(apiName: string) {
  const components: ApiDocData[] = await loadApisList();
  return components.find(
    (c: ApiDocData) => (
        c.name.toLowerCase() === apiName.toLowerCase() ||
      c.name.toLowerCase().includes(apiName.toLowerCase())
    ),
  );
}

/** 获取 ProComponents 特定组件文档 */
export const getApiDocumentation = async (apiName: string) => {
  const cacheKey = CACHE_KEY_PREFIX + apiName;
  if(hasKey(cacheKey)) {
    return getCache(cacheKey);
  }

  const apiDoc: ApiDocData |  undefined = await findApiByName(apiName);
  if (!apiDoc) {
    return ` "${apiName}" 文档不存在`;
  }

  const docPath = join(DOC_ROOT, EXTRACTED_DOCS_DIR, apiDoc.link);

  try {
    if (existsSync(docPath)) {
      const docResult = await readFile(docPath, "utf-8");

      setCache(cacheKey, docResult);

      return docResult
    }

    return `${apiName} 文档不存在`;
  } catch (error) {
    console.error(`获取 ${apiName} 文档错误: ${(error as Error).message}`);
    return `获取 ${apiName} 文档错误: ${(error as Error).message}`;
  }
};

/** 获取 ProComponents changelog文档 */
export const getChangelog = async () => {
  const cacheKey = CACHE_KEY_PREFIX + API_CHANGELOG;
  try {
    if(hasKey(cacheKey)) {
      return getCache(cacheKey);
    }
    const changelog = await readFile(join(DOC_ROOT, EXTRACTED_DOCS_DIR, CHANGELOG_FILE_NAME), "utf-8");

    setCache(cacheKey, changelog);

    return changelog
  } catch (error) {
    console.error(`获取ChangeLog错误: ${(error as Error).message}`);
    return `获取ChangeLog错误: ${(error as Error).message}`;
  }
};

/** 获取 mybatis-flex 介绍文档 */
export const getApiInfo = async () => {
  const cacheKey = CACHE_KEY_PREFIX + API_INFO_KEY;
  try {
    if(hasKey(cacheKey)) {
      return getCache(cacheKey);
    }
    const apiInfo = await readFile(join(DOC_ROOT, API_INFO), "utf-8");

    setCache(cacheKey, apiInfo);

    return apiInfo
  } catch (error) {
    console.error(`加载Mybatis-Flex概要信息错误: ${(error as Error).message}`);
    return "";
  }
};
