#!/bin/sh
# deps: git, elixir (mix)

set -e

export LANG=en_US.utf-8

repo="https://github.com/istudyatuni/tasker"

hash=$(git rev-parse HEAD)
branch=$(git rev-parse --abbrev-ref HEAD)

# build

cd server
mix docs
cd - > /dev/null

echo

git checkout gh-pages

trap "echo -e '\nExiting\n' && git checkout $branch" EXIT

rm -rf docs
mv server/doc docs
rm docs/.build
git add -f docs

echo

git commit --amend -m "Update on $(date -R -u)

Commit $repo/tree/$hash, branch '$branch'"

git checkout $branch

# push

echo

git push -f origin gh-pages
