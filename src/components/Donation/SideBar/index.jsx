import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Progress } from "../../ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../ui/radio-group";
import { useLocation } from "react-router-dom";


export const DonationSection = () => {
  // Donation amount options
  const donationAmounts = [
    { value: "10", label: "$10" },
    { value: "25", label: "$25" },
    { value: "50", label: "$50" },
    { value: "100", label: "$100" },
    { value: "500", label: "$500" },
  ];

  // Categories data
  const categories = [
    { name: "Clean Water", count: 3 },
    { name: "Education", count: 6 },
    { name: "Ecology", count: 4 },
    { name: "Ending Hunger", count: 8 },
    { name: "Health Care", count: 8 },
    { name: "Local communities", count: 3 },
  ];

  // Urgent causes data
  const urgentCauses = [
    {
      title: "End Hunger",
      image: "https://c.animaapp.com/m8zxxv029vaoIA/img/frame-172.png",
      description:
        "Ut id velit tempor eu amet nunc. Vestibulum iaculis cras sed odio. A dolor vitae ultrices at maecenas massa urna massa erat. Enim in lacus pretium phasellus nulla posuere sagittis aliquam maecenas. Tristique amet scelerisque magnis nulla egestas eu magna. Placerat volutpat sit sit amet odio sapien volutpat id. Imperdiet pharetra sapien odio dictumst quis mi nunc blandit.",
    },
    {
      title: "Improve Education",
      image: "https://c.animaapp.com/m8zxxv029vaoIA/img/frame-229.png",
      description:
        "Ut id velit tempor eu amet nunc. Vestibulum iaculis cras sed odio. A dolor vitae ultrices at maecenas massa urna massa erat. Enim in lacus pretium phasellus nulla posuere sagittis aliquam maecenas. Tristique amet scelerisque magnis nulla egestas eu magna. Placerat volutpat sit sit amet odio sapien volutpat id. Imperdiet pharetra sapien odio dictumst quis mi nunc blandit.",
    },
    {
      title: "Clean Water Initiative",
      image: "https://c.animaapp.com/m8zxxv029vaoIA/img/img-3.png",
      description:
        "Ut id velit tempor eu amet nunc. Vestibulum iaculis cras sed odio. A dolor vitae ultrices at maecenas massa urna massa erat. Enim in lacus pretium phasellus nulla posuere sagittis aliquam maecenas. Tristique amet scelerisque magnis nulla egestas eu magna. Placerat volutpat sit sit amet odio sapien volutpat id. Imperdiet pharetra sapien odio dictumst quis mi nunc blandit.",
    },
  ];

  const location = useLocation();
  const mission = location.state;

  if (!mission) return <p>Loading...</p>;

  return (
    <section className="flex flex-wrap justify-center gap-6 py-10 px-4 md:px-[72px] w-full">
      {/* Main Content Column */}
      <div className="flex flex-col max-w-[856px] w-full">
        {/* Hero Image and Progress Section */}
        <div className="flex flex-col gap-7 mb-[60px]">
          {/* Hero Image */}
          <div
            className="w-full h-[560px] rounded-[20px] bg-cover bg-center"
            style={{ backgroundImage: `url(${mission.image})` }}
          />
          <div className="flex flex-col gap-6 w-full">
            <Progress
              value={(mission.raised / mission.goal) * 100}
              className="h-5 bg-gray-100 rounded-lg"
              indicatorClassName="bg-[#2fae77] rounded-lg"
            />
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-[28px]">Goal: ${mission.goal}</h2>
                <p className="font-medium text-gray-600 text-xl">Raised: ${mission.raised}</p>
              </div>
              <div className="flex flex-col gap-4 items-end">
                <h2 className="font-bold text-[28px]">{mission.participants}</h2>
                <p className="font-medium text-gray-600 text-xl">donations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Form Card */}
        <Card className="w-full mb-[60px] rounded-[20px] shadow-[0px_4px_13px_#0000000d]">
          <CardContent className="p-10 space-y-10">
            {/* Donation Amount Section */}
            <div className="flex flex-col gap-6">
              <h2 className="font-semibold text-[28px] [font-family:'Teachers',Helvetica]">
                Donation Amount
              </h2>

              <div className="flex flex-wrap gap-2">
                {donationAmounts.map((amount) => (
                  <Button
                    key={amount.value}
                    variant="outline"
                    className="w-[100px] h-10 rounded-[20px] border border-solid border-[#00000099] font-medium text-xl [font-family:'Teachers',Helvetica]"
                  >
                    {amount.label}
                  </Button>
                ))}
                <Button className="h-10 bg-[#2fae77] rounded-[20px] font-medium text-xl [font-family:'Teachers',Helvetica]">
                  CUSTOM AMOUNT
                </Button>
              </div>

              <div className="w-[216px] h-[60px] bg-[#f8f9fa] rounded-[40px] flex items-center px-[18px]">
                <span className="font-semibold text-[28px] [font-family:'Teachers',Helvetica] mr-7">
                  $
                </span>
                <span className="font-semibold text-2xl [font-family:'Teachers',Helvetica]">
                  600
                </span>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="flex flex-col gap-10">
              <h2 className="font-semibold text-[28px] [font-family:'Teachers',Helvetica]">
                Select Payment Method
              </h2>

              <RadioGroup  className="flex gap-5">
                <div className="flex items-center gap-4">
                  <RadioGroupItem
                    value="credit-card"
                    id="credit-card"
                    className="w-6 h-6 border-8 border-[#2fae77]"
                  />
                  <label
                    htmlFor="credit-card"
                    className="font-medium text-xl [font-family:'Teachers',Helvetica]"
                  >
                    Credit Card
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="w-6 h-6 border-2 border-[#00000099]"
                  />
                  <label
                    htmlFor="paypal"
                    className="font-medium text-xl [font-family:'Teachers',Helvetica]"
                  >
                    Pay Pal
                  </label>
                </div>
              </RadioGroup>

              <div className="w-[368px] flex flex-col gap-1.5">
                <label className="font-medium text-xl [font-family:'Teachers',Helvetica]">
                  Credit Card Number
                </label>
                <div className="h-[38px] px-4 py-[9px] bg-[#f8f9fa] flex items-center gap-2 rounded-md">
                  <img
                    className="w-6 h-6"
                    alt="Credit card"
                    src="https://c.animaapp.com/m8zxxv029vaoIA/img/credit-card-2--1.svg"
                  />
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="flex flex-col gap-10">
              <h2 className="font-semibold text-[28px] [font-family:'Teachers',Helvetica]">
                Personal Information
              </h2>

              <div className="flex flex-col gap-6">
                <div className="flex gap-10">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="font-medium text-xl [font-family:'Teachers',Helvetica]">
                      First Name
                    </label>
                    <Input
                      placeholder="First Name"
                      className="bg-[#f8f9fa] text-[#00000099] font-normal text-base [font-family:'Inter',Helvetica]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="font-medium text-xl [font-family:'Teachers',Helvetica]">
                      Last Name
                    </label>
                    <Input
                      placeholder="Last Name"
                      className="bg-[#f8f9fa] text-[#00000099] font-normal text-base [font-family:'Inter',Helvetica]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-medium text-xl [font-family:'Teachers',Helvetica]">
                    Email Address
                  </label>
                  <Input
                    placeholder="Email Address"
                    className="bg-[#f8f9fa] text-[#00000099] font-normal text-base [font-family:'Inter',Helvetica]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="font-semibold text-[28px] [font-family:'Teachers',Helvetica]">
                  <span className="text-black">Donation Total: </span>
                  <span className="text-[#2fae77]">$600</span>
                </div>
                <Button className="w-[280px] h-[60px] bg-[#2fae77] rounded-2xl font-bold text-base [font-family:'Inter',Helvetica]">
                  DONATE NOW
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description Section */}
        <div className="flex flex-col gap-7 w-full">
          <h2 className="font-bold text-[40px] [font-family:'Teachers',Helvetica]">
            Description
          </h2>
          <div className="w-full h-[480px] rounded-[20px] bg-[url(https://c.animaapp.com/m8zxxv029vaoIA/img/img.png)] bg-cover bg-center" />
          <p className="font-semibold text-base leading-6 [font-family:'Inter',Helvetica]">
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
            tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute
            iure reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt
            in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* Sidebar Column */}
      <div className="flex flex-col gap-10 max-w-[416px] w-full">
        {/* SearchIcon Box */}
        <div className="w-full">
          <div className="relative">
            <Input
              placeholder="Search..."
              className="px-4 py-3.5 border border-solid border-[#dee2e6] rounded-md text-gray-500 font-normal text-base [font-family:'Inter',Helvetica]"
            />
            
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-2xl [font-family:'Teachers',Helvetica]">
            Categories
          </h2>

          <div className="flex flex-col gap-2.5 w-full">
            {categories.map((category, index) => (
              <div key={index} className="flex justify-between w-full">
                <span className="font-medium text-xl [font-family:'Teachers',Helvetica]">
                  {category.name}
                </span>
                <span className="font-medium text-xl [font-family:'Teachers',Helvetica]">
                  ({category.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Causes Section */}
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-2xl [font-family:'Teachers',Helvetica]">
            Urgent Causes
          </h2>

          <div className="flex flex-col gap-[30px]">
            {urgentCauses.map((cause, index) => (
              <div key={index} className="flex gap-6 w-full">
                <div
                  className="w-[180px] h-[140px] rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${cause.image})` }}
                />
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="font-semibold text-xl [font-family:'Teachers',Helvetica]">
                    {cause.title}
                  </h3>
                  <p className="h-12 font-normal text-sm text-[#00000099] leading-4 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] [font-family:'Inter',Helvetica]">
                    {cause.description}
                  </p>
                  <span className="font-medium text-sm text-defaultblack [font-family:'Teachers',Helvetica]">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
