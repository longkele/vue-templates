/**
 * @file FIS 配置
 */

/* eslint-disable */

fis.config.set('namespace', 'mis-test');
fis.config.set("project.watch.usePolling", true);

const devUrls = {
    wise: {
        host: 'xxx.com:8210',
        tplDir: '/home/work/'
    }
};

Object.keys(devUrls).forEach(key => {
    fis.media(key)
        .match('*', {
            deploy: fis.plugin('http-push', {
                host: devUrls[key].host,
                to: devUrls[key].tplDir
            })
        })
        .match('*', {
            release: 'static/mis-test/$0'
        })
        .match('*.tpl', {
            release: 'template/mis-test/$0'
        });
});
