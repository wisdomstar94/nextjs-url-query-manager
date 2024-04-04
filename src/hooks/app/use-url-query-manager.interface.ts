import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface Props {
  pathname: string | null;
  searchParams: ReadonlyURLSearchParams | null;
  router: AppRouterInstance;
}