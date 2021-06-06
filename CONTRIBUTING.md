# Contributing to dart-node-sdk

## modules

모듈은 `src/libs` 폴더 하위에 생성한다.

### api

dart api 호출 추상화 (http layer)

### fs

로컬 파일시스템이 필요한경우 파일시스템 호출 관련 코드

### model

도메인별 fetch logic 추상화

### request

도메인별 request 추상화 객체 제공

### response

도메인별 response 추상화 객체 제공

## Generating Modules

generator를 이용해 module을 자동 생성한다.

### Usage

**command**

```
npm run gen -- -n <module-name> -m <module-category>
```

**example**

```
# run command
npm run gen -- -n list-item -m api
```

```
# files generated
./src/lib/api
├── list-item.api.spec.ts
└── list-item.api.ts
```

### Module Template이 없는경우

`tools/generater/<module-category>/templates` 하위에 템플릿을 생성한다.

#### filename

파일명 문법은 아래와 같다.

```
__moduleName__.<module-category>.<ext>__tpl__
```

#### Example

`fs` module 템플릿 추가하기

`./tools/generator/fs/templates` 폴더 하위에 아래와 같이 파일을 생성한다.

```
./tools/generator/fs/templates
├── __moduleName__.fs.spec.ts__tpl__
└── __moduleName__.fs.ts__tpl__
```

템플릿은 ejs 문법으로 작성하며, 전달되는 model은 아래와 같다

**template model**

- name: file name (ex: 'list-item')
- className: file name in PascalCase (ex: 'ListItem')
