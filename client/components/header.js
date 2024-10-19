import Link from 'next/link';

export default ({ currentUser }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Ticketing
        </Link>
        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">
            {currentUser ? (
              <Link className="nav-link" href="/auth/signout">
                Sign Out
              </Link>
            ) : (
              <>
                <Link className="nav-link" href="/auth/signup">
                  Sign Up
                </Link>
                <Link className="nav-link" href="/auth/signin">
                  Sign In
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
