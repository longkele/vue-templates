/**
 * @file 点击加锁
 */

export default class Lock {
    // lock 初始加锁状态，duration 延迟解锁的时间，单位秒
    constructor(lock = false, duration = 0) {
        this.isLock = lock;
        if (duration && !isNaN(parseInt(duration, 10))) {
            this.duration = duration;
        } else {
            this.duration = 0;
        }
    }
    setLock(lock) {
        if (lock) {
            this.isLock = lock;
        } else {
            if (this.duration) {
                setTimeout(() => {
                    this.isLock = lock;
                }, this.duration * 1000);
            } else {
                this.isLock = lock;
            }
        }
    }
}
