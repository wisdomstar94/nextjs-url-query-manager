import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Props } from "./use-url-query-manager.interface";
import { useEffect, useState } from "react";

/** next.js 의 app router 에서 사용 가능한 훅입니다. */
export function useUrlQueryManager(props?: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  function _goReplace(map: Map<string, string | string[]>) {
    const _urlQueryString = _convertMapToUrlQueryString(map);
    const applyUrl = _urlQueryString.trim() === '' ? `${pathname}` : `${pathname}?${_urlQueryString}`;
    router.replace(applyUrl, {
      scroll: false,
    });
  }

  useEffect(() => {
    if (searchParams === null) return;

    // urlQueryString 계산
    const _urlQueryString = searchParams.toString();

    // urlQueryMap 계산
    const _urlQueryMap: Map<string, string | string[]> = new Map();
    const searchParamsKeys = searchParams.keys();
    for (const key of Array.from(new Set(searchParamsKeys))) {
      const value = searchParams.get(key);
      const values = searchParams.getAll(key);

      if (values.length === 1) {
        _urlQueryMap.set(key, value ?? '');
      } else {
        _urlQueryMap.set(key, values);
      }
    }
    
    // 상태 갱신
    setUrlQueryString(prev => _urlQueryString);
    setUrlQueryMap(prev => _urlQueryMap);
  }, [searchParams]);

  return {
    /** ? 는 제외. ex) name=홍길동&age=23 */
    urlQueryString,
    urlQueryMap,

    removeUrlQuery,
    setUrlQuery,
    getUrlQuery,
  };
}