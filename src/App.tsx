import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'

import apolloClient from 'bootstrap/apollo'
import { UserProvider } from 'context/UserContext'
import theme from 'theme/default'
import GlobalStyle from 'theme/GlobalStyle'
import App from 'components/App'
import ErrorBoundary from 'components/ErrorBoundary'
// import useLocalStorage from 'hooks/useLocalStorage'
import messages_pl from 'translations/pl.json'
import messages_en from 'translations/en.json'

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill')
  require('@formatjs/intl-pluralrules/locale-data/pl')
  require('@formatjs/intl-pluralrules/locale-data/en')
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill')
  require('@formatjs/intl-relativetimeformat/locale-data/pl')
  require('@formatjs/intl-relativetimeformat/locale-data/en')
}

if (!Intl.NumberFormat) {
  require('@formatjs/intl-numberformat/polyfill')
  require('@formatjs/intl-numberformat/locale-data/pl')
  require('@formatjs/intl-numberformat/locale-data/en')
}

interface TranslatedText {
  [key: string]: string
}

const messages: { [key: string]: TranslatedText } = {
  pl: messages_pl,
  en: messages_en,
}

const getTimeLocale = (locale: string) => {
  if (['pl', 'enUS'].includes(locale)) {
    return locale
  }

  return 'enUS'
}

const getLocale = (locale = 'enUS') => {
  if (['pl', 'enUS'].includes(locale)) {
    return locale === 'enUS' ? 'en' : locale
  }

  return 'en'
}

// const [locale] = useLocalStorage(
//   'App.__localeId__',
//   navigator.language.split(/[-_]/)[0],
// )
const locale = 'pl'
const transformedLocale = getLocale(locale)

// @ts-ignore
window.__localeId__ = getTimeLocale(locale)

function Root() {
  return (
    <IntlProvider
      locale={transformedLocale}
      messages={messages[transformedLocale]}
    >
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <>
              <GlobalStyle />
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </>
          </UserProvider>
        </ThemeProvider>
      </ApolloProvider>
    </IntlProvider>
  )
}

export default Root
