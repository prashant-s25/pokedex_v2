# This is the base dockerfile. Here the base image is pulled and the ras setup is done for the project.
# Make sure to include the base setup for lerna here.
FROM node:16 as base
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./
# Package components
FROM base as components-build
WORKDIR /app/packages/components

COPY  packages/components/package.json packages/components/ 

WORKDIR /app/
RUN npx lerna bootstrap --scope=components --includeDependencies
WORKDIR /app/packages/components

# Package utils
FROM base as utils-build
WORKDIR /app/packages/utils

COPY  packages/utils/package.json packages/utils/ 

WORKDIR /app/
RUN npx lerna bootstrap --scope=utils --includeDependencies
WORKDIR /app/packages/utils

# Package pokedex
FROM base as pokedex-build
WORKDIR /app/packages/pokedex

COPY  packages/pokedex/package.json packages/pokedex/ 

WORKDIR /app/
COPY --from=components-build /app/packages/components/package.json /app/packages/components/
COPY --from=utils-build /app/packages/utils/package.json /app/packages/utils/
RUN npx lerna bootstrap --scope=pokedex --includeDependencies
COPY --from=components-build /app/packages/components/ /app/packages/components/
COPY --from=utils-build /app/packages/utils/ /app/packages/utils/
WORKDIR /app/packages/pokedex

# final stage
FROM base
COPY --from=components-build /app/packages/components /app/packages/components
COPY --from=utils-build /app/packages/utils /app/packages/utils
COPY --from=pokedex-build /app/packages/pokedex /app/packages/pokedex