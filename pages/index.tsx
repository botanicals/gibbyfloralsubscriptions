import Image from 'next/image';
import { NextPage } from 'next';

import PageLayout from '../layouts/page-layout';

import OrderForm from '../components/order-form';
import classNames from '../utils/class-names';
import Checkbox from '../components/form-elements/checkbox';
import { useState } from 'react';

const IndexPage: NextPage = () => {
  const [mothersday, setMothersday] = useState(false);
  const [birthday, setBirthday] = useState(false);
  const [anniversary, setAnniversary] = useState(false);
  const [valentinesday, setValentinesday] = useState(true);
  const [subscriberChoice1, setSubscriberChoice1] = useState(false);
  const [subscriberChoice2, setSubscriberChoice2] = useState(false);

  const count = () => {
    let count = 0;

    if (mothersday) count += 1;
    if (birthday) count += 1;
    if (anniversary) count += 1;
    if (valentinesday) count += 1;
    if (subscriberChoice1) count += 1;
    if (subscriberChoice2) count += 1;

    return count;
  };

  return (
    <PageLayout>
      <div className="p-2 mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/be-her-hero-banner-three-or-five.jpeg" className="w-full" alt="be her hero banner" />
      </div>
      <h1 className="my-8 text-center uppercase font-base text-primary text-7xl">Be her hero!</h1>
      <div className="px-8 py-4 space-y-4 text-xl text-center text-primary">
        <p>
          Welcome the Gibby Floral <strong>BE HER HERO</strong>, 3 or 5 floral bouquet subscription service.
        </p>
        <p>Designed to make sure you don&apos;t miss those important times of the year for the one you love!</p>
        <p>
          Whether it&apos;s your beloved soul mate, your mother, your grandmother, or your daughter, now you can have fresh flowers delivered on time and <br />
          <strong className="text-3xl font-bold">BE HER HERO!</strong>
        </p>
      </div>

      <div className="grid px-8 my-8 md:grid-cols-7">
        <div className="flex flex-col items-center justify-start md:col-span-3">
          <Image src="/assets/three.jpg" className="w-[150px] h-auto" width={150} height={150} alt="three" />

          <div className="text-center text-primary">
            <p className="font-bold">YOUR BE HER HERO 3 BOUQUETS includes Valentine&apos;s Day (2025) and two more occasions.</p>
            <p className="text-7xl">$299</p>
            <p className="font-bold">($375 value)</p>
            <p className="italic font-bold">Includes Delivery within Weber, Davis, &amp; Morgan Counties</p>
          </div>

          <div className="relative flex flex-col items-start w-full my-8 space-y-2">
            <Checkbox name="valentinesday" label="Valentine's Day (2025)" value={valentinesday} setValue={setValentinesday} readOnly />
            <hr className="w-full my-8 border opacity-25 border-secondary" />
            <Checkbox name="motherdays" label="Mother's Day (2025)" value={mothersday} setValue={setMothersday} disabled={!mothersday && count() >= 5} />
            <Checkbox name="birthday" label="Birthday" value={birthday} setValue={setBirthday} disabled={count() > 3} />
            <Checkbox name="anniversary" label="Anniversary" value={anniversary} setValue={setAnniversary} disabled={count() > 3} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/or.jpg" className="w-[150px] h-auto shrink-0 -rotate-6 mt-8" width={150} height={150} alt="or" />
          <div className="block w-[1px] h-full bg-secondary opacity-50" />
        </div>
        <div className="flex flex-col items-center justify-start md:col-span-3">
          <Image src="/assets/five.jpg" className="w-[150px] h-auto" width={150} height={150} alt="five" />
          <div className="text-center text-primary">
            <p className="font-bold">YOUR BE HER HERO 5 BOUQUETS includes Valentine&apos;s Day (2025) and four more occasions.</p>
            <p className="text-7xl">$499</p>
            <p className="font-bold">($575 value)</p>
            <p className="italic font-bold">Includes Delivery within Weber, Davis, &amp; Morgan Counties</p>
          </div>

          <div className="relative flex flex-col items-start w-full my-8 space-y-2">
            <Checkbox name="valentinesday" label="Valentine's Day (2025)" value={valentinesday} setValue={setValentinesday} readOnly />
            <hr className="w-full my-8 border opacity-25 border-secondary" />
            <Checkbox name="motherdays" label="Mother's Day (2025)" value={mothersday} setValue={setMothersday} disabled={!mothersday && count() >= 5} />
            <Checkbox name="birthday" label="Birthday" value={birthday} setValue={setBirthday} disabled={!birthday && count() >= 5} />
            <Checkbox name="anniversary" label="Anniversary" value={anniversary} setValue={setAnniversary} disabled={!anniversary && count() >= 5} />
            <Checkbox name="subscriberschoice1" label="Subscriber's Choice" value={subscriberChoice1} setValue={setSubscriberChoice1} disabled={!subscriberChoice1 && count() >= 5} />
            <Checkbox name="subscriberschoice2" label="Subscriber's Choice" value={subscriberChoice2} setValue={setSubscriberChoice2} disabled={!subscriberChoice2 && count() >= 5} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 my-8 sm:grid-cols-3">
        <div className="flex items-center justify-center w-full h-full sm:col-span-2 bg-primary">
          <div className="p-2 text-xl text-center text-white uppercase align-middle sm:text-4xl sm:p-16">
            <p>Both subscriptions include Valentine&apos;s Day (2025)</p>
          </div>
        </div>
        <div className="flex flex-col">
          <Image src="/images/valentines-day-2.jpg" alt="valentine's day bouquet" width="600" height="800" />
          <div className="p-2 mt-2 text-center text-white bg-primary grow">
            <p className="text-xl font-bold uppercase">Valentine&apos;s Day (2025)</p>
            <p>Included in your subscription: One dozen premium red roses with a vase</p>
          </div>
        </div>
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
          <Image src="/images/mothers-day.jpg" alt="mother's day bouquet" width="600" height="800" />
          <div className="p-2 mt-2 text-center text-white bg-primary grow">
            <p className="text-xl font-bold uppercase">Mother&apos;s Day (2025)</p>
            <p>Included in your subscription: Seasonal flowers with a keepsake container</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 my-8 sm:grid-cols-3">
        <div className="flex items-center justify-center w-full h-full bg-primary">
          <div className="p-2 text-2xl text-center text-white uppercase align-middle">
            <p>
              BE HER HERO
              <strong className="block my-2 text-4xl font-black"> 5 </strong>
              INCLUDES TWO MORE DATES OF YOUR CHOICE
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <Image src="/images/subscribers-choice-1.jpeg" alt="designer's choice bouquet" width="600" height="800" />
          <div className="p-2 mt-2 text-center text-white bg-primary grow">
            <p className="text-xl font-bold uppercase">Designer&apos;s Choice</p>
            <p>Included in your five bouquet subscription: Seasonal flowers with a vase</p>
          </div>
        </div>
        <div className="flex flex-col">
          <Image src="/images/subscribers-choice-2.jpeg" alt="designer's choice bouquet" width="600" height="800" />
          <div className="p-2 mt-2 text-center text-white bg-primary grow">
            <p className="text-xl font-bold uppercase">Designer&apos;s Choice</p>
            <p>Included in your five bouquet subscription: Seasonal flowers with a vase</p>
          </div>
        </div>
      </div>

      <div className="my-8">
        <div className="px-2 py-1 text-center text-white uppercase bg-primary">
          <h2 className="text-3xl font-extrabold">Be Her Hero</h2>
          <h3>Subscription</h3>
        </div>

        <OrderForm mothersday={mothersday} valentinesday={valentinesday} birthday={birthday} anniversary={anniversary} occasion4={subscriberChoice1} occasion5={subscriberChoice2} />
      </div>
    </PageLayout>
  );
};

export default IndexPage;
