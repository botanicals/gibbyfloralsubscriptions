import { InformationCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import classNames from '../utils/class-names';

export interface AlertProps {
  status?: 'info' | 'alert' | 'warn' | 'success';
  message: string;
  link?: {
    text: string;
    href: string;
    external?: boolean;
  };
}

const Alert: React.FC<AlertProps> = ({ status = 'info', message, link }) => {
  return (
    <div className={classNames('p-4 rounded-md', status === 'alert' ? 'bg-red-100' : status === 'warn' ? 'bg-yellow-100' : status === 'success' ? 'bg-green-100' : 'bg-blue-100')}>
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className={classNames('w-5 h-5', status === 'alert' ? 'text-red-400' : status === 'warn' ? 'text-yellow-400' : status === 'success' ? 'text-green-400' : 'text-blue-400')}
            aria-hidden="true"
          />
        </div>
        <div className="flex-1 ml-3 font-bold md:flex md:justify-between">
          <p className={classNames('text-sm', status === 'alert' ? 'text-red-700' : status === 'warn' ? 'text-yellow-700' : status === 'success' ? 'text-green-700' : 'text-blue-700')}>{message}</p>
          {link && (
            <p className="mt-3 text-sm md:mt-0 md:ml-6">
              {link.external ? (
                <a
                  href={link.href}
                  className={classNames(
                    'font-bold whitespace-nowrap',
                    status === 'alert'
                      ? 'text-red-700 hover:text-red-800 hover:underline'
                      : status === 'warn'
                      ? 'text-yellow-700 hover:text-yellow-800 hover:underline'
                      : status === 'success'
                      ? 'text-green-700 hover:text-green-800 hover:underline'
                      : 'text-blue-700 hover:text-blue-800 hover:underline'
                  )}
                >
                  {link.text} <span aria-hidden="true">&rarr;</span>
                </a>
              ) : (
                <Link href={link.href}>
                  <a
                    className={classNames(
                      'font-bold whitespace-nowrap',
                      status === 'alert'
                        ? 'text-red-700 hover:text-red-800 hover:underline'
                        : status === 'warn'
                        ? 'text-yellow-700 hover:text-yellow-800 hover:underline'
                        : status === 'success'
                        ? 'text-green-700 hover:text-green-800 hover:underline'
                        : 'text-blue-700 hover:text-blue-800 hover:underline'
                    )}
                  >
                    {link.text} <span aria-hidden="true">&rarr;</span>
                  </a>
                </Link>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
