// extract-config.mjs
import { register } from 'ts-node';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);

// 注册 ts-node，跳过类型检查
register({
  transpileOnly: true,
  compilerOptions: {
    module: 'ESNext',
    target: 'ES2022',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    moduleResolution: 'node',
    baseUrl: '.',
  },
});

function safeSerialize(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (value == null) return null;
    if (typeof value === 'object' && !Array.isArray(value)) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    if (typeof value === 'function' || value instanceof RegExp) {
      return '__FUNCTION_OR_REGEXP__';
    }
    if (typeof value === 'symbol') {
      return '__SYMBOL__';
    }
    if (value === undefined) {
      return '__UNDEFINED__';
    }
    return value;
  }, 2);
}

async function main() {
  try {
    const configPath = path.resolve('../.temp/mybatis-flex/docs/.vitepress/config.ts');
    if (!fs.existsSync(configPath)) {
      console.error('❌ config.ts 不存在！');
      process.exit(1);
    }

    const configModule = await import(configPath);
    let configObj = configModule.default;

    if (typeof configObj === 'function') {
      configObj = configObj();
    }

    const jsonOutput = safeSerialize(configObj);
    const outputPath = path.resolve('../componentDocs/mybatis-flex/config.json');
    fs.mkdirSync('../componentDocs/mybatis-flex', { recursive: true });

    fs.writeFileSync(outputPath, jsonOutput, 'utf-8');
    console.log(`✅ 配置已成功导出到:  $ {outputPath}`);

  } catch (err) {
    console.error('💥 提取配置失败:', err.message || err);
    console.error(err.stack);
    process.exit(1);
  }
}

main();