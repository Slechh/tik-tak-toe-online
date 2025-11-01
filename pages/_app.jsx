import "../styles/global.css";
import { Inter } from "next/font/google";

const inter = Inter({subsets: ['latin','cyrillic']})
console.log(inter.className)

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}


// import "../styles/global.css";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin", "cyrillic"] });

// export default function App({ Component, pageProps }) {
//   return (
//     <div className={inter.className}>
//       <Component {...pageProps} />;
//     </div>
//   );
// }