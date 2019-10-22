#!/bin/bash
set -ev
BASEDIR=$(pwd)

cd $BASEDIR/backend
npm test
cd $BASEDIR/authService
npm test
