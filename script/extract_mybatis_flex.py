import os
import subprocess
from pathlib import Path
import json
import re
import shutil
from operate_markdown import read_markdown_to_string, get_description_and_when_to_use

# 技术文档根目录
root_origin_docs = '../.temp/mybatis-flex/docs'
# 源文档repo根目录
root_origin_repo = '../.temp/mybatis-flex'
# 技术文档配置文档
docs_config_file = '../.temp/mybatis-flex/docs/.vitepress/config.ts'
# mybatis-flex配置文件
config_file = '../componentDocs/mybatis-flex/config.json'
# 目标文档目录
target_docs = '../componentDocs/mybatis-flex/docs'
# 目标文档根目录
target_root = '../componentDocs/mybatis-flex'
# 排除的文档
exclude_docs = ['和同类框架「功能」对比', 'Gradle 依赖', 'Kotlin 使用', '和同类框架「性能」对比', '微信（或QQ）交流群', 'KAPT 设置']

def extract_mybatis_flex():
    """提取mybatis-flex文档"""

    # 解析配置文件
    def extract_define_config():
        # 当前文件所在目录
        current_dir = os.path.dirname(os.path.abspath(__file__))
        # 上一级目录
        parent_dir = os.path.dirname(current_dir)
        print(f'上一级目录: {parent_dir}')
        # 拼接上一级目录中的 extract_mybatis_flex_config.mjs 文件路径pnpm install
        script_file_path = parent_dir + '/script/extract_mybatis_flex_config.mjs'
        print(f'mjs: {script_file_path}')

        result = subprocess.run(
            ["node", script_file_path],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )

        if result.returncode == 0:
            print("✅ 配置加载成功:")
        else:
            print("❌ 错误:", result.stderr)

    # 解析配置文件
    extract_define_config()

    with open(config_file, 'r', encoding='utf-8') as file:
        config_data = json.load(file)
        config_sidebar = config_data['themeConfig']['sidebar']

    target_docs_path = Path(target_docs)
    target_docs_path.mkdir(parents=True, exist_ok=True)

    api_index = []
    if config_sidebar:
        for sidebar_item in config_sidebar:
            module_text = sidebar_item['text']
            module_items = sidebar_item['items']

            if len(module_items):
                for item in module_items:
                    doc_text = item['text']
                    doc_link = item['link']

                    if doc_text in exclude_docs:
                        continue

                    doc_path = root_origin_docs + doc_link + '.md'
                    # 读取文档内容
                    doc_content = read_markdown_to_string(doc_path)
                    description = get_description_and_when_to_use(doc_content)

                    # 正则匹配 <!--@include: ... --> 语句，并捕获路径
                    pattern = r"<!--@include:\s*(.+?)\s*-->"

                    # 查找所有匹配项并提取路径
                    paths = re.findall(pattern, doc_content)

                    for path in paths:
                        if Path(path).name == 'contributors.md':
                            continue
                        # 获取文件路径
                        file_path = os.path.join(Path(doc_path).parent, path)
                        # 读取文件内容
                        file_content = read_markdown_to_string(file_path)
                        # 替换 <!--@include: ... --> 语句为文件内容
                        doc_content = doc_content.replace(f"<!--@include: {path}-->", file_content)

                    target_file_path = Path(target_docs + doc_link + '.md')
                    target_file_path.parent.mkdir(parents=True, exist_ok=True)

                    file_name = Path(doc_link).name
                    api_index.append({
                        "name": doc_text + '(' + file_name + ')',
                        "description": description['description'],
                        "link": doc_link + '.md',
                        "module": module_text,
                    })

                    with open(target_file_path, 'w', encoding='utf-8') as target_file:
                        target_file.write(doc_content)

    # 拷贝changes.md
    shutil.copy(Path(root_origin_docs, 'zh', 'changes.md'), Path(target_root, 'docs', 'changelog.md'))

    # 拷贝FAQ
    faq_file_path = Path(root_origin_docs, 'zh', 'faq.md')
    target_faq_path = Path(target_root, 'docs', 'faq.md')
    api_index.append({
        "name": '常见问题(faq)',
        "description": '',
        "link": 'faq.md',
        "module": '其他',
    })
    shutil.copy(faq_file_path, target_faq_path)

    # 写api-index.json
    if api_index:
        with open(Path(target_root, 'api-index.json'), 'w', encoding='utf-8') as index_file:
            json.dump(api_index, index_file, ensure_ascii=False, indent=4)

    packagePath = os.path.join(root_origin_docs, 'package.json')
    with open(packagePath, 'r', encoding='utf-8') as file:
        packageData = json.load(file)
        apiVersion = packageData['version']
    api_info = {
        "name": "MyBatis-Flex（mybatis-flex）",
        "description": "MyBatis-Flex 是一个优雅的 MyBatis 增强框架，它非常轻量、同时拥有极高的性能与灵活性。我们可以轻松的使用 Mybaits-Flex 链接任何数据库，其内置的QueryWrapper<Badge type=\"tip\" text=\"^亮点\" /> 帮助我们极大的减少了 SQL 编写的工作的同时，减少出错的可能性。\n\n总而言之，MyBatis-Flex 能够极大地提高我们的开发效率和开发体验，让我们有更多的时间专注于自己的事情。",
        "version": apiVersion
    }
    # 写api.json
    if api_info:
        with open(Path(target_root, 'api.json'), 'w', encoding='utf-8') as json_file:
            json.dump(api_info, json_file, ensure_ascii=False, indent=4)

def main():
    extract_mybatis_flex()

if __name__ == '__main__':
    main()
