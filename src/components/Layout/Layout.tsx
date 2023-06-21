import classes from "./Layout.module.css";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;