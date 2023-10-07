"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { categories } from "@/types";
import { Combobox } from "@/components/ui/combobox";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Details = {
  name: string;
  representative: string;
  position: string;
  address: string;
  telephone: string;
  fax: string;
  email: string;
};

function InputWithLabel({
  label,
  id,
  value,
  type,
  setValue,
}: {
  label?: string;
  id: string;
  value: string;
  type: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="grid w-96 items-center gap-1.5">
      <Label htmlFor={id}>{label ?? id}</Label>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type={type}
        id={id}
        required
      />
    </div>
  );
}

const Page = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `w-[8.5in] p-16 bg-white text-black flex flex-col gap-4`,
        className
      )}
    >
      {children}
    </div>
  );
};

const Generate = () => {
  const maincategories = categories
    .map((category) => ({
      label: category.title,
      value: category.title,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const [mainCategory, setMainCategory] =
    useState<(typeof categories)[number]["title"]>("");

  const subcategories = categories
    .find((category) => category.title === mainCategory)
    ?.children.sort((a, b) => a.localeCompare(b));

  const [subCategory, setSubCategory] =
    useState<(typeof categories)[number]["title"][number]>("");

  const [partnersDetails, setPartnersDetails] = useState<Details[]>([
    {
      name: "Wriddhi Hazra",
      representative: "Wriddhi Hazra Pvt Ltd",
      position: "CEO",
      address: "AB Street, Kolkata, West Bengal, India",
      telephone: "1234567890",
      fax: "1234567890",
      email: "wriddhi@email.com",
    },
    {
      name: "Arindam Sarkar",
      representative: "Arindam Sarkar Pvt Ltd",
      position: "CEO",
      address: "CD Street, Kolkata, West Bengal, India",
      telephone: "9876543210",
      fax: "9876543210",
      email: "arindam@email.com",
    },
  ]);

  const [activity, setActivity] = useState<string>(
    "Sharing profits and losses"
  );
  const [background, setBackground] = useState<string>(
    "This partnership is formed due to the mutual interest of both the parties."
  );
  const [purpose, setPurpose] = useState<string>(
    "The purpose of this partnership is to share profits and losses."
  );
  const [record, setRecord] = useState<string>(
    "The evaluation of the partnership will be done on a monthly basis."
  );
  const [funding, setFunding] = useState<string>(
    "This MOU is not a commitment of funding."
  );
  const [endDate, setEndDate] = useState<string>("12th December 2024");

  const [generatePDF, setGeneratePDF] = useState<boolean>(false);

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });

  useEffect(() => {
    setSubCategory("");
  }, [mainCategory]);

  return (
    <section className="grid grid-cols-2 grid-rows-1 w-full h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setGeneratePDF(true);
        }}
        className="w-full h-full flex-1 flex flex-col justify-center items-center gap-10 p-24 divide-y-2"
      >
        <section className="flex flex-col w-fit gap-4">
          <label htmlFor="main-category" className="font-bold text-lg">
            Main Category
          </label>
          <Combobox
            id="main-category"
            options={maincategories}
            value={mainCategory}
            setValue={setMainCategory}
          />
        </section>
        <section className="flex flex-col w-fit gap-4">
          <label
            aria-disabled={mainCategory === ""}
            htmlFor="sub-category"
            className="font-bold aria-disabled:text-muted-foreground text-lg pt-10"
          >
            Sub Category {mainCategory && `for ${mainCategory}`}
          </label>
          <Combobox
            id="sub-category"
            disabled={mainCategory === ""}
            options={
              subcategories?.map((subcategory) => ({
                label: subcategory,
                value: subcategory,
              })) || []
            }
            value={subCategory}
            setValue={setSubCategory}
          />
        </section>
        {mainCategory && subCategory === "Memorandum of Understanding" && (
          <>
            {partnersDetails.map((partner, index) => {
              return (
                <section
                  key={index}
                  className="flex flex-col w-fit gap-4 capitalize pt-10"
                >
                  <label
                    htmlFor="partnership-agreement"
                    className="font-bold aria-disabled:text-muted-foreground text-xl w-96 flex justify-between items-center"
                  >
                    Partner {index + 1}
                  </label>
                  {Object.keys(partner).map((key) => {
                    return (
                      <InputWithLabel
                        key={`${index}-${key}`}
                        id={`${index}-${key}`}
                        label={key}
                        value={partner[key as keyof Details]}
                        type={key === "email" ? "email" : "text"}
                        setValue={(value) => {
                          setPartnersDetails((oldDetails) => {
                            const oldPartnersDetails = [...oldDetails];
                            oldPartnersDetails[index][key as keyof Details] =
                              value;
                            return oldPartnersDetails;
                          });
                        }}
                      />
                    );
                  })}
                </section>
              );
            })}
          </>
        )}
        {mainCategory && subCategory && (
          <>
            <section className="flex flex-col w-fit gap-4 capitalize pt-10">
              <label
                htmlFor="activity"
                className="font-bold aria-disabled:text-muted-foreground text-xl w-96 flex justify-between items-center"
              >
                Activity
              </label>
              <Input
                id="activity"
                value={activity}
                className="w-96"
                onChange={(e) => setActivity(e.target.value)}
                required
              />
            </section>
            <section className="flex flex-col w-fit gap-4 capitalize pt-10">
              <label
                htmlFor="background"
                className="font-bold aria-disabled:text-muted-foreground text-xl w-96 flex justify-between items-center"
              >
                background
              </label>
              <Input
                id="background"
                value={background}
                className="w-96"
                onChange={(e) => setBackground(e.target.value)}
                required
              />
            </section>
            <section className="flex flex-col w-fit gap-4 capitalize pt-10">
              <label
                htmlFor="purpose"
                className="font-bold aria-disabled:text-muted-foreground text-xl w-96 flex justify-between items-center"
              >
                purpose
              </label>
              <Input
                id="purpose"
                value={purpose}
                className="w-96"
                onChange={(e) => setPurpose(e.target.value)}
                required
              />
            </section>
            <section className="flex flex-col w-fit gap-4 capitalize pt-10">
              <label
                htmlFor="record"
                className="font-bold aria-disabled:text-muted-foreground text-xl w-96 flex justify-between items-center"
              >
                record
              </label>
              <Input
                id="record"
                value={record}
                className="w-96"
                onChange={(e) => setRecord(e.target.value)}
                required
              />
            </section>
            <section className="flex flex-col w-fit gap-4 capitalize pt-10">
              <label
                htmlFor="funding"
                className="font-bold aria-disabled:text-muted-foreground text-xl w-96 flex justify-between items-center"
              >
                funding
              </label>
              <Input
                id="funding"
                value={funding}
                className="w-96"
                onChange={(e) => setFunding(e.target.value)}
                required
              />
            </section>
            <section className="flex flex-col w-fit gap-4 capitalize pt-10">
              <label
                htmlFor="end-date"
                className="font-bold aria-disabled:text-muted-foreground text-xl w-96 flex justify-between items-center"
              >
                end date
              </label>
              <Input
                id="end-date"
                value={endDate}
                className="w-96"
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </section>
          </>
        )}
        <Button className="w-96">Generate PDF</Button>
      </form>
      {generatePDF && (
        <section
          onClick={handlePrint}
          className="mx-auto cursor-pointer"
          ref={componentRef}
        >
          <Page>
            <h2 className="text-xl font-bold text-center">
              Memorandum of Understanding
            </h2>
            <p className="text-center">Between</p>
            <p className="text-center">{partnersDetails[0].name}</p>
            <p className="text-center">And</p>
            <p className="text-center">{partnersDetails[1].name}</p>
            <h3 className="text-lg font-bold">Background</h3>
            <p>{background}</p>
            <h3 className="text-lg font-bold">Purpose</h3>
            <p>{purpose}</p>
            <h3 className="text-lg font-bold">Activity</h3>
            <p>{activity}</p>
            <h3 className="text-lg font-bold">Record</h3>
            <p>{record}</p>
            <h3 className="text-lg font-bold">Funding</h3>
            <p>{funding}</p>
            <h3 className="text-lg font-bold">Duration</h3>
            <p>
              This MOU is at-will and may be modified by mutual consent of
              authorized officials from{" "}
              {partnersDetails.map((partner) => partner.name).join(", ")}. This
              MOU shall become effective upon signature by the authorized
              officials from the{" "}
              {partnersDetails.map((partner) => partner.name).join(", ")} and
              will remain in effect until modified or terminated by any one of
              the partners by mutual consent. In the absence of mutual agreement
              by the authorized officials from{" "}
              {partnersDetails.map((partner) => partner.name).join(", ")} this
              MOU shall end on {endDate}.
            </p>
            <h3 className="text-lg font-bold">Contact Information</h3>
            {partnersDetails.map((partner, index) => (
              <div key={index} className="mb-6">
                {Object.values(partner).map((value, index) => (
                  <p key={`${index}-${value}`}>{value}</p>
                ))}
              </div>
            ))}
            {partnersDetails.map((partner, index) => (
              <pre key={index} className="font-sans">
                ____________________________ Date: <br/>
                {partner.name}, {partner.representative}, {partner.position}
              </pre>
            ))}
          </Page>
        </section>
      )}
    </section>
  );
};

export default Generate;
