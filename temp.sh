#!/bin/sh

git filter-branch -f --env-filter '
 if [ "$GIT_AUTHOR_EMAIL" = "okize.com" ]; then
 echo $GIT_AUTHOR_EMAIL
 export GIT_AUTHOR_EMAIL="okize123@gmail.com";
 export GIT_COMMITTER_EMAIL="okize123@gmail.com";
 fi' HEAD~2..