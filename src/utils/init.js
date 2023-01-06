/**
 * 是否支援 touchEvent，沒有的話就在 body 上加個 no-touch class
 * @author milkmidi
 * @version 1.0.0
 */
let installed:boolean = false;
export default function init() {
  if (installed) {
    return;
  }
  installed = true;
  const isSuppotTouch:boolean = ('ontouchstart' in document.documentElement);

  console.log(`%cinit isSuppotTouch:${isSuppotTouch}`, 'background:#3498db;color:white');
  if (navigator.userAgent !== 'ReactSnap' && !isSuppotTouch) {
    document.documentElement.className += ' no-touch';
  }
}
