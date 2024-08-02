## 运行步骤

1. cd one_app

2. flutter pub get

3. flutter run

## 本地打包 android apk

> cd one_app && flutter build apk --release --split-per-abi

证书已存放到了项目里面，如果要更换自己的证书，按照下面的方式执行（非必须）

文档: https://docs.flutter.cn/deployment/android

1. 运行下面的命令生成 upload-keystore.jks

macOS 或者 Linux 系统上:

```shell
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA \
  -keysize 2048 -validity 10000 -alias upload
```

Windows 系统上:

```shell
keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks `
  -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 `
  -alias upload
```

**根据需要只需要输入密钥库口令，其余全部回车即可**

在下面的提示时，输入 Y 即可

CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown是否正确?
[否]:  Y

回车生成 [正在存储 xxx/upload-keystore.jks]

该命令将会把 upload-keystore.jks 文件储存在你的主文件夹中。

2. 创建 key.properties 文件

新建文件 one_app/android/key.properties, storePassword 和 keyPassword 为刚才输入的 密钥库口令。
storeFile 路径为刚才生成的 upload-keystore.jks 的绝对路径。

```
storePassword=oneapp
keyPassword=oneapp
keyAlias=upload
storeFile=xxx/upload-keystore.jks
```

## Github Actions 打包环境变量配置配置  

如果要使用 github actions 打包 app，则需要配置下面的环境变量

| 值              | 获取方式                                           |
| --------------- | -------------------------------------------------- |
| KEYSTORE_BASE64 | base64 -i one_app/android/app/upload-keystore.jks  |
| KEY_ALIAS       | 默认值: upload。可通过上面命令行配置 -alias upload |
| KEY_PASSWORD    | 密钥库口令                                         |
| STORE_PASSWORD  | 密钥库口令                                         |
| GIT_TOKEN       | https://github.com/settings/tokens                 |

## 打包 ios ipa

1. flutter build ios --release --no-codesign

2. 根据 build 文件 生成 one_ios.ipa

```shell
cd one_app
mkdir build/ios/iphoneos/Payload
cp -R build/ios/iphoneos/Runner.app build/ios/iphoneos/Payload/Runner.app
cd build/ios/iphoneos/
zip -q -r one_ios.ipa Payload
```

## tag 触发 Github Actions 打包

> git tag v版本号

git tag 命令:

1. 查看所有 tag 信息: git tag

2. 推送某一 tag 到远程仓库: git push origin v0.0.1

3. 一次推送多个标签: git push origin --tags 或者 git push --tags

4. 删除标签: git tag -d v0.0.1

5. 创建轻量的标签 tag (快速创建 tag): git tag v0.0.1

6. 删除所有本地 tag: git tag -l | xargs git tag -d

7. 从远程拉取所有 tag: git fetch origin --prune