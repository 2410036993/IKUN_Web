// 实现平滑滚动的函数
export const smoothScrollTo = (targetY, duration) => {
  // 获取当前滚动位置
  const startY = window.scrollY;
  // 计算当前位置与目标位置的时间差
  const diff = targetY - startY;
  // 记录动画进行的时间
  let currentTime = 0;
  // 负责执行单次滚动的动画的计算和更新
  const smoothScroll = () => {
    // 每次调用增加十秒
    currentTime += 10;
    // 计算新的的滚动位置
    const newY = easeInOutQuad(currentTime, startY, diff, duration);
    // 执行滚动
    window.scrollTo(0, newY);
    // 递归调用
    if (currentTime < duration) {
      setTimeout(smoothScroll, 10);
    }
  }
  smoothScroll();
}

// 这是一个缓动函数，用于平滑地控制动画的速度变化，实现“先加速后减速”的效果，使得滚动动作看起来更加自然。
export const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}
