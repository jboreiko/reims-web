#!/bin/bash

set -e

branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)

if [ $branch == "master" ];
then
    echo "Releasing a new version of master"
    git push origin master
    git push origin master --tags
    grunt release
else
    echo "You do not currently have master checked out, will not release"
fi
