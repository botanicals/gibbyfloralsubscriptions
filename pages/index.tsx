import Image from 'next/image';
import { NextPage } from 'next';

import OrderForm from '../components/forms/order-form';

const IndexPage: NextPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white">
        <div className="p-2 mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="images/gibby-floral-banner.png" alt="gibby floral banner" />
        </div>

        <div className="p-2 mx-auto">
          <h1 className="my-8 text-center uppercase font-base text-primary text-7xl">Be her hero!</h1>
          <div className="px-8 py-4 space-y-4 text-xl text-center text-primary">
            <p>
              Welcome the Gibby Floral <strong>BE HER HERO</strong> subscription service. Designed to make sure you don&apos;t miss those important times of the year for the one you love!
            </p>
            <p>
              Whether it&apos;s your beloved soul mate, your mother, your grandmother, or your daughter, now you can have fresh flowers delivered on time and <br />
              <strong className="text-3xl font-bold">BE HER HERO!</strong>
            </p>
            <p className="uppercase">
              Your <strong>BE HER HERO</strong> subscription includes two occassions plus Valentine&apos;s Day
            </p>
          </div>
          <div className="my-8 text-center text-primary">
            <p className="text-7xl">$299</p>
            <p className="font-bold">Includes Deliver within Weber County</p>
            <p className="font-bold">($375 value)</p>

            <div className="grid gap-4 my-8 sm:grid-cols-2">
              <div>
                <Image src="/assets/mothers-day.jpg" alt="mother's day bouquet" width="600" height="800" />
                <div className="p-2 mt-1 text-center text-white bg-primary">
                  <p className="text-xl font-bold uppercase">Mother&apos;s Day</p>
                  <p>Seasonal flowers with a keepsake container</p>
                </div>
              </div>

              <div>
                <Image src="/assets/valentines-day.jpg" alt="valentine's day bouquet" width="600" height="800" />
                <div className="p-2 mt-1 text-center text-white bg-primary">
                  <p className="text-xl font-bold uppercase">Valentine&apos;s Day</p>
                  <p>One dozen red roses with a vase</p>
                </div>
              </div>

              <div>
                <Image src="/assets/anniversary.jpg" alt="anniversary bouquet" width="600" height="800" />
                <div className="p-2 mt-1 text-center text-white bg-primary">
                  <p className="text-xl font-bold uppercase">Anniversary</p>
                  <p>Seasonal flowers with a vase</p>
                </div>
              </div>

              <div>
                <Image src="/assets/birthday.jpg" alt="birthday bouquet" width="600" height="800" />
                <div className="p-2 mt-1 text-center text-white bg-primary">
                  <p className="text-xl font-bold uppercase">Birthday</p>
                  <p>Seasonal flowers with a vase</p>
                </div>
              </div>
            </div>

            <p className="text-xl font-bold">Valentine&apos;s Day INCLUDED in your subscription.</p>
          </div>
          <div className="my-8">
            <div className="px-2 py-1 text-center text-white uppercase bg-primary">
              <h2 className="text-3xl font-extrabold">Be Her Hero</h2>
              <h3>Subscription</h3>
            </div>

            <OrderForm />
          </div>
        </div>

        <div className="p-2 mx-auto">
          <p className="text-sm text-center text-gray-600">&copy; {new Date().getFullYear()} Gibby Floral. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
