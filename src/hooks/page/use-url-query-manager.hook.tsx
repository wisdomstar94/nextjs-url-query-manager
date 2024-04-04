import { useRouter } from "next/router";
import { Props } from "./use-url-query-manager.interface";
import { useEffect, useState } from "react";

/** next.js 의 pages router 사용 가능한 훅입니다. */
export function useUrlQueryManager(props?: Props) {
  const [urlQueryString, setUrlQueryString] = useState<string>();
  const [urlQueryMap, setUrlQueryMap] = useState<Map<string, string | string[]>>(new Map());
  const router = useRouter();

  function removeUrlQuery(key: string) {
    const newUrlQueryMap = new Map(urlQueryMap);
    newUrlQueryMap.delete(key);
    _goReplace(newUrlQueryMap);
  }

  function setUrlQuery(key: string, value: string | string[]) {
    const newUrlQueryMap = new Map(urlQueryMap);
    newUrlQueryMap.set(key, value);
    _goReplace(newUrlQueryMap);
  }

  function getUrlQuery(key: string) {
    return urlQueryMap.get(key);
  }

  /** ? 는 제외 */
  function _convertMapToUrlQueryString(map: Map<string, string | string[]>) {
    const pairs: string[] = [];
    for (const [key, value] of Array.from(map.entries())) {
      if (Array.isArray(value)) {
        for (const item of value) {
          pairs.push(`${key}=${item}`);
        }
      } else {
        pairs.push(`${key}=${value}`);
      }
    }
    return pairs.join('&');
  }

  /** ? 는 제외 */
  function _convertObjectToUrlQueryString(obj: any) {
    const pairs: string[] = [];
    const keys = Object.keys(obj);
    for (const key of keys) {
      const value: string | string[] = obj[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          pairs.push(`${key}=${item}`);
        }
      } else {
        pairs.push(`${key}=${value}`);
      }
    }
    return pairs.join('&');
  }

  function _goReplace(map: Map<string, string | string[]>) {
    const _urlQueryString = _convertMapToUrlQueryString(map);
    const pathname = router.asPath.split('?')[0];
    const applyUrl = _urlQueryString.trim() === '' ? `${pathname}` : `${pathname}?${_urlQueryString}`;
    router.replace(applyUrl, undefined, {
      scroll: false
    });
  }

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query === null || router.query === undefined) return;
    
    // // urlQueryString 계산
    const _urlQueryString = _convertObjectToUrlQueryString(router.query);

    // urlQueryMap 계산
    const _urlQueryMap: Map<string, string | string[]> = new Map();
    const queryObj: any = router.query;
    const searchParamsKeys = Object.keys(queryObj);
    for (const key of Array.from(new Set(searchParamsKeys))) {
      const value = queryObj[key];

      if (!Array.isArray(value)) {
        _urlQueryMap.set(key, value ?? '');
      } else {
        _urlQueryMap.set(key, value);
      }
    }
    
    // 상태 갱신
    setUrlQueryString(prev => _urlQueryString);
    setUrlQueryMap(prev => _urlQueryMap);
  }, [router.isReady, router.query]);

  return {
    /** ? 는 제외. ex) name=홍길동&age=23 */
    urlQueryString,
    urlQueryMap,

    removeUrlQuery,
    setUrlQuery,
    getUrlQuery,
  };
}