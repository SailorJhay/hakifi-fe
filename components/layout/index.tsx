import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
  lang: string;
};

const MainLayout = ({ children, lang }: Props) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="max-w-full flex-1 bg-light-2 lg:mt-0">{children}</div>
      <Footer />
    </main>
  );
};

export default MainLayout;

