#!/bin/bash
export PATH=$NODEJS_BIN_V10:$PATH

APP_NAME="app-test"

mkdir -p output

# 使用 内部源 生产模式 安装依赖包
npm install --registry=xxx

if [ $? -ne 0 ]; then
    echo '[npm install] failed to deploy static assets.'
    exit 1
fi

npm run build

if [ $? -ne 0 ]; then
    echo '[build] failed to deploy static assets.'
    exit 1
fi

# 拷贝文件
mkdir -p output/static/$APP_NAME
mkdir -p output/template/$APP_NAME

cp -r dist/*  output/static/$APP_NAME
mv output/static/$APP_NAME/index.tpl output/template/$APP_NAME/index.tpl
# mv output/static/$APP_NAME/favicon.ico output/template/$APP_NAME/favicon.ico
rm -rf output/static/$APP_NAME/index.html
cd output

set +e
find ./ -name .svn -type d -exec rm -rf {} \;
find ./ -name .git -type d -exec rm -rf {} \;
set -e
tar zcf $APP_NAME.tar.gz static template
rm -rf static template
echo "done"
