#!/bin/bash
cd /home/kavia/workspace/code-generation/user-projects-overview-209992-210001/user_projects_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

