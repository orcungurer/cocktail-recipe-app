import classes from "./MainNavigation.module.css";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={`${classes.logo} ${inter.className}`}>
        Cocktail Recipe
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
