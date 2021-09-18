#!/bin/sh
# Download latest swagger-ui and place in docs/openapi

root='docs/openapi'
releases='https://api.github.com/repos/swagger-api/swagger-ui/releases/latest'

response=$(curl -s $releases)
tag=$(echo $response | jq -r '.tag_name')
tarball=$(echo $response | jq -r '.tarball_url')
out_file="$tag.tar.gz"
version_file=$root/release.txt

echo -e "Current release $(cat $version_file 2> /dev/null)\n"
echo -e "Downloading release $tag\n"

wget --no-clobber -O $out_file $tarball

tar xf $out_file -C $root
mv $root/swagger-api-*/dist/* $root
rm -rf $root/swagger-api-*

echo $tag > $version_file

swagger_index='docs/openapi/index.html'
sed -i 's/https:\/\/petstore.swagger.io\/v2\/swagger.json/\/openapi.yaml/' $swagger_index
sed -i 's/<title>Swagger UI/<title>Swagger UI - Tasker/' $swagger_index
