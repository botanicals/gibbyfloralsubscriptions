import { NextPage } from 'next';
import Link from 'next/link';

import PageLayout from '../layouts/page-layout';

const NotFoundPage: NextPage = () => {
  return (
    <PageLayout>
      <h1 className="my-8 text-center uppercase font-base text-primary text-7xl">Not Found</h1>
      <div className="px-8 py-4 space-y-4 text-xl text-center text-primary">
        <p>The page you are looking for does not exist.</p>
        <p>
          <Link href="/">
            <a className="underline hover:text-extrabold hover:text-primary/80">Return to our homepage.</a>
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;
