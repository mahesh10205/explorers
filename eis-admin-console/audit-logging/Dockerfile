FROM node:8.6 as node
WORKDIR /home
RUN pwd
COPY package.json /home
RUN npm install
COPY ./ /home/
RUN npm run build
FROM nginx
COPY --from=node /home/dist/ /usr/share/nginx/html
COPY web.conf /etc/nginx/conf.d/web.conf
RUN rm -f /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]