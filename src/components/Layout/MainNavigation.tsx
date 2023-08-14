import classes from "./MainNavigation.module.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import Image from "next/image";
import logo from "../../assets/cocktailpantone.svg";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const MainNavigation = () => {
  const router = useRouter();

  const navigateHandler = () => {
    router.push("/");
  };

  return (
    <header className={classes.header}>
      <div onClick={navigateHandler} className={classes.logo}>
        <Image src={logo} alt="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/" className={inter.className}>
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
