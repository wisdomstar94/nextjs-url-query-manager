import { useUrlQueryManager } from "@/hooks/page/use-url-query-manager.hook";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const urlQueryManager = useUrlQueryManager({ router });

  useEffect(() => {
    console.log('@urlQueryManager.urlQueryString', urlQueryManager.urlQueryString);
  }, [urlQueryManager.urlQueryString]);

  useEffect(() => {
    console.log('@urlQueryManager.urlQueryMap', urlQueryManager.urlQueryMap);
  }, [urlQueryManager.urlQueryMap]);

  return (
    <>
      <div className="w-full relative">
        <ul className="w-full relative flex flex-wrap gap-2 box-border p-4">
          <li className="w-full relative flex flex-wrap gap-2">
            <button
              className="inline-flex text-xs text-slate-600 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-100 px-3 py-1.5"
              onClick={() => {
                urlQueryManager.removeUrlQuery('b');
              }}>
              url query key 제거
            </button>
          </li>
          <li className="w-full relative flex flex-wrap gap-2">
            <div className="w-[400px] h-[400px] bg-red-200"></div>
          </li>
          <li className="w-full relative flex flex-wrap gap-2">
            <div className="w-[400px] h-[400px] bg-blue-200"></div>
          </li>
          <li className="w-full relative flex flex-wrap gap-2">
            <div className="w-[400px] h-[400px] bg-orange-200"></div>
          </li>
          <li className="w-full relative flex flex-wrap gap-2">
            <button
              className="inline-flex text-xs text-slate-600 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-100 px-3 py-1.5"
              onClick={() => {
                urlQueryManager.setUrlQuery('b', ['1', '2', '33']);
              }}>
              url query key 셋팅
            </button>
          </li>
          <li className="w-full relative flex flex-wrap gap-2">
            <div className="w-[400px] h-[400px] bg-green-200"></div>
          </li>
          <li className="w-full relative flex flex-wrap gap-2">
            <div className="w-[400px] h-[400px] bg-pink-200"></div>
          </li>
        </ul>
      </div>
    </>
  );
}