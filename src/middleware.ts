import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '../i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  try {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
      locales
    )
    const locale = matchLocale(languages, locales, i18n.defaultLocale)
    return locale
  } catch (e) {
    console.error(e)
  }
  return 'en'
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  let lang: any = null;
  const firstPath: string = pathname.split('/')[1];
  if (!lang)
    lang = firstPath
  let isSupportedLocale = i18n.locales.includes(lang);
  if (!isSupportedLocale) {
    lang = getLocale(request);
    isSupportedLocale = i18n.locales.includes(lang);
  }
  if (!isSupportedLocale)
    lang = 'en';
  if (firstPath !== lang) {
    let reUrl = `/${lang}${pathname.startsWith('/') ? '' : '/'}${pathname}`
    if (search)
      reUrl = reUrl + search;
    return NextResponse.redirect(new URL(reUrl, request.url))
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}