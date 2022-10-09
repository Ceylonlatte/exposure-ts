interface ExposureOptions {
  target: Element; // 曝光元素
  trackData?: Record<string, any>;
  callBack?: (data: ExposureOptions) => void;
}

interface ObserverConfig {
  threshold?: number | number[]; // 曝光比例, 默认[0]
  root?: HTMLElement; // 视窗元素
  rootMargin?: string; // 扩大视窗可见范围
  one?: Boolean; // 只曝光一次
}

export class Exposure {
  private observer: IntersectionObserver | null;
  private observerHandles: ExposureOptions[] = [];

  constructor(observerConfig: ObserverConfig) {
    this.observer = null;
    this.observerHandles = [];
    this.createIntersectionObserver(observerConfig);
  }

  // 用于依赖收集
  public add(options: ExposureOptions) {
    // 把曝光对象加入到缓存中
    this.observerHandles.push({ ...options });
    // 监视元素
    this.observer && this.observer.observe(options.target);
  }

  // 创建一个 IntersectionObserver
  private createIntersectionObserver(observerConfig: ObserverConfig) {
    this.observer = new IntersectionObserver(
      (entries, observer: IntersectionObserver) => {
        const len = entries.length;
        for (let i = 0; i < len; i++) {
          const item = entries[i];
          const target = item.target; // 进入视口的 dom

          // 在缓存里匹配 dom，并得到其对象
          const chooseTarget = this.observerHandles.filter(
            (observerHandle) => observerHandle.target === target
          )[0];
          // 出现在视口内
          if (item.isIntersecting) {
            // 曝光标记

            chooseTarget.callBack &&
              chooseTarget.callBack({
                target: chooseTarget.target,
                trackData: chooseTarget.trackData,
              });

            // 可以在 new sdk 的时候传递 one = true 表示只曝光一次,避免重复曝光上报
            // unobserve 方法可以移除监听对象
            observerConfig.one && observer.unobserve(target);
          }
        }
      },
      {
        root: observerConfig.root || null,
        rootMargin: observerConfig.rootMargin,
        threshold: observerConfig.threshold,
      }
    );
  }
  // 去掉观察
  public disconnect() {
    this.observer && this.observer.disconnect();
    this.observerHandles = [];
  }
}
