import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from '@/context/context';
import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react'
import { Navbar } from '@/components/navbar/navbar';
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Technical Assessment",
  description: "Technical Assessment in next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <ContextProvider>
            <Navbar>
              <Container maxW='100vw' className={styles.container}>{children}</Container>
            </Navbar>
          </ContextProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
