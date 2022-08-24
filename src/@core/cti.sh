#!/bin/sh

# Utilizamos o parametos -i para ignorar arquivos
# - em nosso caso estamos ignorando os arquivos spec.ts
# Utilizamos o parametro -b para não gerar arquivos de backup.
# - sem essa configuração seriam criados arquivos index.ts.bkp, com o estado anterio a alteração.

# Create index files in #core/seedwork
npm run cti create './src/@seedwork/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@seedwork/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/@seedwork/infra' -- -i '*spec.ts' -b &&

# Create index files in module #category
npm run cti create './src/category/application' -- -i '*spec.ts' -b &&
npm run cti create './src/category/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/category/infra' -- -i '*spec.ts' -b