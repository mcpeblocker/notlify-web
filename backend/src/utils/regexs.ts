
const regexs = {
    userPassword : /^\S+$/,
    userName: /^[a-zA-Zа-яА-ЯёЁқҚғҒҳҲʼʻ’'`]{2,20}(?: [a-zA-Zа-яА-ЯёЁқҚғҒҳҲʼʻ’'`]{2,20}){0,2}$/,
    botToken: /[0-9]{9}:[a-zA-Z0-9_-]{35}$/,
    mongoDbID: /^[0-9a-fA-F]{24}$/
}
export default regexs