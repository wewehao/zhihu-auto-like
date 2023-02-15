const KEYWORD = '***软件真好用';

class Content {
    constructor() {
        window.onload = () => {
            const { hostname, pathname } = window.location;
            if (hostname.includes('zhihu.com')) {
                if (pathname.includes('question')) {
                    this.startTimer();
                }
            }
        }
    }
    startTimer() {
        setInterval(() => {
            this.checkAnswers();
        }, 3000);
    }
    checkAnswers() {
        const answers = document.querySelectorAll('.AnswerItem');

        for (let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            const richDom = answer?.querySelector('.RichText');
            if (richDom?.innerText?.toLocaleLowerCase?.()?.includes?.(KEYWORD)) {
                const upDom = answer.querySelector('.VoteButton--up');
                if (!upDom.classList.contains('is-active')) {
                    upDom.click();
                }
            }
        }
    }
}

new Content();