import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, AppShell, Navbar, Header } from "@mantine/core";
import { MainLinks } from "../components/base/MainLinks";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Page title</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: "dark",
                }}
            >
                {/* App shell */}
                <AppShell
                    padding="md"
                    navbar={
                        <Navbar width={{ base: 300 }} p="xs">
                            <MainLinks />
                        </Navbar>
                    }
                    header={
                        <Header height={60} p="xs">
                            Header
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
            </MantineProvider>
        </>
    );
}
