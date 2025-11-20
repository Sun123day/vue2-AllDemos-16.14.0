# Smart-lift-frame

> Smart-lift-frame是基于vue2+webpack构建，用于作为项目基本结构。

## 一、目录结构说明

```javascript
public
src
|----api							-------------------------项目接口。
|----assets						-------------------------项目静态资源
|----components				-------------------------自定义封装的组件
|----directive				-------------------------自定义指令
|----enums						-------------------------存放枚举
|----icons						-------------------------项目菜单svg
|----lang							-------------------------语言切换配置
|----layout						-------------------------项目组件布局
|----mixins						-------------------------公用方法
|----plugins					-------------------------插件目录，里面包含了组册组件（element ui组件和自定义全局组件）
|----router						-------------------------路由
|----store						-------------------------store缓存
|----styles						-------------------------项目scss样式目录
|----utils						-------------------------项目工具类文件目录
|----views						-------------------------存放项目页面
|----App.vue					-------------------------
|----main.js					-------------------------项目入口文件
|----permission.js		-------------------------项目路由拦截
|----settings.js			-------------------------项目配置文件，里面包含了项目的title、菜单是否展示logo等配置。
.editorconfig
.env.development
.env.production
.eslintignore
.eslintignore.js
.prettierignore
.prettierrc						-------------------------prettierrc格式化配置文件。
babel.config.js
jsconfig.json
jsconfig.json
package.json
proxyConfig.js				-------------------------开发环境时，代理地址配置。
vue.config.js					-------------------------webpack项目配置文件。
```

## 二、安装依赖

> 个人建议采用yarn依赖包管理工具。**<font color='red'>yarn install</font>** 安装package.json依赖,**<font color='red'>yarn add</font>** 安装具体依赖。

## 三、格式化

增加**prettier**格式化，**.prettierrc**作为格式化的配置文件，本项目.prettierrc的tabWidth和eslint都是配置的**4位**。

-   **格式化全部文件**：运行**npm run prettier**，格式化文件不会格式化.gitignore配置忽略的文件和目录。
-   **格式化文件**：运行**npx prettier --write 文件路径**，就可以具体的文件。

## 四、RlTable组件

> **RlTable组件、SearchFormItem、GridItem**已修改为全局组件，不需要在vue文件中引用。RlTable组件把查询、功能按钮、查询分页等进行了封装，基本用法请查看demo文件

## 五、其他说明

接口说明：

-   **api接口**：api接口文件里包含system.js，该文件作为平台登录、退出、修改密码、获取验证码、获取用户信息、获取菜单接口文件。
-   **common.js**:存放功能页面公用的接口文件。
-   **其他接口文件**：功能页面接口文件在api目录里自己建立，名称和页面名称相同。

**store缓存**：单一功能页面需要的store存储在store里的modules目录下。
