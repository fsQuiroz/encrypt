set -e

NEW_VER="$1"

function doLint() {
  yarn lint
}

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

function cleanLastBuild() {
    rm -rf app.zip
    rm -rf dist
}

function build() {
    yarn build
}

function deploy() {
  zip -r app.zip dist
  rsync -az --progress app.zip fsquiroz:~/sn.zip
  rm -rf app.zip
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

doLint
# checkUncommittedChanges
checkBranchIsMain

cleanLastBuild
build
deploy

commitChanges "$NEW_VER"
pushChanges "$NEW_VER"
