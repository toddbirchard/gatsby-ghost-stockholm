#!/bin/bash
PROJECT=pwd
GHOSTVERSION=$(ghost check-update)

if [ ! $GHOSTVERSION -ge 30 ]
then
  ghost update --no-prompt

    sudo mkdir -p $PROJECT/current/core/server/adapters/storage/
    sudo mkdir -p $PROJECT/current/core/server/adapters/storage/gcs/
    sudo mkdir -p $PROJECT/content/adapters/
    sudo mkdir -p $PROJECT/content/adapters/storage/
    sudo mkdir -p $PROJECT/content/adapters/storage/gcs/

  cd $PROJECT/current/
  npm i ghost-v3-google-cloud-storage
  sudo cp -R $PROJECT/current/node_modules/ghost-v3-google-cloud-storage/* $PROJECT/current/core/server/adapters/storage/gcs/
  sudo cp -R $PROJECT/current/node_modules/ghost-v3-google-cloud-storage/* $PROJECT/content/adapters/storage/gcs/

  cd $PROJECT/current/
  npm i

  cd $PROJECT/
  ghost restart
else
  echo "Ghost is already up to date."
fi
