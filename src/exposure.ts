interface CollectObj {
  el: Element; // 曝光元素
  trackData: any;
  exposureCallBack?: (exposure: CollectObj) => void;
}

/**
 * 
 * 
 */
interface exposureConfig {
  threshold?: number[]; // 曝光比例, 默认[0]
  root?: HTMLElement; // 视窗元素
  rootMargin?: string; // 扩大视窗可见范围
  one?: Boolean; // 只曝光一次
}

export class Exposure {
  private observer: IntersectionObserver | null;
  private observerHandles: CollectObj[] = [];

  constructor(exposureConfig: exposureConfig) {
    this.observer = null;
    this.observerHandles = [];
    this.createIntersectionObserver(exposureConfig);
  }

  // 用于依赖收集
  public add(
    el: HTMLElement,
    trackData: any = {},
    exposureCallBack?: (exposure: CollectObj) => void
  ) {
    // collectObj 收集埋点上报信息
    // 当然曝光后的回调函数也可以在这部收集起来等曝光的时候直接调用
    let collectObj: CollectObj = {
      el,
      trackData,
      exposureCallBack,
    };

    // 把曝光对象加入到缓存中
    this.observerHandles.push(collectObj);
    // 监视元素
    this.observer && this.observer.observe(el);
  }

  // 创建一个 IntersectionObserver
  private createIntersectionObserver(exposureConfig: exposureConfig) {
    this.observer = new IntersectionObserver(
      (entries, observer: IntersectionObserver) => {
        const len = entries.length;
        for (let i = 0; i < len; i++) {
          const item = entries[i];
          const target = item.target; // 进入视口的 dom

          // 在缓存里匹配 dom，并得到其对象
          const chooseTarget = this.observerHandles.filter(
            (observerHandle) => observerHandle.el === target
          )[0];
          // 出现在视口内
          if (item.isIntersecting) {
            // 曝光标记

            chooseTarget.exposureCallBack &&
              chooseTarget.exposureCallBack({
                el: chooseTarget.el,
                trackData: chooseTarget.trackData,
              });

            // 可以在 new sdk 的时候传递 one = true 表示只曝光一次,避免重复曝光上报
            // unobserve 方法可以移除监听对象
            exposureConfig.one && observer.unobserve(target);
          }
        }
      },
      {
        root: exposureConfig.root || null,
        rootMargin: exposureConfig.rootMargin,
        threshold: exposureConfig.threshold,
      }
    );
  }
  // 去掉观察
  public disconnect() {
    this.observer && this.observer.disconnect();
    this.observerHandles = [];
  }
}
