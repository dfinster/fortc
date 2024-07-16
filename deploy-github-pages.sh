#!/usr/bin/env bash

export USE_SSH=true

cd website
yarn install && yarn clear && yarn deploy
