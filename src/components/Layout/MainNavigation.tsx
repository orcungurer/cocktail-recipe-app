import Link from "next/link";
import classes from "./MainNavigation.module.css";
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
              All Cocktails
            </Link>
          </li>
          <li>
            <Link href="/new-cocktail" className={inter.className}>
              Suggest Cocktail
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
