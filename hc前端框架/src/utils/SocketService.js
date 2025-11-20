/**
 * @Descripttion: websocket
 * @version:
 * @Author: gonghong
 * @Date: 2023-05-15 14:03:38
 **/
export default class SocketService {
    instance = null //页面中使用的SocketService实例
    ws = null // 和服务端连接的socket对象
    url //地址
    againConnect //断开是否重连
    connected = false // 标识是否连接成功
    sendRetryCount = 0 // 记录重试的次数
    connectRetryCount = 3 // 重新连接尝试的次数
    subscribeList = {} //记载回调函数
    idList = []
    sucessCalback
    constructor(againConnect = true, url, sucess) {
        this.url = url
        this.againConnect = againConnect
        this.sucessCalback = sucess
    }
    //单例模式保证只有一个SocketService实例
    static Instance(sucess) {
        if (!this.instance) {
            this.url = ''
            this.instance = new SocketService(false, this.url, sucess)
        }
        return this.instance
    }
    //  定义连接服务器的方法
    connect() {
        //判断你的浏览器支不支持websocket
        if (!window.WebSocket) {
            return console.log('您的浏览器不支持WebSocket')
        }
        this.ws = new WebSocket(this.url)

        //连接上了
        this.ws.onopen = () => {
            this.connected = true
            // 重置重新连接的次数
            this.connectRetryCount = 0

            if (this.sucessCalback) {
                this.sucessCalback(this.connected)
            }
            console.log('socket连接成功', this.connected)
        }

        //连接关闭了，设置标识值为false，
        this.ws.onclose = () => {
            console.log('socket连接关闭')
            this.connected = false
            this.connectRetryCount++
            if (this.againConnect) {
                setTimeout(() => {
                    this.connect()
                }, 500 * this.connectRetryCount)
            } else {
            }
        }

        this.ws.onerror = () => {
            console.log('socket连接失败')
            this.connected = false
            this.connectRetryCount++
            if (this.againConnect) {
                setTimeout(() => {
                    this.connect()
                }, 500 * this.connectRetryCount)
            }
        }

        this.ws.onmessage = (e) => {
            const messageData = JSON.parse(e.data)
            console.log('socket接受了消息', messageData)
            let { payload, id } = messageData
            if (this.subscribeList[id]) {
                this.subscribeList[id].forEach((item) => item(messageData))
            }
        }
    }

    //销毁回调函数
    unSubscribe() {
        //停止消息发送
        this.idList.forEach((item) => {
            this.send({ id: item, type: 'unsub' })
            delete this.subscribeList[item]
        })
    }

    // 发送数据的方法
    send(data, callback) {
        //判断此时有没有ws
        console.log(1)
        if (!this.ws) {
            this.connect()
            setTimeout(() => {
                this.send(data, callback)
            }, 1000)
        } else {
            //debugger
            // 判断此时此刻有没有连接成功
            if (this.connected) {
                if (data.type === 'sub') {
                    //存储id
                    if (this.idList.indexOf(data.id) < 0) {
                        this.idList.push(data.id)
                    }
                    this.subscribeList[data.id] = [callback]
                    //存储回调函数,
                    // if (!this.subscribeList[data.id]) {
                    //     this.subscribeList[data.id] = [callback];
                    // }else{
                    //     this.subscribeList[data.id].push(callback);
                    // }
                }
                this.sendRetryCount = 0
                this.ws.send(JSON.stringify(data))
            } else {
                this.sendRetryCount++
                setTimeout(() => {
                    this.connect()
                }, 500 * this.connectRetryCount)
            }
        }
    }
}
