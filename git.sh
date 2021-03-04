#!/bin/sh

GIT=`which git`
REPO_DIR=/home/username/Sites/git/repo/
${GIT} add --all .
${GIT} commit -m "commit from script"
${GIT} push heroku main
