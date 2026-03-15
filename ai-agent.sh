#!/bin/bash

echo "Starting AI Stack..."

echo "Gemini Agent"
npx @google/gemini-cli &

echo "Aider Agent"
aider --yes &

echo "Claude Agent"
claude-code &

wait
