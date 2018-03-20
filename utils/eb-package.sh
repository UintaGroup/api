#!/usr/bin/env bash
{
  stat dist
} || {
  mkdir dist
}
zip dist/$npm_package_name-$npm_package_version.zip -r bin package.json package-lock.json