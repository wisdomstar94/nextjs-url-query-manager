import type { AppProps } from "next/app";
import Link from "next/link";
import { useState } from "react";
import "./globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [menus, setMenus] = useState([
    { name: '/test/app', href: '/test/app' },
    { name: '/test/page', href: '/test/page' },
  ]);

  return (
    <>
      <ul className="w-full relative flex flex-wrap gap-2">
        {
          menus.map(menu => {
            return (
              <li 
                className="inline-flex relative"
                key={menu.name}>
                <Link 
                  href={menu.href}
                  className="w-full inline-flex px-6 py-2 text-sm text-slate-700 border border-slate-400 rounded-md cursor-pointer hover:bg-slate-200">
                  { menu.name }
                </Link>
              </li>
            );
          })
        }
      </ul>
      <Component {...pageProps} />
    </>
  );
}