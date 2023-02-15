import { sendLike } from './common/utils';

class Background {
    store = {
        // tabs: [],
    }

    constructor() {
        console.log('init');

        // 监听tab状态变化事件
        // chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
        //     if (chrome.runtime.lastError) { }
        //     if (changeInfo.status === "complete") {
        //         const tabIds = this.store.tabs.map(v => v.id);
        //         console.log('-----加载完成了-----', tab);
        //         if (tabIds.includes(tabId)) {
        //             console.log('-----可以点赞了-----', tab);
        //             sendLike(tabId);
        //         }
        //     }
        // });

        // 监听插件内通讯消息 只能同步执行
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (chrome.runtime.lastError) { }
            switch (request.event) {
                case "openUrls":
                    this.openUrls(request.params).then(() => {
                        sendResponse();
                    });
                    break;
                default:
                    break;
            }
            // 通过异步地方式响应消息
            return true;
        });
    }

    async openUrls(urls) {
        return new Promise(async resolve => {
            if (urls) {
                await chrome.windows.create({ url: urls }, ({ tabs }) => {
                    console.log('-----窗口打开了-----', tabs);
                    // this.store.tabs = tabs;
                    resolve();
                });
                return;
            }
            resolve();
        });
    }
}

new Background();
