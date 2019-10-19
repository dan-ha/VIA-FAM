#!/bin/bash
BASEDIR=$(pwd)

cd $BASEDIR/backend
npm test
cd $BASEDIR/authService
npm test
