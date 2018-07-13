# apelink project

## npm install 到提示下载phantomjs的时候直接暂停然后npm run dev

## npm run dev 报node-sass错误的话
```
npm rebuild node-sass
```



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


##页面结构
```
.page
	.header
	.maintainer
	.footer
	<router-view/>
```