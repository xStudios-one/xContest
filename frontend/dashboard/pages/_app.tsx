import { AppProps } from "next/app";
import Head from "next/head";
import axios from 'axios';
import {
  MantineProvider,
  AppShell,
  Navbar,
  Header,
  ColorSchemeProvider,
  ColorScheme,
  Burger,
  MediaQuery,
  Group
} from "@mantine/core";
import { MainLinks } from "../components/base/MainLinks";
import { Brand } from "../components/base/Brand";
import { useEffect, useState } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { useRouter } from "next/router";
import { API_URL } from "../Constants";
import Router from "next/router";
import store from '../app/store';
import { login } from '../app/slices/loginSlice';
import { Provider } from "react-redux";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [drawerOpened, setDrawerOpened] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (localStorage.getItem("Authorization"))
  //   axios.get(`${API_URL}/auth/ping`).catch(() => {
  //       localStorage.removeItem("Authorization");
  //       localStorage.removeItem("Username");
  //       localStorage.removeItem("Email");
  //       Router.reload();
  //   });
  // }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setDrawerOpened(false))
  }, [router.events])

  return (
    <>
      <Provider store={store}>
      <Head>
        <title>xContest Dashboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme,
          }}
        >
          <NotificationsProvider>
            {/* App shell */}
            <AppShell
              padding="md"
              fixed
              navbar={
                <Navbar width={{ sm: 200, lg: 300 }} p="xs" hiddenBreakpoint="sm" hidden={!drawerOpened}>
                  <Navbar.Section grow>
                    <MainLinks />
                  </Navbar.Section>
                </Navbar>
              }
              header={
                <Header height={60} px="xl">
                  <div style={{ display: 'flex', padding: 0, margin: 0, alignItems: 'center' }}>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                      <Burger opened={drawerOpened} onClick={() => setDrawerOpened(o => !o)} size="sm" mr="xl" />
                    </MediaQuery>
                    <div style={{ width: '100%' }}>
                      <Brand />
                    </div>
                  </div>
                </Header>
              }
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Component {...pageProps} />
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider >
      </Provider>
    </>
  );
}
