import { ReactNode } from 'react';
import Link from 'next/link';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white">
        <div className="p-2 mx-auto">
          <Link href="https://gibbyfloral.com">
            <a>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/gibby-floral-banner.png" alt="gibby floral banner" />
            </a>
          </Link>
        </div>

        <div className="p-2 mx-auto">{children}</div>

        <div className="p-2 mx-auto">
          <p className="text-sm text-center text-gray-600">&copy; {new Date().getFullYear()} Gibby Floral. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
