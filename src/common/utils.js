// background
export async function sendLike(tabId, params) {
  return new Promise(resolve => {
    chrome.tabs.sendMessage(tabId, { event: "sendLike", params }, () => {
      if (chrome.runtime.lastError) { }
      resolve();
    });
  })
}

// content
export async function openUrls(urls) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(chrome.runtime.getManifest().id, { event: "openUrls", params: urls }, () => {
      if (chrome.runtime.lastError) { }
      resolve();
    });
  })
}

export function isUrl(url) {
  return /^https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+)/.test(url)
}

export function isZhiHuAnswerUrl(url) {
  return /^https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+)\/question\/[0-9]*\/answer\/[0-9]*/.test(url)
}