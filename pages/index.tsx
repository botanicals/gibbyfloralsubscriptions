import Image from 'next/image';
import { NextPage } from 'next';

import PageLayout from '../layouts/page-layout';

import OrderForm from '../components/order-form';

const IndexPage: NextPage = () => {
  return (
    <PageLayout>
      <div className="p-2 mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/be-her-hero-banner-valentines-day.jpeg" className="w-full" alt="be her hero banner" />
      </div>
      <h1 className="my-8 text-center uppercase font-base text-primary text-7xl">Be her hero!</h1>
      <div className="px-8 py-4 space-y-4 text-xl text-center text-primary">
        <p>
          Welcome the Gibby Floral <strong>BE HER HERO</strong> subscription service.
        </p>
        <p>Designed to make sure you don&apos;t miss those important times of the year for the one you love!</p>
        <p>
          Whether it&apos;s your beloved soul mate, your mother, your grandmother, or your daughter, now you can have fresh flowers delivered on time and <br />
          <strong className="text-3xl font-bold">BE HER HERO!</strong>
        </p>
        <p className="uppercase">
          Your <strong>BE HER HERO</strong> subscription includes two occasions plus Mother&apos;s Day
        </p>
      </div>
      <div className="my-8 text-center text-primary">
        <p className="font-bold">THREE BOUQUETS WITH DELIVERY FOR ONLY</p>
        <p className="text-7xl">$299</p>
        <p className="font-bold">($375 value)</p>

        <p className="my-8 font-bold">&mdash; OR &mdash;</p>

        <p className="font-bold">FIVE BOUQUETS WITH DELIVERY FOR ONLY</p>
        <p className="text-7xl">$499</p>
        <p className="font-bold">($575 value)</p>

        <p className="mt-8 font-bold">Includes Delivery within Weber, Davis, &amp; Morgan Counties</p>
        <p className="mt-2 font-bold">
          <em>At this time BE HER HERO is NOT available to Gibby Floral South customers.</em>
        </p>

        <div className="grid gap-4 my-8 sm:grid-cols-3">
          <div></div>
          <div className="flex flex-col">
            <Image src="/images/mothers-day.jpg" alt="mother's day bouquet" width="600" height="800" />
            <div className="p-2 mt-2 text-center text-white bg-primary grow">
              <p className="text-xl font-bold uppercase">Mother&apos;s Day</p>
              <p>Included in your subscription: Seasonal flowers with a keepsake container</p>
            </div>
          </div>
          <div></div>
        </div>

        <div className="grid items-stretch gap-4 my-8 sm:grid-cols-3">
          <div className="flex flex-col">
            <Image src="/images/anniversary.jpg" alt="anniversary bouquet" width="600" height="800" />
            <div className="p-2 mt-2 text-center text-white grow bg-primary">
              <p className="text-xl font-bold uppercase">Anniversary</p>
              <p>Included in your subscription: Seasonal flowers with a vase</p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image src="/images/birthday.jpg" alt="birthday bouquet" width="600" height="800" />
            <div className="p-2 mt-2 text-center text-white bg-primary grow">
              <p className="text-xl font-bold uppercase">Birthday</p>
              <p>Included in your subscription: Seasonal flowers with a vase</p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image src="/images/valentines-day-2.jpg" alt="valentine's day bouquet" width="600" height="800" />
            <div className="p-2 mt-2 text-center text-white bg-primary grow">
              <p className="text-xl font-bold uppercase">Valentine&apos;s Day</p>
              <p>Included in your subscription: One dozen premium red roses with a vase</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 my-8 sm:grid-cols-6">
          <div></div>
          <div className="flex flex-col col-span-2">
            <Image src="/images/subscribers-choice-1.jpeg" alt="designer's choice bouquet" width="600" height="800" />
            <div className="p-2 mt-2 text-center text-white bg-primary grow">
              <p className="text-xl font-bold uppercase">Designer&apos;s Choice</p>
              <p>Included in your five bouquet subscription: Seasonal flowers with a vase</p>
            </div>
          </div>
          <div className="flex flex-col col-span-2">
            <Image src="/images/subscribers-choice-2.jpeg" alt="designer's choice bouquet" width="600" height="800" />
            <div className="p-2 mt-2 text-center text-white bg-primary grow">
              <p className="text-xl font-bold uppercase">Designer&apos;s Choice</p>
              <p>Included in your five bouquet subscription: Seasonal flowers with a vase</p>
            </div>
          </div>
          <div></div>
        </div>

        <p className="text-xl font-bold">Mother&apos;s Day INCLUDED in your subscription.</p>
      </div>
      <div className="my-8">
        <div className="px-2 py-1 text-center text-white uppercase bg-primary">
          <h2 className="text-3xl font-extrabold">Be Her Hero</h2>
          <h3>Subscription</h3>
        </div>

        <OrderForm />
      </div>
    </PageLayout>
  );
};

export default IndexPage;
