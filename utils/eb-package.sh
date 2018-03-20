#!/usr/bin/env bash
{
  stat dist
} || {
  mkdir dist
}
zip dist/$npm_package_name.zip -r bin package.json package-lock.json