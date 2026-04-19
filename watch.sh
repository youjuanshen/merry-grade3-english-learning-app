#!/bin/bash
# Merry App 进度监控面板
# 用法：bash watch.sh

clear
echo "=============================="
echo "  Merry App 开发进度监控"
echo "  刷新间隔：5 秒 | Ctrl+C 退出"
echo "=============================="

while true; do
  clear
  echo "=============================="
  echo "  Merry App 开发进度监控  $(date '+%H:%M:%S')"
  echo "=============================="
  echo ""

  # 语法检查
  echo "【语法检查】"
  cd "/Users/shenyoujuan/Desktop/代码 copy 3"
  result=$(node --check coop-types.js 2>&1)
  if [ -z "$result" ]; then
    echo "  ✅ coop-types.js 语法正常"
  else
    echo "  ❌ coop-types.js 报错：$result"
  fi
  echo ""

  # 最新的 Agent 输出文件
  echo "【最新 Agent 输出】"
  latest=$(ls -t /private/tmp/claude-501/-Users-shenyoujuan/*/tasks/*.output 2>/dev/null | head -3)
  if [ -z "$latest" ]; then
    echo "  （暂无 Agent 在运行）"
  else
    for f in $latest; do
      echo "  --- $(basename $f) ---"
      tail -3 "$f" 2>/dev/null | sed 's/^/  /'
    done
  fi
  echo ""

  # 任务清单摘要
  echo "【任务清单摘要】"
  grep -E "^(\| [0-9]|\| ~~)" "/Users/shenyoujuan/Desktop/代码 copy 3/docs/当前任务清单.md" 2>/dev/null | head -8 | sed 's/^/  /'
  echo ""

  echo "  （5 秒后刷新...）"
  sleep 5
done
