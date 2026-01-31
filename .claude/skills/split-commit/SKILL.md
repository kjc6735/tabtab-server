---
name: split-commit
description: 변경사항을 기능별로 분석하여 여러 개의 커밋으로 분리합니다.
disable-model-invocation: true
allowed-tools: Bash(git:*)
---

# Git Split Commit

현재 변경사항을 기능/목적별로 분석하여 여러 개의 논리적인 커밋으로 분리합니다.

## 작업 순서

1. `git status`로 모든 변경된 파일 목록 확인
2. `git diff`로 각 파일의 변경 내용 분석
3. 변경사항을 기능/목적별로 그룹화
4. 각 그룹에 대한 커밋 계획 작성 (파일별 함수/기능 설명 포함)
5. 사용자에게 커밋 계획 확인 요청
6. 승인 시 각 그룹별로 순차적으로 커밋 실행

## 분리 기준

변경사항을 다음 기준으로 분리:

- **기능별**: 새로운 기능 추가는 별도 커밋
- **설정별**: 설정 파일 변경은 별도 커밋
- **리팩토링별**: 리팩토링은 기능 변경과 분리
- **의존성별**: 패키지 추가/변경은 별도 커밋

## 커밋 메시지 규칙

- 형식: `<type>: <description>`
- type: feat, fix, refactor, docs, style, test, chore
- description: 한글로 간결하게 작성

## 출력 형식

커밋 계획을 다음 형식으로 제시 (각 파일에서 추가/변경된 함수와 기능 설명 포함):

```
## 커밋 계획

### 커밋 1: <type>: <description>
- `file1.ts` - 변경 내용 설명
- `file2.ts`
  - `functionName()` - 함수 기능 설명
  - `anotherFunction()` - 함수 기능 설명

### 커밋 2: <type>: <description>
- `file3.ts`
  - `methodA()` - 메서드 기능 설명
  - `methodB()` - 메서드 기능 설명
- `file4.ts` - 변경 내용 설명

...
```

## 설명 작성 가이드

- **Repository**: 어떤 DB 작업을 수행하는지 (조회, 생성, 수정, 삭제)
- **Service**: 비즈니스 로직이 무엇인지
- **Controller**: 어떤 엔드포인트인지 (HTTP 메서드, 경로)
- **Module**: 어떤 의존성을 주입하는지
- **DTO**: 어떤 필드를 검증하는지

## 주의사항

- 각 커밋 전 사용자 확인을 받을 것
- .env, credentials 등 민감한 파일은 커밋하지 않을 것
- 커밋 순서는 의존성을 고려하여 결정 (설정 -> 기능 -> 테스트)
