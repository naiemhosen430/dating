import { Inter } from "next/font/google";
import "./globals.css";
import ButtonBer from "./Components/Shared/ButtonBer";
import Provider from "./Components/Shared/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meet New People",
  description: "Here is a new world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen overflow-hidden">
          <Provider>
            <>
              {children}
              <ButtonBer />
            </>
          </Provider>
        </div>
      </body>
    </html>
  );
}
