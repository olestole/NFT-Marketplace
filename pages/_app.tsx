import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-screen min-h-screen">
      <nav className="border-b p-6">
        <h1 className="pb-2">Metaverse Marketplace</h1>
        <div className="space-x-8">
          <Link href="/">Home</Link>
          <Link href="/create-item">Sell Digital Asset</Link>
          <Link href="/my-assets">My Digital Assets</Link>
          <Link href="/creator-dashboard">Creator dashboard</Link>
        </div>
      </nav>
      <div className="flex w-full h-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
