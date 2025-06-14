OWNER MUST REMEMBER TO RUN IN GIT CMD:

C:\Users\crazy>cd "C:\Users\crazy\Desktop\Bot Developing - v1"

C:\Users\crazy\Desktop\Bot Developing - v1>git add .
warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'status.json', LF will be replaced by CRLF the next time Git touches it

C:\Users\crazy\Desktop\Bot Developing - v1>git commit -m "Add flexible !status command with activity type support"
[main 656415a] Add flexible !status command with activity type support
 6 files changed, 164 insertions(+), 29 deletions(-)
 create mode 100644 commands/embed.js
 create mode 100644 commands/say.js
 create mode 100644 status.json

C:\Users\crazy\Desktop\Bot Developing - v1>git push origin main
To https://github.com/SirEzz154/Developing-Bot---v1.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/SirEzz154/Developing-Bot---v1.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

C:\Users\crazy\Desktop\Bot Developing - v1>git pull origin main
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (3/3), 939 bytes | 46.00 KiB/s, done.
From https://github.com/SirEzz154/Developing-Bot---v1
 * branch            main       -> FETCH_HEAD
   8cc0f45..00aaa25  main       -> origin/main
Merge made by the 'ort' strategy.
 README.md | 5 ++---
 1 file changed, 2 insertions(+), 3 deletions(-)

C:\Users\crazy\Desktop\Bot Developing - v1>git push origin main
Enumerating objects: 21, done.
Counting objects: 100% (17/17), done.
Delta compression using up to 12 threads
Compressing objects: 100% (11/11), done.
Writing objects: 100% (11/11), 3.33 KiB | 1.11 MiB/s, done.
Total 11 (delta 4), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (4/4), completed with 3 local objects.
To https://github.com/SirEzz154/Developing-Bot---v1.git
   00aaa25..484127d  main -> main

C:\Users\crazy\Desktop\Bot Developing - v1>
