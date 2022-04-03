import { Unary } from '../types/utility/unary';

export function smartShare({url, onClipboardCopy, onError}:{url: string, onClipboardCopy: VoidFunction, onError: Unary<Error>}){
  if (navigator.share) {
    return navigator.share({ url }).catch(onError);
  } else {
    return navigator.clipboard.writeText(url).then(onClipboardCopy).catch(onError);
  }
};
