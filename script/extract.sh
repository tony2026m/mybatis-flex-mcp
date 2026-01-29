#!/bin/bash

# 获取项目根目录
root_dir=$(dirname "$PWD")
echo "项目根目录: $root_dir"

# repo路径
DOC_DIR=$root_dir/.temp/mybatis-flex

REPO_DIR=$1

if [ -n "$REPO_DIR" ]; then
  DOC_DIR=$REPO_DIR
fi

mkdir $DOC_DIR

# remove temp folder
rm -rf $DOC_DIR

# clone pro-components
git clone https://github.com/mybatis-flex/mybatis-flex.git $DOC_DIR --depth 1 --branch main --single-branch --filter=blob:none

pip install PyYAML

# 判断文件夹是否存在
if [ -d "$DOC_DIR" ]; then
  # extract docs
  python $root_dir/script/extract_mybatis_flex.py
else
  echo "文件夹 $DOC_DIR 不存在。"
fi

