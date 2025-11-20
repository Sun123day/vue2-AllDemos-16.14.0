FROM registry.steam.crcloud.com/crcsoft-aiot/nginx:1.25.3
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY dist/ /usr/share/nginx/html/