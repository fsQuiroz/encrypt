set -e

NEW_VER="$1"

function checkUncommittedChanges() {
  if ! git diff-index --quiet HEAD --; then
    echo 'There are uncommitted changes'
    echo 'Commit or stash before continue'
    exit 1
  fi
}

function checkBranchIsMain() {
  BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  if [[ "$BRANCH" != "main" ]]; then
    echo "Git branch must be 'main' to release a new version"
    echo "Current branch is '$BRANCH'"
    exit 1
  fi
}

function updateVersion() {
  node fsq/update.version.js --new-version="$1"
  yarn version --new-version "$1" --no-git-tag-version --no-commit-hooks
}

function buildAndDeploy() {
  rm app.zip
  yarn build

  zip -r app.zip dist
  scp app.zip fsquiroz:~/sn.zip
  rm app.zip
  rm -rf dist

  ssh fsquiroz bash /home/frani/deploy-sn
}

function commitChanges() {
  git add .
  git commit -m "Release Version $1"
  git tag "$1"
}

function pushChanges() {
  git push
  git push origin "$1"
}

checkUncommittedChanges
checkBranchIsMain

updateVersion "$NEW_VER"
commitChanges "$NEW_VER"
pushChanges "$NEW_VER"

buildAndDeploy
