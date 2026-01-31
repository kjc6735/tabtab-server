---
name: commit
description: 변경사항을 분석하고 적절한 커밋 메시지로 커밋합니다.
disable-model-invocation: true
allowed-tools: Bash(git:*)
---

# Git Commit

현재 변경사항을 분석하고 적절한 커밋 메시지와 함께 커밋합니다.

## 작업 순서

1. `git status`로 변경된 파일 확인
2. `git diff --staged`와 `git diff`로 변경 내용 분석
3. `git log --oneline -5`로 최근 커밋 스타일 확인
4. 변경 내용을 분석하여 적절한 커밋 메시지 작성
5. 사용자에게 커밋 메시지 확인 요청
6. 승인 시 커밋 실행

## 커밋 메시지 규칙

- 형식: `<type>: <description>`
- type: feat, fix, refactor, docs, style, test, chore
- description: 한글로 간결하게 작성
- 예시: `feat: 이메일 인증 기능 추가`

## 주의사항

- 커밋 전 반드시 사용자 확인을 받을 것
- .env, credentials 등 민감한 파일은 커밋하지 않을 것
- Co-Authored-By: Claude <noreply@anthropic.com> 추가
