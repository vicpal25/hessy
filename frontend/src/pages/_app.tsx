import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider>
                <CartProvider>
                    <Header />
                    <Component {...pageProps} />
                    <CartSidebar />
                </CartProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
}
