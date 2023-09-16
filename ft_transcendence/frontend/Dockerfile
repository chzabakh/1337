FROM node AS deps

WORKDIR /frontend
COPY package*.json ./
RUN npm ci

FROM node AS build

WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node

COPY --from=build /frontend/package.json ./
COPY --from=build /frontend/jsx.d.ts ./
COPY --from=build /frontend/next-env.d.ts ./
COPY --from=build /frontend/next.config.js ./
COPY --from=build /frontend/postcss.config.js ./
COPY --from=build /frontend/tailwind.config.js ./
COPY --from=build /frontend/public ./public
COPY --from=build /frontend/node_modules ./node_modules
COPY --from=build /frontend/.next ./.next

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]